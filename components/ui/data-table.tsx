"use client"

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS as DndCSS } from "@dnd-kit/utilities"
import {
  cellSelectionFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  flexRender,
  metaHelper,
  rowSelectionFeature,
  tableFeatures,
  useTable,
  type Cell,
  type ColumnDef,
  type Header,
  type RowData,
} from "@tanstack/react-table"
import { useEffect, useId, useRef, useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

/** How a column edits in place. Columns without an editor are read-only. */
type DataTableColumnMeta = {
  editor?: "text" | "number" | "date" | "select"
  options?: readonly string[]
}

const features = tableFeatures({
  cellSelectionFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  columnMeta: metaHelper<DataTableColumnMeta>(),
})

type Features = typeof features

/** Typed column helper for DataTable columns: `const col = dataTableColumns<Person>()`. */
const dataTableColumns = <TData extends RowData>() =>
  createColumnHelper<Features, TData>()

type Editing = { rowId: string; columnId: string; draft: string }

const arrows = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
} as const

function DataTable<TData extends RowData>({
  data,
  columns,
  onRowChange,
  className,
}: {
  data: TData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- column values are heterogeneous by design
  columns: ColumnDef<Features, TData, any>[]
  /** Called with the row's index in `data` and the edited fields. */
  onRowChange?: (rowIndex: number, patch: Partial<TData>) => void
  className?: string
}) {
  const allColumns: typeof columns = [
    {
      id: "select",
      size: 44,
      enableResizing: false,
      enableCellSelection: false,
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all rows"
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllRowsSelected(checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => selectRow(row.index, checked)}
        />
      ),
    },
    ...columns,
  ]

  const table = useTable(
    {
      features,
      data,
      columns: allColumns,
      columnResizeMode: "onChange",
      // edits change `data`; keep the focused cell instead of resetting it
      autoResetCellSelection: false,
      initialState: {
        columnPinning: { start: ["select", columnId(columns[0])], end: [] },
        columnOrder: allColumns.map(columnId),
      },
    },
    (state) => state
  )

  const [editing, setEditing] = useState<Editing | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const shiftHeld = useRef(false)
  const lastSelected = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const focused = table.getFocusedCell()

  // keep DOM focus on the focused cell so arrow keys keep working (roving tabindex)
  useEffect(() => {
    if (!focused || editing) return
    containerRef.current
      ?.querySelector<HTMLElement>(`[data-cell-id="${CSS.escape(focused.id)}"]`)
      ?.focus({ preventScroll: false })
  }, [focused, editing])

  // shift-click selects every row between the last clicked row and this one
  function selectRow(index: number, checked: boolean) {
    const rows = table.getRowModel().rows
    if (shiftHeld.current && lastSelected.current !== null) {
      const [from, to] = [lastSelected.current, index].sort((a, b) => a - b)
      for (const row of rows.slice(from, to + 1)) row.toggleSelected(checked)
    } else {
      rows[index]?.toggleSelected(checked)
    }
    lastSelected.current = index
  }

  function startEditing(cell: Cell<Features, TData, unknown>, draft?: string) {
    if (!cell.column.columnDef.meta?.editor) return
    setEditing({
      rowId: cell.row.id,
      columnId: cell.column.id,
      draft: draft ?? String(cell.getValue() ?? ""),
    })
  }

  function commit() {
    if (!editing) return
    const cell = table
      .getRow(editing.rowId)
      .getAllCells()
      .find((c) => c.column.id === editing.columnId)
    const editor = cell?.column.columnDef.meta?.editor
    const value = editor === "number" ? Number(editing.draft) : editing.draft
    if (cell && value !== cell.getValue()) {
      onRowChange?.(cell.row.index, {
        [editing.columnId]: value,
      } as Partial<TData>)
    }
    setEditing(null)
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (editing) {
      if (event.key === "Escape") setEditing(null)
      else if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault()
        commit()
        table.moveCellSelection(event.key === "Tab" ? "right" : "down")
      }
      return
    }
    const direction = arrows[event.key as keyof typeof arrows]
    if (direction) {
      event.preventDefault()
      if (event.shiftKey) table.extendCellSelection(direction)
      else table.moveCellSelection(direction)
    } else if (event.key === "Tab" && focused) {
      event.preventDefault()
      table.moveCellSelection(event.shiftKey ? "left" : "right")
    } else if ((event.key === "Enter" || event.key === "F2") && focused) {
      event.preventDefault()
      startEditing(focused)
    } else if (
      focused &&
      event.key.length === 1 &&
      !event.metaKey &&
      !event.ctrlKey
    ) {
      // typing on a focused cell replaces its value, like a spreadsheet
      event.preventDefault()
      startEditing(focused, event.key)
    }
  }

  // stable ids so dnd-kit's aria attributes match between server and client
  const dndId = useId()
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )
  const columnOrder = table.state.columnOrder
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    table.setColumnOrder((order) =>
      arrayMove(
        order,
        order.indexOf(String(active.id)),
        order.indexOf(String(over.id))
      )
    )
  }

  return (
    <div
      ref={containerRef}
      data-slot="data-table"
      data-scrolled={scrolled}
      onScroll={(e) => setScrolled(e.currentTarget.scrollLeft > 0)}
      onKeyDown={onKeyDown}
      onPointerDownCapture={(e) => (shiftHeld.current = e.shiftKey)}
      className={cn(
        "group/data-table relative isolate max-h-112 w-full overflow-auto rounded-xl bg-card bg-[linear-gradient(to_bottom,var(--muted)_calc(2.5rem+1px),transparent_0)] text-sm shadow-slab [--scrollbar-offset-top:2.75rem]",
        className
      )}
    >
      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <table
          className="border-separate border-spacing-0"
          style={{ width: table.getTotalSize(), tableLayout: "fixed" }}
        >
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {group.headers.map((header) => (
                    <HeaderCell key={header.id} header={header} />
                  ))}
                </SortableContext>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                data-selected={row.getIsSelected()}
                className="group/row"
              >
                {row.getVisibleCells().map((cell) => {
                  const isEditing =
                    editing?.rowId === row.id &&
                    editing.columnId === cell.column.id
                  return (
                    <td
                      key={cell.id}
                      data-cell-id={cell.id}
                      data-focused={cell.getIsFocused()}
                      data-editing={isEditing}
                      data-selected={cell.getIsSelected()}
                      tabIndex={cell.getCanSelect() ? cell.getTabIndex() : -1}
                      onMouseDown={(e) => {
                        if (!cell.getCanSelect() || isEditing) return
                        // a second click on the focused cell opens it for editing
                        if (cell.getIsFocused() && !e.shiftKey)
                          startEditing(cell)
                        else cell.getSelectionStartHandler()(e)
                      }}
                      onMouseEnter={(e) => cell.getSelectionExtendHandler()(e)}
                      style={pinnedStyle(cell.column)}
                      className={cn(
                        "relative h-10 truncate border-b border-border/70 px-3 outline-none",
                        "bg-card group-hover/row:bg-muted group-data-[selected=true]/row:bg-accent",
                        "data-[selected=true]:bg-accent",
                        // focus: a soft rounded ring inside the cell, hidden while the editor (with its own ring) is open
                        "after:pointer-events-none after:absolute after:inset-1 after:rounded-md after:opacity-0 after:ring-2 after:ring-ring/70 data-[editing=true]:after:opacity-0 data-[focused=true]:after:opacity-100",
                        pinnedClass(cell.column)
                      )}
                    >
                      {isEditing ? (
                        <CellEditor
                          meta={cell.column.columnDef.meta}
                          value={editing.draft}
                          onChange={(draft) =>
                            setEditing({ ...editing, draft })
                          }
                          onCommit={commit}
                        />
                      ) : (
                        <table.FlexRender cell={cell} />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </DndContext>
    </div>
  )
}

function HeaderCell<TData extends RowData>({
  header,
}: {
  header: Header<Features, TData, unknown>
}) {
  const pinned = Boolean(header.column.getIsPinned())
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: header.column.id, disabled: pinned })
  return (
    <th
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        width: header.getSize(),
        ...pinnedStyle(header.column),
        transform: DndCSS.Translate.toString(transform),
        transition: transition,
      }}
      className={cn(
        "sticky top-0 z-pinned h-10 truncate border-b bg-muted px-3 text-left text-xs font-medium text-muted-foreground shadow-[inset_0_-1px_0_var(--edge)]",
        !pinned && "cursor-grab active:cursor-grabbing",
        isDragging && "z-floating bg-card shadow-stone",
        pinnedClass(header.column),
        // after pinnedClass: pinned headers sit above both body cells and scrolling headers
        pinned && "z-sticky"
      )}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanResize() && (
        <div
          role="separator"
          aria-orientation="vertical"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          data-resizing={header.column.getIsResizing()}
          className="absolute top-2 right-0 bottom-2 w-1.5 cursor-col-resize rounded-full transition-colors hover:bg-primary/60 data-[resizing=true]:bg-primary"
        />
      )}
    </th>
  )
}

