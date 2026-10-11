import React, { createContext, useContext, useState, useCallback } from 'react';
import { Server, Channel, User, CommunityState, Message, Attachment } from '../types';
import { SERVERS, USERS, CURRENT_USER, INITIAL_MESSAGES } from '../mock/initialData';
import { loadMessages, saveMessages } from '../utils/storage';

export interface CommunityContextValue extends CommunityState {
  servers: Server[];
  activeServerId: string;
  activeChannelId: string;
  members: User[];
  currentUser: User;
  activeServer: Server;
  activeChannel: Channel;
  setActiveServer: (serverId: string) => void;
  setActiveChannel: (channelId: string) => void;
  messages: Record<string, Message[]>;
  sendMessage: (
    contentOrChannelId: string,
    contentOrAttachment?: string | Attachment[],
    attachments?: Attachment[]
  ) => void;
  getChannelMessages: (channelId?: string) => Message[];
  addReaction: (messageId: string, emoji: string, channelId?: string) => void;
}

const CommunityContext = createContext<CommunityContextValue | null>(null);

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [servers, setServers] = useState<Server[]>(SERVERS);
  const [activeServerId, setActiveServerId] = useState<string>(SERVERS[0].id);
  const [activeChannelId, setActiveChannelId] = useState<string>(SERVERS[0].channels[0].id);

  // Initialize messages by combining initial seed data with localStorage user messages
  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const stored = loadMessages();
    if (stored) {
      const merged = { ...INITIAL_MESSAGES };
      for (const [cid, msgs] of Object.entries(stored)) {
        merged[cid] = [...(merged[cid] ?? []), ...msgs];
      }
      return merged;
    }
    return INITIAL_MESSAGES;
  });

  // Track user-generated messages for persistence
  const [, setUserMessages] = useState<Record<string, Message[]>>(() => {
    return loadMessages() ?? {};
  });

  const setActiveServer = useCallback((serverId: string) => {
    setServers(prevServers => {
      const server = prevServers.find(s => s.id === serverId);
      if (server) {
        setActiveServerId(serverId);
        setActiveChannelId(server.channels[0].id);
      }
      return prevServers;
    });
  }, []);

  const setActiveChannel = useCallback((channelId: string) => {
    setActiveChannelId(channelId);
    setServers(prevServers =>
      prevServers.map(server => ({
        ...server,
        channels: server.channels.map(ch =>
          ch.id === channelId ? { ...ch, unread: false } : ch
        ),
      }))
    );
  }, []);

  const activeServer = servers.find(s => s.id === activeServerId) || servers[0];
  const activeChannel = activeServer.channels.find(c => c.id === activeChannelId) || activeServer.channels[0];

  const members: User[] = activeServer.memberIds
    .map(id => USERS.find(u => u.id === id))
    .filter(Boolean) as User[];

  // Send message supporting both sendMessage(content) and sendMessage(channelId, content)
  const sendMessage = useCallback(
    (
      contentOrChannelId: string,
      contentOrAttachment?: string | Attachment[],
      attachments?: Attachment[]
    ) => {
      let targetChannelId = activeChannelId;
      let content = '';
      let finalAttachments: Attachment[] | undefined;

      if (typeof contentOrAttachment === 'string') {
        targetChannelId = contentOrChannelId;
        content = contentOrAttachment.trim();
        finalAttachments = attachments;
      } else {
        content = contentOrChannelId.trim();
        if (Array.isArray(contentOrAttachment)) {
          finalAttachments = contentOrAttachment;
        } else {
          finalAttachments = attachments;
        }
      }

      if (!content && (!finalAttachments || finalAttachments.length === 0)) return;

      const newMsg: Message = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        channelId: targetChannelId,
        sender: CURRENT_USER,
        content,
        timestamp: new Date().toISOString(),
        attachments: finalAttachments,
        reactions: [],
      };

      setMessages(prev => ({
        ...prev,
        [targetChannelId]: [...(prev[targetChannelId] ?? []), newMsg],
      }));

      setUserMessages(prev => {
        const next = {
          ...prev,
          [targetChannelId]: [...(prev[targetChannelId] ?? []), newMsg],
        };
        saveMessages(next);
        return next;
      });
    },
    [activeChannelId]
  );

  const getChannelMessages = useCallback(
    (channelId?: string) => {
      const cid = channelId || activeChannelId;
      return messages[cid] ?? [];
    },
    [messages, activeChannelId]
  );

  const addReaction = useCallback(
    (messageId: string, emoji: string, channelId?: string) => {
      const targetChannelId = channelId || activeChannelId;
      setMessages(prev => {
        const channelMsgs = prev[targetChannelId] || [];
        const updatedMsgs = channelMsgs.map(msg => {
          if (msg.id !== messageId) return msg;
          const reactions = msg.reactions ? [...msg.reactions] : [];
          const existingIndex = reactions.findIndex(r => r.emoji === emoji);

          if (existingIndex > -1) {
            const existing = reactions[existingIndex];
            const hasUserReacted = existing.users.includes(CURRENT_USER.id);

            if (hasUserReacted) {
              const newUsers = existing.users.filter(u => u !== CURRENT_USER.id);
              if (newUsers.length === 0) {
                reactions.splice(existingIndex, 1);
              } else {
                reactions[existingIndex] = {
                  ...existing,
                  count: existing.count - 1,
                  users: newUsers,
                };
              }
            } else {
              reactions[existingIndex] = {
                ...existing,
                count: existing.count + 1,
                users: [...existing.users, CURRENT_USER.id],
              };
            }
          } else {
            reactions.push({
              emoji,
              count: 1,
              users: [CURRENT_USER.id],
            });
          }

          return { ...msg, reactions };
        });

        return {
          ...prev,
          [targetChannelId]: updatedMsgs,
        };
      });
    },
    [activeChannelId]
  );

  const value: CommunityContextValue = {
    servers,
    activeServerId,
    activeChannelId,
    members,
    currentUser: CURRENT_USER,
    activeServer,
    activeChannel,
    setActiveServer,
    setActiveChannel,
    messages,
    sendMessage,
    getChannelMessages,
    addReaction,
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity(): CommunityContextValue {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error('useCommunity must be used within CommunityProvider');
  return ctx;
}
