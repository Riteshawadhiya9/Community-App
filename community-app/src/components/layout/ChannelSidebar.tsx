import { useState } from 'react';
import {
  Hash, Volume2, Megaphone, HelpCircle,
  ChevronDown, ChevronRight,
  Mic, Headphones, Settings, X,
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { cn } from '../../utils/cn';
import { Channel, ChannelType } from '../../types';

// ─── Channel icon map ─────────────────────────────────────────────────────────

function ChannelIcon({ type, className }: { type: ChannelType; className?: string }) {
  const cls = cn('w-4 h-4 shrink-0', className);
  switch (type) {
    case 'announcement': return <Megaphone className={cls} />;
    case 'help':         return <HelpCircle className={cls} />;
    case 'voice':        return <Volume2 className={cls} />;
    default:             return <Hash className={cls} />;
  }
}

// ─── Channel item ─────────────────────────────────────────────────────────────

function ChannelItem({ channel, isActive, onClick }: {
  channel: Channel;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md mx-1 text-left',
        'text-sm transition-all duration-150 group cursor-pointer',
        isActive
          ? 'bg-canvas-card text-slate-100 font-medium shadow-xs'
          : 'text-slate-400 hover:bg-canvas-card/60 hover:text-slate-200 group-hover:translate-x-1',
      )}
      style={{ width: 'calc(100% - 8px)' }}
      aria-current={isActive ? 'page' : undefined}
    >
      <ChannelIcon
        type={channel.type}
        className={isActive ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-300'}
      />
      <span className="truncate">{channel.name}</span>
      {channel.unread && !isActive && (
        <span
          className="ml-auto w-2 h-2 rounded-full bg-slate-100 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform duration-200 animate-pulse"
          title="Unread messages"
        />
      )}
    </button>
  );
}

// ─── Category group ───────────────────────────────────────────────────────────

function CategoryGroup({ category, channels, activeChannelId, onSelectChannel }: {
  category: string;
  channels: Channel[];
  activeChannelId: string;
  onSelectChannel: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-1">
      <button
        onClick={() => setCollapsed(c => !c)}
        className="flex items-center gap-1 px-2 py-1 w-full text-left
                   text-[11px] font-semibold uppercase tracking-wider
                   text-slate-400 hover:text-slate-200 transition-colors duration-100"
        aria-expanded={!collapsed}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3" />
          : <ChevronDown  className="w-3 h-3" />
        }
        {category}
      </button>

      {!collapsed && (
        <div className="space-y-0.5">
          {channels.map(ch => (
            <ChannelItem
              key={ch.id}
              channel={ch}
              isActive={ch.id === activeChannelId}
              onClick={() => onSelectChannel(ch.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── User footer ──────────────────────────────────────────────────────────────

function statusColor(status: string) {
  switch (status) {
    case 'online': return 'bg-status-online';
    case 'idle':   return 'bg-status-idle';
    case 'dnd':    return 'bg-status-dnd';
    default:       return 'bg-status-offline';
  }
}

function UserFooter() {
  const { currentUser } = useCommunity();

  return (
    <div className="flex items-center gap-2 px-2 py-2 bg-canvas-darkest/80 mt-auto">
      {/* Avatar + status */}
      <div className="relative shrink-0">
        <img
          src={currentUser.avatar}
          alt={currentUser.displayName}
          className="w-8 h-8 rounded-full bg-canvas-card"
        />
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-canvas-secondary',
            statusColor(currentUser.status),
          )}
        />
      </div>

      {/* Name & handle */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-100 truncate leading-tight">
          {currentUser.displayName}
        </p>
        <p className="text-[11px] text-slate-400 truncate leading-tight">
          @{currentUser.username}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-0.5 shrink-0">
        {[
          { Icon: Mic,        label: 'Toggle Mic'   },
          { Icon: Headphones, label: 'Toggle Audio'  },
          { Icon: Settings,   label: 'User Settings' },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="w-7 h-7 flex items-center justify-center rounded
                       text-slate-400 hover:text-slate-100 hover:bg-canvas-card
                       transition-colors duration-100"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

interface ChannelSidebarProps {
  onSelectChannelCallback?: () => void;
  onClose?: () => void;
}

export default function ChannelSidebar({ onSelectChannelCallback, onClose }: ChannelSidebarProps = {}) {
  const { activeServer, activeChannelId, setActiveChannel } = useCommunity();

  // Group channels by category preserving order
  const categories = activeServer.channels.reduce<Record<string, Channel[]>>((acc, ch) => {
    if (!acc[ch.category]) acc[ch.category] = [];
    acc[ch.category].push(ch);
    return acc;
  }, {});

  const handleSelect = (id: string) => {
    setActiveChannel(id);
    onSelectChannelCallback?.();
  };

  return (
    <aside
      className="w-60 min-w-60 h-full bg-canvas-secondary flex flex-col"
      aria-label="Channel navigation"
    >
      {/* Server name header */}
      <div
        className="h-12 min-h-[48px] flex items-center px-4 border-b border-black/20
                   font-semibold text-slate-100
                   hover:bg-canvas-card transition-colors duration-150 shadow-sm"
      >
        <span className="truncate">{activeServer.name}</span>
        {onClose ? (
          <button
            onClick={onClose}
            className="ml-auto w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
            title="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <ChevronDown className="ml-auto w-4 h-4 text-slate-400 shrink-0" />
        )}
      </div>

      {/* Channels list */}
      <div className="flex-1 overflow-y-auto pt-3 px-2 space-y-1">
        {Object.entries(categories).map(([cat, channels]) => (
          <CategoryGroup
            key={cat}
            category={cat}
            channels={channels}
            activeChannelId={activeChannelId}
            onSelectChannel={handleSelect}
          />
        ))}
      </div>

      {/* User footer */}
      <UserFooter />
    </aside>
  );
}
