import { useState } from 'react';
import { Smile, Reply, Pin, Copy, Check, FileCode } from 'lucide-react';
import { Message, Attachment } from '../../types';
import { formatMessageTimestamp } from '../../utils/formatDate';
import { cn } from '../../utils/cn';
import { useCommunity } from '../../context/CommunityContext';
import UserProfileModal from '../layout/UserProfileModal';

const QUICK_EMOJIS = ['👍', '❤️', '🔥', '🚀', '🎉', '😂'];

interface MessageItemProps {
  message: Message;
  isCompact?: boolean;
  onReply?: (message: Message) => void;
}

function RoleBadge({ role }: { role: string }) {
  switch (role) {
    case 'Admin':
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
          Admin
        </span>
      );
    case 'Moderator':
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          Mod
        </span>
      );
    case 'Bot':
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Bot
        </span>
      );
    default:
      return null;
  }
}

function roleTextColor(role: string): string {
  switch (role) {
    case 'Admin':
      return 'text-rose-400';
    case 'Moderator':
      return 'text-indigo-400';
    case 'Bot':
      return 'text-emerald-400';
    default:
      return 'text-slate-100';
  }
}

function formatContent(text: string) {
  // Simple markdown processor for bold, italic, code
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\n)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={index} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-canvas-darkest text-indigo-300 font-mono text-[13px] border border-slate-700/50"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part === '\n') {
      return <br key={index} />;
    }
    return part;
  });
}

