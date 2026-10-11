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

export interface CommunityState {
  servers: Server[];
  activeServerId: string;
  activeChannelId: string;
  members: User[];
  currentUser: User;
}

export interface ChatState {
  messages: Record<string, Message[]>;
}
