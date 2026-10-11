import { X, Calendar, MessageSquare, Shield, AtSign } from 'lucide-react';
import { User, UserStatus } from '../../types';
import { formatFullDate } from '../../utils/formatDate';

interface UserProfileModalProps {
  user: User | null;
  onClose: () => void;
  onSendMessage?: (user: User) => void;
}

function statusDotClass(status: UserStatus): string {
  switch (status) {
    case 'online':
      return 'bg-emerald-500';
    case 'dnd':
      return 'bg-rose-500';
    case 'idle':
      return 'bg-amber-500';
    case 'offline':
    default:
      return 'bg-slate-500';
  }
}

function statusText(status: UserStatus): string {
  switch (status) {
    case 'online':
      return 'Online';
    case 'idle':
      return 'Away / Idle';
    case 'dnd':
      return 'Do Not Disturb';
    case 'offline':
    default:
      return 'Offline';
  }
}

function roleBadgeStyle(role: string) {
  switch (role) {
    case 'Admin':
      return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    case 'Moderator':
      return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    case 'Bot':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default:
      return 'bg-slate-700/50 text-slate-300 border-slate-600/40';
  }
}

export default function UserProfileModal({ user, onClose, onSendMessage }: UserProfileModalProps) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-canvas-darkest border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
          <button
            onClick={onClose}
            aria-label="Close profile"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar with status indicator */}
        <div className="px-5 pb-5">
          <div className="relative -mt-12 mb-3 inline-block">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-20 h-20 rounded-full border-4 border-canvas-darkest bg-canvas-card shadow-lg object-cover"
            />
            <span
              className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-3 border-canvas-darkest ${statusDotClass(user.status)}`}
              title={statusText(user.status)}
            />
          </div>

          {/* User info card */}
          <div className="bg-canvas-card/70 rounded-xl p-4 border border-slate-700/60">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  {user.displayName}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <AtSign className="w-3 h-3 text-slate-500" />
                  {user.username}
                </p>
              </div>

              {/* Role badge */}
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 ${roleBadgeStyle(user.role)}`}
              >
                <Shield className="w-3 h-3" />
                {user.role}
              </span>
            </div>

            {/* Custom Status */}
            {user.customStatus && (
              <div className="mt-3 text-xs text-slate-200 bg-canvas-darkest/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                {user.customStatus}
              </div>
            )}

            <div className="my-3 border-t border-slate-700/60" />

            {/* Bio */}
            {user.bio && (
              <div className="mb-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  About Me
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}

            {/* Member since */}
            {user.joinedAt && (
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Member Since
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {formatFullDate(user.joinedAt)}
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                onSendMessage?.(user);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-brand hover:bg-brand-hover text-white text-xs font-semibold shadow-md transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Send Message
            </button>
            <button
              onClick={onClose}
              className="py-2 px-3 rounded-lg bg-canvas-card hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
