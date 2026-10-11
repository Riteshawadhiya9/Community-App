import { useEffect, useRef, useState, useMemo } from 'react';
import { Hash, Megaphone, HelpCircle, Volume2, ArrowDown } from 'lucide-react';
import { Message, ChannelType } from '../../types';
import { formatDateDivider, isSameDay } from '../../utils/formatDate';
import MessageItem from './MessageItem';
import { useCommunity } from '../../context/CommunityContext';
import { cn } from '../../utils/cn';

function ChannelWelcomeHeader({ type, name, topic }: { type: ChannelType; name: string; topic?: string }) {
  const getIcon = () => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="w-10 h-10 text-slate-100" />;
      case 'help':
        return <HelpCircle className="w-10 h-10 text-slate-100" />;
      case 'voice':
        return <Volume2 className="w-10 h-10 text-slate-100" />;
      default:
        return <Hash className="w-10 h-10 text-slate-100" />;
    }
  };

  return (
    <div className="px-4 pt-8 pb-4 mb-4 select-none">
      <div className="w-16 h-16 rounded-full bg-canvas-card flex items-center justify-center mb-4 shadow-inner">
        {getIcon()}
      </div>
      <h1 className="text-3xl font-bold text-slate-100 mb-2">
        Welcome to #{name}!
      </h1>
      <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
        {topic || `This is the start of the #${name} channel.`}
      </p>
      <div className="mt-6 border-b border-slate-700/60" />
    </div>
  );
}

function DateDivider({ label }: { label: string }) {
  return (
    <div className="relative my-5 flex items-center justify-center select-none">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-700/70" />
      </div>
      <div className="relative bg-canvas-primary px-3 py-0.5 rounded-full border border-slate-700/60 text-[11px] font-semibold text-slate-400 shadow-sm">
        {label}
      </div>
    </div>
  );
}

interface MessageListProps {
  onReply?: (message: Message) => void;
}

export default function MessageList({ onReply }: MessageListProps) {
  const { activeChannel, getChannelMessages } = useCommunity();
  const messages = getChannelMessages(activeChannel.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Group messages and compute compact display
  const messageItems = useMemo(() => {
    return messages.map((msg, index) => {
      const prevMsg = messages[index - 1];

      let isDateBoundary = false;
      let dateDividerText = '';

      if (!prevMsg || !isSameDay(prevMsg.timestamp, msg.timestamp)) {
        isDateBoundary = true;
        dateDividerText = formatDateDivider(msg.timestamp);
      }

      // Compact if same sender, same day, and within 5 minutes
      let isCompact = false;
      if (prevMsg && !isDateBoundary && prevMsg.sender.id === msg.sender.id) {
        const timeDiff = Math.abs(
          new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime(),
        );
        if (timeDiff < 5 * 60 * 1000) {
          isCompact = true;
        }
      }

      return {
        message: msg,
        isDateBoundary,
        dateDividerText,
        isCompact,
      };
    });
  }, [messages]);

  // Handle scroll detection for "Jump to Present"
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollBottom(distanceFromBottom > 150);
  };

  const scrollToBottom = (smooth = true) => {
    if (bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  // Scroll to bottom on channel change
  useEffect(() => {
    scrollToBottom(false);
  }, [activeChannel.id]);

  // Scroll to bottom on new message if close to bottom
  useEffect(() => {
    if (!showScrollBottom) {
      scrollToBottom(true);
    }
  }, [messages.length, showScrollBottom]);

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden bg-canvas-primary">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto flex flex-col justify-start"
      >
        {/* Welcome header for the channel */}
        <ChannelWelcomeHeader
          type={activeChannel.type}
          name={activeChannel.name}
          topic={activeChannel.topic}
        />

        {/* Message Feed */}
        <div className="flex-1 pb-4">
          {messageItems.map(({ message, isDateBoundary, dateDividerText, isCompact }) => (
            <div key={message.id}>
              {isDateBoundary && <DateDivider label={dateDividerText} />}
              <MessageItem
                message={message}
                isCompact={isCompact}
                onReply={onReply}
              />
            </div>
          ))}
          <div ref={bottomAnchorRef} />
        </div>
      </div>

      {/* Jump to Present / Bottom Indicator */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom(true)}
          className={cn(
            'absolute bottom-3 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full',
            'bg-brand hover:bg-brand-hover text-white text-xs font-medium shadow-lg transition-all',
            'animate-bounce-subtle cursor-pointer',
          )}
        >
          <span>Jump to present</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
