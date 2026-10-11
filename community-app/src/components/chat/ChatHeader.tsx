import { Hash, Volume2, Megaphone, HelpCircle, Search, Users, Bell, Pin, Inbox, Menu } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { cn } from '../../utils/cn';
import { ChannelType } from '../../types';

function ChannelTypeIcon({ type }: { type: ChannelType }) {
  const cls = 'w-5 h-5 text-slate-400 shrink-0';
  switch (type) {
    case 'announcement': return <Megaphone className={cls} />;
    case 'help':         return <HelpCircle className={cls} />;
    case 'voice':        return <Volume2 className={cls} />;
    default:             return <Hash className={cls} />;
  }
}

interface ChatHeaderProps {
  showMembers?: boolean;
  onToggleMembers?: () => void;
  onToggleMobileNav?: () => void;
}

export default function ChatHeader({
  showMembers = true,
  onToggleMembers,
  onToggleMobileNav,
}: ChatHeaderProps) {
  const { activeChannel, members } = useCommunity();

  const onlineCount = members.filter(m => m.status !== 'offline').length;

  return (
    <header
      className="h-12 min-h-[48px] flex items-center px-4 gap-3
                 border-b border-black/20 bg-canvas-primary shadow-sm z-10"
    >
      {/* Mobile hamburger menu toggle */}
      <button
        onClick={onToggleMobileNav}
        aria-label="Open server and channels drawer"
        className="md:hidden w-8 h-8 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-canvas-card transition-colors shrink-0 -ml-1 mr-0.5"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Channel name */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <ChannelTypeIcon type={activeChannel.type} />
        <span className="font-semibold text-slate-100 text-base truncate">
          {activeChannel.name}
        </span>
        {activeChannel.topic && (
          <>
            <div className="w-px h-5 bg-slate-600 shrink-0 mx-1" />
            <span className="text-sm text-slate-400 truncate">
              {activeChannel.topic}
            </span>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 shrink-0">
        {[
          { Icon: Bell,    label: 'Notification Settings' },
          { Icon: Pin,     label: 'Pinned Messages' },
          { Icon: Inbox,   label: 'Inbox' },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded',
              'text-slate-400 hover:text-slate-100 transition-colors duration-100',
              'hover:bg-canvas-card',
            )}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}

        {/* Members toggle */}
        <button
          onClick={onToggleMembers}
          aria-label="Toggle members list"
          aria-pressed={showMembers}
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded',
            'transition-colors duration-100',
            showMembers
              ? 'text-slate-100 bg-canvas-card'
              : 'text-slate-400 hover:text-slate-100 hover:bg-canvas-card',
          )}
        >
          <Users className="w-5 h-5" />
        </button>

        {/* Member count */}
        <span className="text-sm text-slate-400 ml-1 hidden sm:inline">
          {onlineCount} online
        </span>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-canvas-darkest rounded px-2 py-1 ml-2 w-36">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search messages"
            className="bg-transparent text-sm text-slate-300 placeholder-slate-500
                       outline-none w-full"
          />
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
        </div>
      </div>
    </header>
  );
}
