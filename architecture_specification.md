# Architecture & Technical Specifications

## 1. Tech Stack Overview
- **Framework:** React 18+ (TypeScript) / Next.js or Vite
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`
- **Icons:** Lucide React (`lucide-react`)
- **State Management:** React Context API + Custom Hooks (`useCommunity`, `useChat`)
- **Data Persistence:** Browser `localStorage` sync layer for user-generated messages

## 2. Directory & Component Architecture

```
src/
├── assets/             # Static SVGs, background patterns, fallback avatars
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx          # Master split grid wrapper
│   │   ├── ServerSidebar.tsx       # Far-left server icon bar
│   │   ├── ChannelSidebar.tsx      # Middle channels navigation & user footer
│   │   └── MembersSidebar.tsx      # Right-hand active members list
│   ├── chat/
│   │   ├── ChatHeader.tsx          # Top bar with channel details & actions
│   │   ├── MessageList.tsx         # Scrollable message container
│   │   ├── MessageItem.tsx         # Individual message card component
│   │   └── MessageInput.tsx        # Text input field & action toolbar
│   ├── common/
│   │   ├── UserAvatar.tsx          # Dynamic avatar with status overlay
│   │   ├── StatusIndicator.tsx     # Color-coded online indicator
│   │   └── MobileDrawer.tsx        # Mobile overlay navigation drawer
│   └── modals/
│       └── UserProfileModal.tsx    # Detailed user bio popover
├── context/
│   ├── CommunityContext.tsx        # Active server, channel, member state
│   └── ChatContext.tsx             # Messages state, send message action, persistence
├── mock/
│   └── initialData.ts              # Rich seed dataset for servers, channels, users
├── types/
│   └── index.ts                    # TypeScript interfaces and domain models
└── utils/
    ├── formatDate.ts               # Readable relative time helpers
    └── storage.ts                  # LocalStorage getters and setters
```

## 3. Data Models (`types/index.ts`)

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
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'announcement' | 'help';
  topic: string;
  unread: boolean;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
}

export interface Attachment {
  type: 'image' | 'code';
  url?: string;
  codeSnippet?: string;
  language?: string;
}

export interface Message {
  id: string;
  channelId: string;
  sender: User;
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  reactions?: { emoji: string; count: number; users: string[] }[];
}
```