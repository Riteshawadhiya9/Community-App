# Roadmap & Development Phases

## Phase 1: Environment Setup & Data Foundation
- [x] Initialize project using Vite/Next.js with React & TypeScript.
- [x] Configure Tailwind CSS, plugins, and custom dark mode color tokens in `tailwind.config.js`.
- [x] Install required icons (`lucide-react`).
- [x] Build TypeScript interface domain models in `src/types/index.ts`.
- [x] Create mock database `src/mock/initialData.ts` with 3+ servers, 5+ channels per server, active user rosters, and dynamic initial chat histories.

## Phase 2: Core Structural Layout Development
- [x] Create `MainLayout` dynamic grid system.
- [x] Implement `ServerSidebar` with icon navigation, unread badges, and active server selection state.
- [x] Build `ChannelSidebar` featuring collapsible categories, active channel selection, and user profile footer widget.
- [x] Build basic `ChatHeader` with channel metadata and toggle icons.

## Phase 3: Interactive Chat Feed & Input System
- [x] Implement `MessageList` to display rich chat histories grouped by date/time.
- [x] Build `MessageItem` component supporting avatars, sender names, badges, message content, and image/code attachment previews.
- [x] Develop `MessageInput` component supporting text entry, emoji selection trigger, and state handling.
- [x] Wire up `ChatContext` to allow users to post new messages live to state and persist them to `localStorage`.

## Phase 4: Members Sidebar & Dynamic Presence
- [x] Build `MembersSidebar` grouped by roles and online statuses (`Online`, `Idle`, `Offline`).
- [x] Create interactive `UserProfileModal` popover triggering when a user clicks on an avatar or name.
- [x] Implement active typing simulation or dynamic response feedback.

## Phase 5: Mobile Responsiveness, UX Refinement & Polish
- [x] Add touch-friendly Mobile Navigation Drawers using sliding CSS overlays or Radix Dialog.
- [x] Add smooth animations, dynamic scroll behavior, and keyboard shortcut listeners (`Enter` to send).
- [x] Conduct layout audit across mobile (iPhone/Android width), tablet, and desktop viewports.