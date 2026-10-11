import React, { createContext, useContext } from 'react';
import { useCommunity } from './CommunityContext';
import { Message, ChatState } from '../types';

export interface ChatContextValue extends ChatState {
  sendMessage: (channelId: string, content: string) => void;
  getChannelMessages: (channelId: string) => Message[];
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const community = useCommunity();

  const value: ChatContextValue = {
    messages: community.messages,
    sendMessage: (channelId: string, content: string) => community.sendMessage(channelId, content),
    getChannelMessages: (channelId: string) => community.getChannelMessages(channelId),
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (ctx) return ctx;
  const community = useCommunity();
  return {
    messages: community.messages,
    sendMessage: (channelId: string, content: string) => community.sendMessage(channelId, content),
    getChannelMessages: (channelId: string) => community.getChannelMessages(channelId),
  };
}