function AttachmentCard({ attachment }: { attachment: Attachment }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (attachment.codeSnippet) {
      navigator.clipboard.writeText(attachment.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (attachment.type === 'image' && attachment.url) {
    return (
      <div className="mt-2 rounded-lg overflow-hidden border border-slate-700/60 max-w-sm sm:max-w-md bg-canvas-darkest shadow-md">
        <img
          src={attachment.url}
          alt={attachment.filename || 'Message attachment'}
          className="w-full max-h-72 object-cover hover:scale-[1.01] transition-transform duration-200"
          loading="lazy"
        />
        {attachment.filename && (
          <div className="px-3 py-1.5 bg-canvas-darkest/90 text-xs text-slate-400 border-t border-slate-800">
            {attachment.filename}
          </div>
        )}
      </div>
    );
  }

  if (attachment.type === 'code' && attachment.codeSnippet) {
    return (
      <div className="mt-2 rounded-lg border border-slate-700/70 overflow-hidden bg-canvas-darkest max-w-xl shadow-md">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>{attachment.filename || 'snippet'}</span>
            {attachment.language && (
              <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                {attachment.language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 hover:text-slate-100 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-800"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre">
          <code>{attachment.codeSnippet}</code>
        </pre>
      </div>
    );
  }

  return null;
}

export default function MessageItem({ message, isCompact = false, onReply }: MessageItemProps) {
  const { currentUser, addReaction } = useCommunity();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(message.content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleReact = (emoji: string) => {
    addReaction(message.id, emoji, message.channelId);
    setShowEmojiPicker(false);
  };

  const timeString = formatMessageTimestamp(message.timestamp);

  return (
    <div
      className={cn(
        'group relative flex px-4 hover:bg-canvas-card/40 transition-colors duration-100',
        isCompact ? 'py-0.5' : 'pt-2.5 pb-1',
      )}
    >
      {/* ── Hover Quick Actions Bar ── */}
      <div
        className={cn(
          'absolute right-4 -top-3 z-10 hidden group-hover:flex items-center',
          'bg-canvas-secondary border border-slate-700/80 rounded-md shadow-lg py-0.5 px-1 gap-0.5',
        )}
      >
        {/* Quick Reactions Popover Trigger */}
        <div className="relative group/btn">
          <button
            onClick={() => setShowEmojiPicker(v => !v)}
            aria-label="Add Reaction"
            className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-amber-300 hover:bg-canvas-card hover:scale-110 active:scale-95 transition-all"
          >
            <Smile className="w-4 h-4" />
          </button>
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-canvas-darkest text-[10px] font-medium text-slate-200 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-slate-700/80 z-30">
            Add Reaction
          </div>

          {showEmojiPicker && (
            <div className="absolute right-0 bottom-full mb-1.5 bg-canvas-darkest border border-slate-700 rounded-lg p-1.5 flex gap-1 shadow-2xl z-20">
              {QUICK_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleReact(emoji)}
                  className="w-7 h-7 flex items-center justify-center hover:bg-canvas-card rounded text-base transition-transform hover:scale-125"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reply */}
        <div className="relative group/btn">
          <button
            onClick={() => onReply?.(message)}
            aria-label="Reply"
            className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-100 hover:bg-canvas-card hover:scale-110 active:scale-95 transition-all"
          >
            <Reply className="w-4 h-4" />
          </button>
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-canvas-darkest text-[10px] font-medium text-slate-200 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-slate-700/80 z-30">
            Reply
          </div>
        </div>

        {/* Pin */}
        <div className="relative group/btn">
          <button
            aria-label="Pin Message"
            className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-100 hover:bg-canvas-card hover:scale-110 active:scale-95 transition-all"
          >
            <Pin className="w-4 h-4" />
          </button>
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-canvas-darkest text-[10px] font-medium text-slate-200 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-slate-700/80 z-30">
            Pin
          </div>
        </div>

        {/* Copy */}
        <div className="relative group/btn">
          <button
            onClick={handleCopyText}
            aria-label="Copy Text"
            className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-100 hover:bg-canvas-card hover:scale-110 active:scale-95 transition-all"
          >
            {copiedText ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-canvas-darkest text-[10px] font-medium text-slate-200 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-slate-700/80 z-30">
            {copiedText ? 'Copied!' : 'Copy Text'}
          </div>
        </div>
      </div>

      {/* ── Compact vs Standard Layout ── */}
      {isCompact ? (
        <div className="flex w-full items-start pl-12">
          {/* Timestamp on hover */}
          <span className="w-12 -ml-12 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 select-none text-right pr-2 pt-1 transition-opacity">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          <div className="flex-1 min-w-0">
            <div className="text-[15px] leading-relaxed text-slate-200 break-words whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>

            {/* Attachments */}
            {message.attachments?.map((att, i) => (
              <AttachmentCard key={i} attachment={att} />
            ))}

            {/* Reactions */}
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {message.reactions.map(r => {
                  const hasReacted = r.users.includes(currentUser.id);
                  return (
                    <button
                      key={r.emoji}
                      onClick={() => handleReact(r.emoji)}
                      className={cn(
                        'flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs transition-colors border',
                        hasReacted
                          ? 'bg-brand/20 border-brand/50 text-indigo-300'
                          : 'bg-canvas-darkest/60 border-slate-700/60 text-slate-300 hover:bg-canvas-card',
                      )}
                    >
                      <span>{r.emoji}</span>
                      <span className="font-semibold text-[11px]">{r.count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4 w-full">
          {/* User Avatar */}
          <div className="relative shrink-0">
            <img
              src={message.sender.avatar}
              alt={message.sender.displayName}
              onClick={() => setShowProfile(true)}
              className="w-10 h-10 rounded-full bg-slate-700 object-cover hover:opacity-90 cursor-pointer shadow-sm transition-opacity"
            />
          </div>

          {/* Message Content Body */}
          <div className="flex-1 min-w-0">
            {/* Header: Name + Badge + Timestamp */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                onClick={() => setShowProfile(true)}
                className={cn(
                  'font-semibold text-sm hover:underline cursor-pointer',
                  roleTextColor(message.sender.role),
                )}
              >
                {message.sender.displayName}
              </span>

              <RoleBadge role={message.sender.role} />

              <span className="text-xs text-slate-400 hover:text-slate-300 select-none">
                {timeString}
              </span>
            </div>

            {/* Text Content */}
            <div className="text-[15px] leading-relaxed text-slate-200 mt-1 break-words whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>

            {/* Attachments */}
            {message.attachments?.map((att, i) => (
              <AttachmentCard key={i} attachment={att} />
            ))}

            {/* Reactions list */}
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {message.reactions.map(r => {
                  const hasReacted = r.users.includes(currentUser.id);
                  return (
                    <button
                      key={r.emoji}
                      onClick={() => handleReact(r.emoji)}
                      className={cn(
                        'flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs transition-colors border',
                        hasReacted
                          ? 'bg-brand/20 border-brand/50 text-indigo-300'
                          : 'bg-canvas-darkest/60 border-slate-700/60 text-slate-300 hover:bg-canvas-card',
                      )}
                    >
                      <span>{r.emoji}</span>
                      <span className="font-semibold text-[11px]">{r.count}</span>
                    </button>
                  );
                })}

                {/* Add reaction plus button */}
                <button
                  onClick={() => setShowEmojiPicker(v => !v)}
                  className="px-2 py-0.5 rounded-md text-xs bg-canvas-darkest/40 border border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-canvas-card transition-colors flex items-center gap-1"
                  title="Add reaction"
                >
                  <Smile className="w-3.5 h-3.5" />
                  <span>+</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User profile popup when avatar or name clicked */}
      {showProfile && (
        <UserProfileModal
          user={message.sender}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}
