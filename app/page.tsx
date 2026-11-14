import {
  ArchiveIcon,
  BoldIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  FileTextIcon,
  GitBranchIcon,
  InboxIcon,
  InfoIcon,
  ItalicIcon,
  SearchIcon,
  TerminalIcon,
  TriangleAlertIcon,
  UnderlineIcon,
  XIcon,
} from "lucide-react"

import { ComponentSearch } from "./component-search"
import {
  ChartDemo,
  DataTableDemo,
  SkeletonDemo,
  CommandDemo,
  ComboboxDemo,
  QuestionnaireDemo,
  ToastDemo,
} from "./demos"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Message, MessageContent } from "@/components/ui/message"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonText,
} from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

const invoices = [
  { id: "INV001", status: "Paid", amount: "$250.00" },
  { id: "INV002", status: "Pending", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", amount: "$350.00" },
]

const groups: {
  title: string
  sections: { title: string; demo: React.ReactNode }[]
}[] = [
  {
    title: "Actions",
    sections: [
      {
        title: "Button",
        demo: (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" variant="outline" aria-label="Copy">
                <CopyIcon />
              </Button>
              <Button aria-busy>
                <Spinner /> Loading
              </Button>
            </div>
          </>
        ),
      },
      {
        title: "Button Group",
        demo: (
          <ButtonGroup>
            <Button variant="outline">Archive</Button>
            <Button variant="outline">Report</Button>
            <Button variant="outline" size="icon" aria-label="More">
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
        ),
      },
      {
        title: "Toggle",
        demo: (
          <div className="flex gap-2">
            <Toggle aria-label="Bold">
              <BoldIcon />
            </Toggle>
            <Toggle variant="outline" aria-label="Italic">
              <ItalicIcon />
            </Toggle>
          </div>
        ),
      },
      {
        title: "Toggle Group",
        demo: (
          <ToggleGroup variant="outline" multiple>
            <ToggleGroupItem value="bold" aria-label="Bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <UnderlineIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
  },
  {
    title: "Forms",
    sections: [
      {
        title: "Field",
        demo: (
          <FieldGroup className="w-full max-w-sm">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="you@example.com" />
              <FieldDescription>We never share it.</FieldDescription>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" aria-invalid defaultValue="admin" />
              <FieldError>Username is taken.</FieldError>
            </Field>
          </FieldGroup>
        ),
      },
      {
        title: "Input",
        demo: (
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Input placeholder="Default" />
            <Input placeholder="Disabled" disabled />
            <Input type="file" />
          </div>
        ),
      },
      {
        title: "Input Group",
        demo: (
          <InputGroup className="w-full max-w-sm">
            <InputGroupInput placeholder="Search…" />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
        ),
      },
      {
        title: "Input OTP",
        demo: (
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        ),
      },
      {
        title: "Textarea",
        demo: (
          <Textarea
            className="w-full max-w-sm"
            placeholder="Type your message…"
          />
        ),
      },
      {
        title: "Select",
        demo: (
          <Select items={fruits}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pick a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fruits.map((fruit) => (
                  <SelectItem key={fruit.value} value={fruit.value}>
                    {fruit.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
      {
        title: "Native Select",
        demo: (
          <NativeSelect>
            {fruits.map((fruit) => (
              <NativeSelectOption key={fruit.value} value={fruit.value}>
                {fruit.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        ),
      },
      { title: "Combobox", demo: <ComboboxDemo /> },
      {
        title: "Checkbox",
        demo: (
          <div className="flex flex-col gap-3">
            <Field orientation="horizontal">
              <Checkbox id="terms" defaultChecked />
              <FieldLabel htmlFor="terms">Accept terms</FieldLabel>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Checkbox id="disabled" disabled />
              <FieldLabel htmlFor="disabled">Disabled</FieldLabel>
            </Field>
          </div>
        ),
      },
      {
        title: "Radio Group",
        demo: (
          <RadioGroup defaultValue="comfortable">
            {["Default", "Comfortable", "Compact"].map((label) => (
              <Field key={label} orientation="horizontal">
                <RadioGroupItem
                  value={label.toLowerCase()}
                  id={`density-${label}`}
                />
                <FieldLabel htmlFor={`density-${label}`}>{label}</FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        ),
      },
      {
        title: "Switch",
        demo: (
          <div className="flex items-center gap-2">
            <Switch id="airplane" />
            <Label htmlFor="airplane">Airplane mode</Label>
          </div>
        ),
      },
      {
        title: "Slider",
        demo: (
          <Slider className="w-full max-w-sm" defaultValue={50} max={100} />
        ),
      },
      {
        title: "Calendar",
        demo: <Calendar mode="single" />,
      },
      { title: "Questionnaire", demo: <QuestionnaireDemo /> },
    ],
  },
  {
    title: "Overlays",
    sections: [
      {
        title: "Dialog",
        demo: (
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Open dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <Input defaultValue="Pedro Duarte" />
              <DialogFooter>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      },
      {
        title: "Alert Dialog",
        demo: (
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              Delete account
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
      {
        title: "Sheet",
        demo: (
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Open sheet
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>Adjust your preferences.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ),
      },
      {
        title: "Drawer",
        demo: (
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Open drawer
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <div className="h-40 rounded-lg bg-muted" />
              </div>
            </DrawerContent>
          </Drawer>
        ),
      },
      {
        title: "Popover",
        demo: (
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              Open popover
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Dimensions</PopoverTitle>
                <PopoverDescription>Set the layer size.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ),
      },
      {
        title: "Tooltip",
        demo: (
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Hover me
            </TooltipTrigger>
            <TooltipContent>Add to library</TooltipContent>
          </Tooltip>
        ),
      },
      {
        title: "Hover Card",
        demo: (
          <HoverCard>
            <HoverCardTrigger render={<Button variant="link" />}>
              @nextjs
            </HoverCardTrigger>
            <HoverCardContent>
              The React framework for the web.
            </HoverCardContent>
          </HoverCard>
        ),
      },
      {
        title: "Dropdown Menu",
        demo: (
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Open menu
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuItem>
                  Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
      {
        title: "Context Menu",
        demo: (
          <ContextMenu>
            <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
      },
      { title: "Command", demo: <CommandDemo /> },
    ],
  },
  {
    title: "Navigation",
    sections: [
      {
        title: "Tabs",
        demo: (
          <div className="flex flex-col gap-4">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account settings.</TabsContent>
              <TabsContent value="password">Change your password.</TabsContent>
            </Tabs>
            <Tabs defaultValue="overview">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        ),
      },
      {
        title: "Navigation Menu",
        demo: (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1">
                    {["Introduction", "Installation", "Typography"].map(
                      (title) => (
                        <li key={title}>
                          <NavigationMenuLink href="#">
                            {title}
                          </NavigationMenuLink>
                        </li>
                      )
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Docs</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ),
      },
      {
        title: "Menubar",
        demo: (
          <Menubar className="w-fit">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ),
      },
      {
        title: "Breadcrumb",
        demo: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
      },
      {
        title: "Pagination",
        demo: (
          <Pagination className="justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      },
      {
        title: "Sidebar",
        demo: (
          <p className="text-sm text-muted-foreground">This page&apos;s nav.</p>
        ),
      },
    ],
  },
  {
    title: "Data Display",
    sections: [
      {
        title: "Card",
        demo: (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy in one click.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input placeholder="Project name" />
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        ),
      },
      {
        title: "Item",
        demo: (
          <div className="flex w-full max-w-md flex-col gap-3">
            {(["outline", "muted", "default"] as const).map((variant) => (
              <Item key={variant} variant={variant}>
                <ItemMedia variant="icon">
                  <InboxIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    {variant[0].toUpperCase() + variant.slice(1)}
                  </ItemTitle>
                  <ItemDescription>You have 3 unread messages.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </div>
        ),
      },
      {
        title: "Badge",
        demo: (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="secondary">
              <CheckIcon /> Verified
            </Badge>
          </div>
        ),
      },
      {
        title: "Avatar",
        demo: (
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>DG</AvatarFallback>
            </Avatar>
            <AvatarGroup>
              {["AB", "CD", "EF"].map((initials) => (
                <Avatar key={initials}>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        ),
      },
      {
        title: "Table",
        demo: (
          <div className="w-full max-w-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell className="text-right">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">$750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        ),
      },
      { title: "Data Table", demo: <DataTableDemo /> },
      { title: "Chart", demo: <ChartDemo /> },
      {
        title: "Accordion",
        demo: (
          <Accordion className="w-full max-w-md" defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. Built on Base UI.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes, and it&apos;s all yours to change.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
      {
        title: "Collapsible",
        demo: (
          <Collapsible className="w-full max-w-sm">
            <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
              Show more <ChevronDownIcon />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="pt-2 text-sm text-muted-foreground">
                Hidden content revealed.
              </p>
            </CollapsibleContent>
          </Collapsible>
        ),
      },
      {
        title: "Carousel",
        demo: (
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <CarouselItem key={n} className="w-2/5">
                  <Card>
                    <CardContent className="flex aspect-4/5 items-center justify-center">
                      <span className="font-heading text-4xl font-bold">
                        {n}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
          </Carousel>
        ),
      },
      {
        title: "Kbd",
        demo: (
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        ),
      },
      {
        title: "Code Block",
        demo: (
          <CodeBlock className="w-full max-w-md">
            <CodeBlockHeader>
              <CodeBlockTitle>
                <TerminalIcon /> Terminal
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value="pnpm dlx shadcn@latest add button" />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent>
              pnpm dlx shadcn@latest add button
            </CodeBlockContent>
          </CodeBlock>
        ),
      },
    ],
  },
  {
    title: "Feedback",
    sections: [
      {
        title: "Alert",
        demo: (
          <div className="flex w-full max-w-md flex-col gap-3">
            <Alert>
              <InfoIcon />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                You can add components with the CLI.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <TriangleAlertIcon />
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>Check your card details.</AlertDescription>
            </Alert>
          </div>
        ),
      },
      { title: "Toast", demo: <ToastDemo /> },
      {
        title: "Progress",
        demo: <Progress className="w-full max-w-sm" value={60} />,
      },
      {
        title: "Skeleton",
        demo: (
          <div className="flex w-full max-w-md flex-col gap-8">
            <Item>
              <ItemMedia>
                <SkeletonAvatar />
              </ItemMedia>
              <ItemContent>
                <SkeletonText lines={2} />
              </ItemContent>
            </Item>
            <Card>
              <CardContent>
                <Skeleton className="aspect-video w-full rounded-lg" />
              </CardContent>
              <CardContent>
                <SkeletonText />
              </CardContent>
            </Card>
            <SkeletonDemo />
          </div>
        ),
      },
      {
        title: "Spinner",
        demo: (
          <div className="flex flex-wrap items-center gap-6">
            <Spinner />
            <Spinner className="text-2xl" />
            <Spinner className="text-5xl" />
            <Button aria-busy>
              <Spinner /> Saving
            </Button>
            <Button variant="outline" aria-busy>
              <Spinner /> Loading
            </Button>
          </div>
        ),
      },
      {
        title: "Empty",
        demo: (
          <Empty className="w-full max-w-md">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ArchiveIcon />
              </EmptyMedia>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>Create one to get started.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center">
              <Button>Create project</Button>
              <Button variant="outline">View docs</Button>
            </EmptyContent>
          </Empty>
        ),
      },
    ],
  },
  {
    title: "Chat",
    sections: [
      {
        title: "Message",
        demo: (
          <div className="flex w-full max-w-md flex-col gap-4">
            <Message align="end">
              <MessageContent>
                <Bubble>
                  <BubbleContent>Deploying to prod real quick.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageContent>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>
                      It&apos;s 4:55 PM. On a Friday.
                    </BubbleContent>
                  </Bubble>
                  <Bubble variant="muted">
                    <BubbleContent>Alright, go for it.</BubbleContent>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>
          </div>
        ),
      },
      {
        title: "Bubble",
        demo: (
          <div className="flex flex-wrap gap-2">
            {(
              [
                "default",
                "secondary",
                "muted",
                "tinted",
                "outline",
                "ghost",
                "destructive",
              ] as const
            ).map((variant) => (
              <Bubble key={variant} variant={variant}>
                <BubbleContent>{variant}</BubbleContent>
              </Bubble>
            ))}
          </div>
        ),
      },
      {
        title: "Marker",
        demo: (
          <div className="flex flex-col gap-3">
            <Marker>
              <MarkerIcon>
                <GitBranchIcon />
              </MarkerIcon>
              <MarkerContent>Switched to release-candidate</MarkerContent>
            </Marker>
            <Marker variant="border">
              <MarkerIcon>
                <SearchIcon />
              </MarkerIcon>
              <MarkerContent>Reviewed 8 related files</MarkerContent>
            </Marker>
            <Marker variant="separator">
              <MarkerContent>Today</MarkerContent>
            </Marker>
          </div>
        ),
      },
      {
        title: "Trace",
        demo: (
          <Trace className="w-full max-w-md">
            <TraceLine>
              <TraceIcon>
                <FileTextIcon />
              </TraceIcon>
              <TraceTitle>Read app/page.tsx</TraceTitle>
            </TraceLine>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <TerminalIcon />
                  </TraceIcon>
                  <TraceTitle>Ran node --version</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <CodeBlock size="sm">
                  <CodeBlockContent>v24.18.0</CodeBlockContent>
                </CodeBlock>
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceLine status="pending">
              <TraceIcon>
                <SearchIcon />
              </TraceIcon>
              <TraceTitle>Search queued</TraceTitle>
            </TraceLine>
            <TraceLine status="error">
              <TraceIcon>
                <XIcon />
              </TraceIcon>
              <TraceTitle>Build failed</TraceTitle>
            </TraceLine>
          </Trace>
        ),
      },
      {
        title: "Attachment",
        demo: (
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Attachment>
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
                <AttachmentDescription>2.4 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remove">
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
            <Attachment size="sm" state="uploading">
              <AttachmentContent>
                <AttachmentTitle>screenshot.png</AttachmentTitle>
              </AttachmentContent>
            </Attachment>
          </div>
        ),
      },
      {
        title: "Message Scroller",
        demo: (
          <Card className="h-64 w-full max-w-md">
            <CardContent className="min-h-0 flex-1">
              <MessageScrollerProvider>
                <MessageScroller>
                  <MessageScrollerViewport>
                    <MessageScrollerContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <MessageScrollerItem key={i} messageId={String(i)}>
                          <Message align={i % 2 ? "start" : "end"}>
                            <MessageContent>
                              <Bubble variant={i % 2 ? "muted" : "default"}>
                                <BubbleContent>Message {i + 1}</BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </MessageScrollerProvider>
            </CardContent>
          </Card>
        ),
      },
    ],
  },
  {
    title: "Layout",
    sections: [
      {
        title: "Separator",
        demo: (
          <div className="flex h-5 items-center gap-4 text-sm">
            Blog
            <Separator orientation="vertical" />
            Docs
            <Separator orientation="vertical" />
            Source
          </div>
        ),
      },
      {
        title: "Aspect Ratio",
        demo: (
          <AspectRatio ratio={16 / 9} className="w-full max-w-sm">
            <div className="size-full rounded-lg bg-muted" />
          </AspectRatio>
        ),
      },
      {
        title: "Scroll Area",
        demo: (
          <Card className="w-full max-w-xs">
            <CardContent>
              <ScrollArea className="h-40">
                <div className="text-sm">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className="py-1">
                      v1.2.0-beta.{30 - i}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ),
      },
      {
        title: "Resizable",
        demo: (
          <Card className="w-full max-w-md">
            <CardContent>
              <ResizablePanelGroup
                orientation="horizontal"
                className="min-h-40"
              >
                <ResizablePanel defaultSize="30%">
                  <div className="flex h-full items-center justify-center text-sm">
                    One
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="70%">
                  <div className="flex h-full items-center justify-center text-sm">
                    Two
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
          </Card>
        ),
      },
    ],
  },
]

const slug = (title: string) => title.toLowerCase().replaceAll(" ", "-")

export default function KitchenSink() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <span className="px-2 pt-2 font-heading text-lg font-bold">
            UI Kit
          </span>
        </SidebarHeader>
        <SidebarContent>
          {groups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.sections.map((section) => (
                    <SidebarMenuItem key={section.title}>
                      <SidebarMenuButton
                        render={<a href={`#${slug(section.title)}`} />}
                      >
                        {section.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-sticky flex h-12 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">
            Press <Kbd>D</Kbd> to toggle theme
          </span>
          <ComponentSearch
            index={groups.map((group) => ({
              title: group.title,
              sections: group.sections.map((section) => ({
                title: section.title,
                id: slug(section.title),
              })),
            }))}
          />
        </header>
        <main className="flex flex-col gap-16 p-6 md:p-10">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-10">
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                {group.title}
              </h2>
              {group.sections.map((section) => (
                <section
                  key={section.title}
                  id={slug(section.title)}
                  className="flex scroll-mt-16 flex-col items-start gap-4"
                >
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {section.title}
                  </h3>
                  {section.demo}
                </section>
              ))}
            </div>
          ))}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
