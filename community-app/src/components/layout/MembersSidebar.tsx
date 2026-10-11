import { useState } from 'react';
import { X } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { cn } from '../../utils/cn';
import { User, UserStatus } from '../../types';
import UserProfileModal from './UserProfileModal';

/**
 * Maps UserStatus to the exact colors requested:
 * - Green for online (#23a55a / emerald-500)
 * - Red for DND (#f23f43 / rose-500)
 * - Yellow for idle (#f0b232 / amber-500)
 * - Gray for offline (#80848e / slate-500)
 */
function getStatusDotColor(status: UserStatus): string {
  switch (status) {
    case 'online':
      return 'bg-emerald-500'; // Green
    case 'dnd':
      return 'bg-rose-500';    // Red
    case 'idle':
      return 'bg-amber-500';   // Yellow
    case 'offline':
    default:
      return 'bg-slate-500';   // Gray
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
      return 'text-slate-200';
  }
}

function RoleTag({ role }: { role: string }) {
  switch (role) {
    case 'Admin':
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
          Admin
        </span>
      );
    case 'Moderator':
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
          Mod
        </span>
      );
    case 'Bot':
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
          Bot
        </span>
      );
    default:
      return null;
  }
}

interface MemberRowProps {
  user: User;
  isOffline?: boolean;
  onClick: () => void;
}

function MemberRow({ user, isOffline = false, onClick }: MemberRowProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-left',
        'hover:bg-canvas-card transition-colors duration-100 group cursor-pointer',
        isOffline && 'opacity-65 hover:opacity-100',
      )}
      aria-label={`View profile of ${user.displayName}`}
    >
      {/* Avatar with Status Dot */}
      <div className="relative shrink-0">
        <img
          src={user.avatar}
          alt={user.displayName}
          className={cn(
            'w-8 h-8 rounded-full bg-slate-700 object-cover',
            isOffline && 'grayscale-30',
          )}
          loading="lazy"
        />
        {/* Status indicator dot */}
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-canvas-secondary',
            getStatusDotColor(user.status),
          )}
          title={`Status: ${user.status}`}
        />
      </div>

      {/* Name, role tag, and custom status */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'text-sm font-medium truncate group-hover:underline',
              roleTextColor(user.role),
            )}
          >
            {user.displayName}
          </span>
          <RoleTag role={user.role} />
        </div>

        {user.customStatus && (
          <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
            {user.customStatus}
          </p>
        )}
      </div>
    </button>
  );
}

interface MembersSidebarProps {
  onClose?: () => void;
}

export default function MembersSidebar({ onClose }: MembersSidebarProps = {}) {
  const { members } = useCommunity();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Group members into Online (online, idle, dnd) and Offline
  const onlineMembers = members.filter(m => m.status !== 'offline');
  const offlineMembers = members.filter(m => m.status === 'offline');

  return (
    <>
      <aside
        className="w-60 min-w-60 h-full bg-canvas-secondary flex flex-col select-none border-l border-black/10"
        aria-label="Community members"
      >
        {onClose && (
          <div className="h-12 min-h-[48px] flex items-center justify-between px-4 border-b border-black/20 text-slate-100 font-semibold">
            <span>Members</span>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
              title="Close members drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* ── ONLINE Group ── */}
          {onlineMembers.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                Online — {onlineMembers.length}
              </h3>
              <div className="space-y-0.5">
                {onlineMembers.map(user => (
                  <MemberRow
                    key={user.id}
                    user={user}
                    onClick={() => setSelectedUser(user)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── OFFLINE Group ── */}
          {offlineMembers.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                Offline — {offlineMembers.length}
              </h3>
              <div className="space-y-0.5">
                {offlineMembers.map(user => (
                  <MemberRow
                    key={user.id}
                    user={user}
                    isOffline
                    onClick={() => setSelectedUser(user)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* User profile popup when member clicked */}
      <UserProfileModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}
