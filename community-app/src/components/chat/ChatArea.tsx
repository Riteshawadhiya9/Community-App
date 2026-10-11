import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../../types';

export default function ChatArea() {
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-canvas-primary overflow-hidden relative">
      {/* ── Message History List ── */}
      <MessageList onReply={msg => setReplyingTo(msg)} />

      {/* ── Message Input Bar ── */}
      <MessageInput
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />
    </div>
  );
}
