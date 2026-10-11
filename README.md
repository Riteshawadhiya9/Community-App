# 🌐 Community App — Real-Time Community & Collaboration Platform

[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An extensive, production-grade community web application inspired by modern collaboration platforms like **Discord** and **Slack**. Built from the ground up with **React 19**, **TypeScript**, and **Tailwind CSS v4**, featuring rich multi-server navigation, dynamic channel switching, real-time message posting with `localStorage` persistence, interactive user presence tracking, and touch-optimized mobile drawers.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Server & Community Navigation](#1-server--community-navigation)
  - [2. Channel Management & Switching](#2-channel-management--switching)
  - [3. Interactive Chat Feed & State](#3-interactive-chat-feed--state)
  - [4. Rich Message Input Box](#4-rich-message-input-box)
  - [5. Members Roster & Dynamic Presence](#5-members-roster--dynamic-presence)
  - [6. Touch-Friendly Responsive Drawers](#6-touch-friendly-responsive-drawers)
- [Design System & Color Palette](#-design-system--color-palette)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Data Models & Types](#-data-models--types)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Available Scripts](#available-scripts)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Roadmap & Completed Phases](#-roadmap--completed-phases)
- [License](#-license)

---

## 🌟 Overview

The **Community App** replicates the fast, reactive, dark-mode user experience of modern team chat apps. It provides:
- **Instant multi-tier navigation**: Server rail (72px) ➔ Collapsible Channel Sidebar (240px) ➔ Chat Viewport (Flex grow) ➔ Presence Sidebar (240px).
- **Persistent State**: Newly sent messages are stored in browser `localStorage`, surviving page refreshes without needing a separate backend server for prototyping.
- **Fluid Layout**: Designed with responsive breakpoints for desktop (4-column layout), tablet (3-column layout with overlay drawer), and mobile devices (single-column chat with dual off-canvas slide-out drawers).

---

## 🚀 Key Features

### 1. Server & Community Navigation
- **Vertical Icon Rail (72px)**: Direct Messages icon, active community servers (`DevHub`, `Design League`, `AI Lab`), Add Server, and Discover Communities actions.
- **Micro-Animations**:
  - Expanding pill indicators (`h-0` ➔ `h-5` on hover, `h-10` when active).
  - Shape morphing on hover (`rounded-3xl` ➔ `rounded-2xl`).
  - Tactile spring scaling (`hover:scale-105 active:scale-95`).
- **Unread Badges**: Red notification pills displaying count or `9+` unread alerts.
- **Hover Tooltips**: Floating dark tooltip chips anchored beside each server icon.

### 2. Channel Management & Switching
- **Categorized Channel Lists**: Collapsible category groups (`Text Channels`, `Announcements`, `Voice Channels`, `Information`) with expand/collapse chevron toggles.
- **Channel Types & Icons**: Dynamic icon rendering based on channel type:
  - `#` Text channels (`Hash`)
  - 📢 Announcement channels (`Megaphone`)
  - ❓ Help channels (`HelpCircle`)
  - 🔊 Voice lounges (`Volume2`)
- **Unread Channel Indicators**: Glowing, animated pulse dots on channels with new activity.
- **Dynamic Switching**: Clicking any channel updates the active chat viewport, welcome banner, topic, and message history instantaneously.
- **User Footer Widget**: Fixed bottom profile widget displaying the logged-in user's avatar, online status indicator, handle (`@aman_dev`), and quick controls for Microphone, Audio/Deafen, and Settings.

### 3. Interactive Chat Feed & State
- **Channel Welcome Banners**: Hero welcome card showing channel icon, channel title (`Welcome to #general!`), and descriptive channel topic.
- **Date Dividers**: Clean centered date headers separating messages by date (`Today`, `Yesterday`, or formatted calendar date).
- **Compact Message Grouping**: Messages sent by the same user within 5 minutes are grouped compactly without redundant avatar repeats.
- **Markdown & Inline Formatting**: Supports `**bold**`, `*italic*`, inline `` `code` `` chips, links, and formatted multi-line paragraphs.
- **Rich Media Attachments**:
  - **Code Snippets**: Styled dark code cards with language badges (`TSX`, `TS`, `Python`) and a one-click **"Copy"** button with copied feedback.
  - **Image Previews**: Responsive rounded preview cards with subtle zoom effects.
- **Interactive Emoji Reactions**:
  - Reaction badges displaying emoji + count with active highlighting if the current user reacted.
  - Clicking any reaction increments/toggles reaction state live in state.
- **Hover Quick Actions Bar**:
  - Floating actions toolbar appearing on message hover:
    - 😀 **Quick Reaction Picker** (popover with popular community emojis: 👍, ❤️, 🔥, 🚀, 🎉, 😂)
    - ↩️ **Reply Simulation** (populates reply bar above input)
    - 📌 **Pin Message**
    - 📋 **Copy Text** (with checkmark confirmation feedback)
  - Animated micro-tooltips appearing on button hover.
- **Smooth Auto-Scroll & "Jump to Present"**:
  - Auto-scrolls to bottom on channel switch or when new messages arrive.
  - Detects if the user has scrolled up (>150px) and displays a floating, animated **"Jump to present ↓"** pill to jump straight back down.

### 4. Rich Message Input Box
- **Auto-Resizing Input**: Textarea dynamically expands up to 180px as more content is typed.
- **Keyboard Shortcuts**: <kbd>Enter</kbd> to submit immediately, <kbd>Shift + Enter</kbd> for multi-line line breaks.
- **Emoji Picker Popover**: Clickable smiley button with a grid of frequently used emojis (😀, 😂, 😍, 🚀, 🔥, 💜, 🎉, 💯, 👍, 🙌, ✨, 💡, ⚡, 👏, 🥳, 😎) that insert directly into the input.
- **Attachment Modal**: Plus button (+) opens an attachment menu:
  - **Attach Code Snippet**: Opens modal to enter filename, select programming language, and paste code.
  - **Attach Sample Image**: Attaches image asset with interactive removal chip.
- **Replying State Banner**: Displays reply bar above input with the target user and quote, dismissible with an <kbd>X</kbd> button.

### 5. Members Roster & Dynamic Presence
- **Status Sections**: Grouped into **Online** (`Online`, `Idle`, `Do Not Disturb`) and **Offline**.
- **Accurate Presence Dots**:
  - 🟢 **Green** (`#23a55a` / `bg-emerald-500`): Online
  - 🔴 **Red** (`#f23f43` / `bg-rose-500`): Do Not Disturb (DND)
  - 🟡 **Yellow** (`#f0b232` / `bg-amber-500`): Idle / Away
  - ⚪ **Gray** (`#80848e` / `bg-slate-500`): Offline
- **Role Tags & Colors**:
  - **Admin**: Rose badge (`ADMIN`) + rose username
  - **Moderator**: Indigo badge (`MOD`) + indigo username
  - **Bot**: Emerald badge (`BOT`) + emerald username
  - **Member**: Slate username with custom status quote
- **Interactive User Profile Modal**:
  - Clicking any member in the sidebar (or clicking an avatar/name in the chat feed) opens a full profile card:
    - Gradient banner header (Indigo ➔ Purple ➔ Pink)
    - Large avatar with presence dot
    - Display name and `@username` handle
    - Role badge with icon
    - Custom status quote
    - "About Me" bio section
    - "Member Since" date
    - Quick "Send Message" action

### 6. Touch-Friendly Responsive Drawers
- **Mobile Navigation Drawer (< 768px)**:
  - Dual hamburger button (<kbd>Menu</kbd>) in header slides out both the Server Rail and Channel Sidebar.
  - Selecting any channel auto-dismisses the drawer to reveal the chat.
- **Members Overlay Drawer (< 1024px)**:
  - Right-side off-canvas slide-out drawer triggered by the <kbd>Users</kbd> header button on tablets and mobile screens.
- **Hardware-Accelerated Transitions**:
  - Smooth 60 FPS CSS keyframe transitions (`slideInLeft`, `slideInRight`, `fadeIn`) with frosted-glass backdrop overlays.
  - Pressing <kbd>Escape</kbd> closes any open drawer or modal.

---

## 🎨 Design System & Color Palette

The visual design follows a cohesive, dark-mode first palette matching Discord and modern collaboration tools:

| Token Key | Tailwind Utility | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Darkest** | `bg-canvas-darkest` | `#111214` | Server Sidebar background & dark modals |
| **Canvas Secondary** | `bg-canvas-secondary` | `#2b2d31` | Channel Sidebar & Members Sidebar background |
| **Canvas Primary** | `bg-canvas-primary` | `#313338` | Main Chat Feed background |
| **Canvas Card** | `bg-canvas-card` | `#383a40` | Input box, hover states & elevated cards |
| **Canvas Modal** | `bg-canvas-modal` | `#1e1f22` | Popovers and floating menus |
| **Brand Accent** | `bg-brand` | `#5865f2` | Primary buttons, active channel indicator |
| **Brand Hover** | `bg-brand-hover` | `#4752c4` | Hover states for primary actions |
| **Status Online** | `bg-emerald-500` | `#23a55a` | Online presence dot |
| **Status Idle** | `bg-amber-500` | `#f0b232` | Idle / Away presence dot |
| **Status DND** | `bg-rose-500` | `#f23f43` | Do Not Disturb presence dot |
| **Status Offline**| `bg-slate-500` | `#80848e` | Offline presence dot |

---

## 🛠️ Architecture & Tech Stack

- **Core**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 8](https://vitejs.dev/) with Fast HMR
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@theme` variables
- **Icons**: [Lucide React](https://lucide.dev/) (consistent vector icon set)
- **Class Utilities**: `clsx` and `tailwind-merge` via `src/utils/cn.ts`
- **State Architecture**:
  - `CommunityContext`: Unifies state for active server, active channel, message dictionary, sending messages, reactions, and unread clear logic.
  - `ChatContext`: Backward-compatible facade layer delegating directly to `CommunityContext`.
- **Persistence**: `src/utils/storage.ts` synchronizing user messages to `localStorage` key `community_messages`.

---

## 📁 Project Directory Structure

```
community-app/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # SVGs and static media
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatArea.tsx        # Chat container connecting List + Input
│   │   │   ├── ChatHeader.tsx      # Header bar with channel info & drawer toggles
│   │   │   ├── MessageInput.tsx    # Multi-line input, emojis, & code snippet modal
│   │   │   ├── MessageItem.tsx     # Message card, avatars, badges, code preview, reactions
│   │   │   └── MessageList.tsx     # History feed, welcome banner, date dividers, auto-scroll
│   │   └── layout/
│   │       ├── ChannelSidebar.tsx  # Categorized channel navigation & user footer
│   │       ├── MainLayout.tsx      # Dynamic 4-column layout + mobile drawers
│   │       ├── MembersSidebar.tsx  # Online/Offline roster with status dots
│   │       ├── ServerSidebar.tsx   # Server icon bar with tooltips & notifications
│   │       └── UserProfileModal.tsx# Rich profile card modal
│   ├── context/
│   │   ├── CommunityContext.tsx    # Master state (servers, channels, messages, reactions)
│   │   └── ChatContext.tsx         # Chat helper hook / facade
│   ├── mock/
│   │   └── initialData.ts          # Seed data: 3 servers, 9 channels, 8 users, chat histories
│   ├── types/
│   │   ├── community.ts            # Domain types (User, Server, Channel, Message, etc.)
│   │   └── index.ts                # Type re-exports
│   ├── utils/
│   │   ├── cn.ts                   # Class merging helper (clsx + tailwind-merge)
│   │   ├── formatDate.ts           # Human-readable timestamps & date dividers
│   │   └── storage.ts              # LocalStorage message load/save/clear
│   ├── App.tsx                     # Application entry point with Providers
│   ├── index.css                   # Tailwind v4 theme, animations & base reset
│   └── main.tsx                    # React DOM root render
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🧩 Data Models & Types

All models are fully typed in [`src/types/community.ts`](file:///c:/Users/rites/OneDrive/Desktop/Aman's_Project/community-app/src/types/community.ts):

```typescript
export type UserStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  status: UserStatus;
  role: 'Admin' | 'Moderator' | 'Member' | 'Bot';
  customStatus?: string;
  bio?: string;
  joinedAt?: string;
}

export type ChannelType = 'text' | 'announcement' | 'help' | 'voice';

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  topic: string;
  unread: boolean;
  category: string;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  channels: Channel[];
  memberIds: string[];
  notifications?: number;
}

export interface Attachment {
  type: 'image' | 'code';
  url?: string;
  codeSnippet?: string;
  language?: string;
  filename?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  id: string;
  channelId: string;
  sender: User;
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  reactions?: Reaction[];
  isEdited?: boolean;
  replyTo?: string;
}
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `bun`

### Installation & Setup

1. **Clone or Navigate to the Repository**:
   ```bash
   cd "c:/Users/rites/OneDrive/Desktop/Aman's_Project/community-app"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/` (or the port specified in terminal).

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Enter</kbd> | Send message immediately | Message Input |
| <kbd>Shift</kbd> + <kbd>Enter</kbd> | Insert newline | Message Input |
| <kbd>Escape</kbd> | Close mobile drawers, profile modal, or code dialog | Global |

---

## 📋 Roadmap & Completed Phases

All development phases outlined in `development_phases.md` have been fulfilled:

- [x] **Phase 1: Environment Setup & Data Foundation**
  - Configured Vite + React 19 + TypeScript + Tailwind CSS v4.
  - Implemented domain models and mock data with 3 servers, multiple channels, 8 users, and rich chat histories.
- [x] **Phase 2: Core Structural Layout Development**
  - Created `MainLayout` dynamic grid system.
  - Built `ServerSidebar` with icon navigation, unread badges, and active server selection.
  - Built `ChannelSidebar` with collapsible categories and user footer widget.
- [x] **Phase 3: Interactive Chat Feed & Input System**
  - Built `MessageList` with date dividers and compact message grouping.
  - Built `MessageItem` supporting avatars, badges, timestamps, code snippets, images, and reactions.
  - Built `MessageInput` with emoji picker, code attachment modal, and <kbd>Enter</kbd> to send.
  - Wired `CommunityContext` with `localStorage` persistence.
- [x] **Phase 4: Members Sidebar & Dynamic Presence**
  - Grouped members by `Online` and `Offline` status with 4-color status indicator dots.
  - Added role tags (`ADMIN`, `MOD`, `BOT`, `MEMBER`).
  - Created interactive `UserProfileModal` popover for clicking members or chat avatars.
- [x] **Phase 5: Mobile Responsiveness, UX Refinement & Polish**
  - Added mobile off-canvas slide-out drawers with hamburger toggles and backdrop blur.
  - Implemented subtle hover animations on server icons, unread channel badges, and action tooltips.
  - Full UI/UX audit against `prd_specification.md`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
