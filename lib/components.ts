export const groups = [
  "Actions",
  "Forms",
  "Overlays",
  "Navigation",
  "Data Display",
  "Feedback",
  "Chat",
  "Layout",
] as const

export type ComponentPage = {
  slug: string
  title: string
  group: (typeof groups)[number]
  description: string
  examples: readonly string[]
  install: readonly string[]
}

type Entry = [
  slug: string,
  title: string,
  description: string,
  extra?: Partial<Pick<ComponentPage, "examples" | "install">>,
]

const byGroup: Record<ComponentPage["group"], Entry[]> = {
  Actions: [
    [
      "button",
      "Button",
      "A glossy keycap that sinks into its lip when pressed.",
    ],
    [
      "button-group",
      "Button Group",
      "Joined buttons under one reflection, split by engraved seams.",
    ],
    ["toggle", "Toggle", "A two-state key that latches down while it's on."],
    [
      "toggle-group",
      "Toggle Group",
      "A row of toggles for one or many choices.",
    ],
    [
      "toolbar",
      "Toolbar",
      "A raised bar of controls with arrow-key navigation.",
    ],
  ],
  Forms: [
    [
      "field",
      "Field",
      "Label, control, description and error, laid out together.",
    ],
    ["form", "Form", "A form that wires validation errors to its fields."],
    ["input", "Input", "A text field carved into the surface."],
    [
      "number-field",
      "Number Field",
      "A numeric input with steppers and a scrubbable label.",
    ],
    [
      "input-group",
      "Input Group",
      "An input with addons, buttons and text inside the same well.",
    ],
    ["input-otp", "Input OTP", "Segmented slots for one-time codes."],
    [
      "textarea",
      "Textarea",
      "A multi-line text field that grows with its content.",
    ],
    ["select", "Select", "Pick one option from a list."],
    ["native-select", "Native Select", "The platform select, styled to match."],
    ["combobox", "Combobox", "Search a list and pick from it."],
    [
      "autocomplete",
      "Autocomplete",
      "Free text with suggestions that answer as you type.",
    ],
    ["checkbox", "Checkbox", "A small glossy tick for yes-or-no choices."],
    [
      "checkbox-group",
      "Checkbox Group",
      "Related checkboxes with a select-all parent.",
    ],
    ["radio-group", "Radio Group", "One choice from a few visible options."],
    [
      "segmented-control",
      "Segmented Control",
      "A single-choice switch with a gliding slab.",
    ],
    [
      "switch",
      "Switch",
      "An on/off control for settings that apply immediately.",
    ],
    ["slider", "Slider", "Drag to choose a value along a track."],
    ["calendar", "Calendar", "A month grid for picking dates and ranges."],
    [
      "date-picker",
      "Date Picker",
      "A calendar in a popover, behind a button.",
      { install: ["popover", "calendar", "button"] },
    ],
    [
      "questionnaire",
      "Questionnaire",
      "A step-by-step set of questions with progress.",
    ],
  ],
  Overlays: [
    ["dialog", "Dialog", "A modal window for focused tasks."],
    [
      "alert-dialog",
      "Alert Dialog",
      "A modal that asks for confirmation before something serious.",
    ],
    ["sheet", "Sheet", "A panel that slides in from an edge of the screen."],
    ["drawer", "Drawer", "A bottom sheet you can swipe away."],
    ["popover", "Popover", "Floating content anchored to a trigger."],
    ["tooltip", "Tooltip", "A short hint on hover or focus."],
    ["hover-card", "Hover Card", "A preview card shown while hovering a link."],
    ["dropdown-menu", "Dropdown Menu", "A menu of actions behind a button."],
    [
      "context-menu",
      "Context Menu",
      "A menu that opens where you right-click.",
    ],
    ["command", "Command", "A searchable command palette."],
  ],
  Navigation: [
    [
      "tabs",
      "Tabs",
      "Switch between views; the active slab glides between them.",
    ],
    [
      "navigation-menu",
      "Navigation Menu",
      "Site navigation with rich dropdown panels.",
    ],
    ["menubar", "Menubar", "An application menu bar, desktop style."],
    ["breadcrumb", "Breadcrumb", "Where you are in a hierarchy."],
    ["pagination", "Pagination", "Move between pages of results."],
    [
      "sidebar",
      "Sidebar",
      "A collapsible app sidebar with groups and nested items.",
    ],
  ],
  "Data Display": [
    [
      "card",
      "Card",
      "A raised slab for grouping content, with a marble footer band.",
    ],
    ["item", "Item", "A flexible row for lists: media, text and actions."],
    ["badge", "Badge", "A small status label."],
    ["avatar", "Avatar", "A person's picture, with initials as fallback."],
    ["table", "Table", "A simple, styled data table."],
    [
      "data-table",
      "Data Table",
      "Sort, resize, reorder, pin and edit columns, TanStack powered.",
    ],
    [
      "chart",
      "Chart",
      "Recharts with Marble colours, glossy marks and marble fills.",
      {
        examples: [
          "area-chart",
          "bar-chart",
          "line-chart",
          "pie-chart",
          "radial-chart",
        ],
      },
    ],
    [
      "accordion",
      "Accordion",
      "Stacked sections that expand one at a time or many.",
    ],
    ["collapsible", "Collapsible", "Show and hide a single piece of content."],
    ["carousel", "Carousel", "A swipeable row of slides."],
    ["kbd", "Kbd", "Keyboard keys, as little keycaps."],
    ["code-block", "Code Block", "A code snippet with a copy button."],
  ],
  Feedback: [
    ["alert", "Alert", "A callout for information or errors."],
    ["toast", "Toast", "Brief notifications that stack and swipe away."],
    ["progress", "Progress", "How far a task has got."],
    ["meter", "Meter", "A static measurement within a known range."],
    [
      "skeleton",
      "Skeleton",
      "Placeholders while content loads, with a gentle reveal.",
    ],
    ["spinner", "Spinner", "A glossy pebble that morphs while you wait."],
    ["empty", "Empty", "What to show when there's nothing to show."],
  ],
  Chat: [
    [
      "agent-chat",
      "Agent Chat",
      "A streaming AI chat on the AI SDK: reasoning, tools, approvals and attachments.",
      {
        install: [
          "prompt-input",
          "message",
          "bubble",
          "message-scroller",
          "trace",
          "attachment",
          "alert",
          "card",
          "spinner",
        ],
      },
    ],
    ["message", "Message", "One chat message: avatar, content and footer."],
    ["bubble", "Bubble", "Chat bubbles in every variant."],
    ["marker", "Marker", "Inline events and separators in a thread."],
    ["trace", "Trace", "What an agent did, step by step."],
    ["attachment", "Attachment", "Files attached to a message."],
    [
      "message-scroller",
      "Message Scroller",
      "A chat scroller that sticks to the newest message.",
    ],
  ],
  Layout: [
    ["separator", "Separator", "A thin divider between content."],
    ["frame", "Frame", "A recessed marble tray holding raised panels."],
    ["aspect-ratio", "Aspect Ratio", "Keep content at a fixed ratio."],
    [
      "scroll-area",
      "Scroll Area",
      "A scroll container with the kit's scrollbar.",
    ],
    ["resizable", "Resizable", "Panels you can resize by dragging the handle."],
  ],
}

export const componentPages: ComponentPage[] = groups.flatMap((group) =>
  byGroup[group].map(([slug, title, description, extra]) => ({
    slug,
    title,
    group,
    description,
    examples: extra?.examples ?? [slug],
    install: extra?.install ?? [slug],
  }))
)

export const componentPage = (slug: string) =>
  componentPages.find((page) => page.slug === slug)