function CellEditor({
  meta,
  value,
  onChange,
  onCommit,
}: {
  meta: DataTableColumnMeta | undefined
  value: string
  onChange: (value: string) => void
  onCommit: () => void
}) {
  const className =
    // a carved field, matching <Input> in its focused state
    "absolute inset-1 z-raised w-[calc(100%-0.5rem)] rounded-md border border-ring bg-card px-2 text-sm shadow-well ring-3 ring-ring/25 outline-none"
  if (meta?.editor === "select") {
    return (
      <select
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onCommit}
        className={className}
      >
        {meta.options?.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    )
  }
  return (
    <input
      autoFocus
      type={
        meta?.editor === "number"
          ? "number"
          : meta?.editor === "date"
            ? "date"
            : "text"
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onCommit}
      className={className}
    />
  )
}

// pinned columns stick to the start; the last one casts an edge shadow while scrolled
type PinnableColumn = Pick<
  Header<Features, RowData, unknown>["column"],
  "getIsPinned" | "getStart" | "getIsLastColumn"
>

const pinnedStyle = (column: PinnableColumn): React.CSSProperties =>
  column.getIsPinned() === "start"
    ? { position: "sticky", insetInlineStart: column.getStart("start") }
    : {}

const pinnedClass = (column: PinnableColumn) =>
  column.getIsPinned() === "start" &&
  cn(
    "z-raised",
    column.getIsLastColumn("start") &&
      "group-data-[scrolled=true]/data-table:shadow-[6px_0_8px_-6px_var(--drop)]"
  )

function columnId(column: { id?: string; accessorKey?: unknown } | undefined) {
  return column?.id ?? String(column?.accessorKey ?? "")
}

export { DataTable, dataTableColumns, type DataTableColumnMeta }
