# Design System & UI Specifications

## 1. Visual Theme & Color System (Dark Mode First)

| Token Key | Tailwind Equivalent | Color Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Darkest** | `bg-slate-950` / `#111214` | `#111214` | Server Sidebar background |
| **Canvas Secondary** | `bg-slate-900` / `#2b2d31` | `#2b2d31` | Channel List background |
| **Canvas Primary** | `bg-slate-800` / `#313338` | `#313338` | Chat Feed main area |
| **Canvas Card** | `bg-slate-700` / `#383a40` | `#383a40` | Hover states & Message input background |
| **Brand Accent** | `bg-indigo-600` / `#5865f2` | `#5865f2` | Active channel indicator, send button, badges |
| **Text Primary** | `text-slate-100` | `#f2f3f5` | Headlines, active text, message body |
| **Text Secondary** | `text-slate-400` | `#949ba4` | Channel icons, timestamps, muted subtitles |
| **Status Online** | `bg-emerald-500` | `#23a55a` | Active presence indicator |
| **Status Idle** | `bg-amber-500` | `#f0b232` | Idle presence indicator |
| **Status DND** | `bg-rose-500` | `#f23f43` | Do Not Disturb presence indicator |

## 2. Layout Structure & Responsive Breakpoints

```
-----------------------------------------------------------------------------
| Server | Channel Sidebar | Chat Header                             | Members |
| Bar    | (240px)         |-----------------------------------------| Sidebar |
| (72px) |                 | Chat Message Feed                       | (240px) |
|        |                 | (Flex grow)                             |         |
|        |-----------------|-----------------------------------------|         |
|        | User Footer     | Message Input Box                       |         |
-----------------------------------------------------------------------------
```

- **Desktop (`>= 1024px`):** Full 4-column layout (`Server Bar` + `Channel List` + `Chat View` + `Members List`).
- **Tablet (`768px - 1023px`):** 3-column layout (`Server Bar` + `Channel List` + `Chat View`). Members list converted to toggleable overlay drawer.
- **Mobile (`< 768px`):** Single column chat view active by default. Top header includes dual hamburger toggles to open the Channel Sidebar (left drawer) and Members List (right drawer).

## 3. Micro-interactions & UI Polish
- **Server Icons:** Pill animation expanding on hover (`h-5` to `h-10`) with smooth rounded corner morphing (`rounded-3xl` to `rounded-2xl`).
- **Channel Hover:** Background overlay with subtle left indent transition.
- **Message Actions:** Quick action bar appearing on message item hover (`Reply`, `Add Reaction`, `Pin`).
- **Scroll Behavior:** Smooth auto-scrolling to latest message with an animated "Jump to Present" indicator when scrolled up.