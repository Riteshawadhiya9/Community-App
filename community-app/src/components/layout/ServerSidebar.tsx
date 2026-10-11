import { useState } from 'react';
import { Plus, Compass } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { cn } from '../../utils/cn';
import { Server } from '../../types';

function ServerIcon({ server, isActive, onClick }: {
  server: Server;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isEmoji = server.icon.length <= 2;

  return (
    <div className="relative flex items-center group">
      {/* Active/hover pill indicator */}
      <div
        className={cn(
          'absolute -left-3 w-1 rounded-r-full bg-white transition-all duration-200',
          isActive  ? 'h-10 opacity-100' :
          hovered   ? 'h-5  opacity-100' : 'h-0 opacity-0',
        )}
      />

      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={server.name}
        className={cn(
          'relative w-12 h-12 flex items-center justify-center',
          'font-bold text-sm select-none overflow-hidden cursor-pointer shadow-sm',
          'transition-all duration-200 hover:scale-105 active:scale-95',
          isActive
            ? 'rounded-2xl bg-brand text-white shadow-brand/30 shadow-md'
            : cn(
                'rounded-3xl hover:rounded-2xl text-slate-300 hover:text-white',
                isEmoji ? 'bg-canvas-secondary hover:bg-brand' : server.iconColor,
              ),
        )}
        aria-label={`Switch to ${server.name}`}
        aria-pressed={isActive}
      >
        {isEmoji ? (
          <span className="text-2xl transition-transform duration-200 group-hover:scale-110">{server.icon}</span>
        ) : (
          <span className="transition-transform duration-200 group-hover:scale-105">{server.icon}</span>
        )}

        {/* Notification badge */}
        {!!server.notifications && !isActive && (
          <span
            className="absolute bottom-0.5 right-0.5 min-w-[18px] h-[18px] bg-rose-500 text-white
                       text-[10px] font-bold rounded-full flex items-center justify-center
                       border-2 border-canvas-darkest px-0.5 shadow-xs transition-transform duration-200 group-hover:scale-110"
          >
            {server.notifications > 9 ? '9+' : server.notifications}
          </span>
        )}
      </button>

      {/* Tooltip */}
      <div
        className={cn(
          'absolute left-16 z-50 pointer-events-none',
          'bg-canvas-darkest text-white text-sm font-semibold',
          'px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap',
          'transition-all duration-150',
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
        )}
      >
        {server.name}
        {/* Triangle */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-canvas-darkest" />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-8 h-px bg-slate-700 rounded-full mx-auto" />;
}

export default function ServerSidebar() {
  const { servers, activeServerId, setActiveServer } = useCommunity();

  return (
    <nav
      className="w-[72px] min-w-[72px] h-full bg-canvas-darkest flex flex-col items-center pt-3 pb-4 gap-2 overflow-y-auto overflow-x-visible"
      aria-label="Server navigation"
    >
      {/* Direct Messages icon (home) */}
      <button
        className="w-12 h-12 bg-canvas-secondary hover:bg-brand rounded-3xl hover:rounded-2xl
                   transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer
                   flex items-center justify-center text-slate-300 hover:text-white shadow-sm"
        title="Direct Messages"
        aria-label="Direct Messages"
      >
        <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
          <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318962 17.6584 0.0107985C17.4062 0.450484 17.1749 0.904309 16.9652 1.36986C15.0283 1.07418 13.0832 1.07418 11.1463 1.36986C10.9367 0.904321 10.7054 0.450496 10.4531 0.0107985C8.60227 0.321285 6.79877 0.882991 5.08849 1.68231C1.61232 6.86305 0.675027 11.9189 1.1435 16.9019C3.10951 18.364 5.28483 19.4662 7.59145 20.1818C8.11073 19.4797 8.57224 18.7375 8.97177 17.9587C8.22523 17.6717 7.50788 17.3197 6.82986 16.9069C7.01085 16.7753 7.18823 16.6397 7.36199 16.5081C9.37605 17.4391 11.5694 17.9210 13.7925 17.9210C16.0156 17.9210 18.2089 17.4391 20.2230 16.5081C20.3986 16.6478 20.5760 16.7834 20.7551 16.9069C20.0753 17.3209 19.3561 17.6740 18.6073 17.9617C19.0069 18.7395 19.4672 19.4817 19.9876 20.1858C22.2960 19.4681 24.4727 18.3657 26.4388 16.9019C26.9987 11.1799 25.5585 6.17129 23.0212 1.67671ZM9.68041 13.9196C8.39411 13.9196 7.33678 12.7148 7.33678 11.2390C7.33678 9.76321 8.36135 8.54731 9.68041 8.54731C10.9994 8.54731 12.0567 9.76321 12.0240 11.2390C12.0240 12.7148 10.9994 13.9196 9.68041 13.9196ZM17.9045 13.9196C16.6182 13.9196 15.5609 12.7148 15.5609 11.2390C15.5609 9.76321 16.5855 8.54731 17.9045 8.54731C19.2235 8.54731 20.2808 9.76321 20.2480 11.2390C20.2480 12.7148 19.2235 13.9196 17.9045 13.9196Z"/>
        </svg>
      </button>

      <Divider />

      {/* Server icons */}
      {servers.map(server => (
        <ServerIcon
          key={server.id}
          server={server}
          isActive={server.id === activeServerId}
          onClick={() => setActiveServer(server.id)}
        />
      ))}

      <Divider />

      {/* Add server */}
      <button
        className="w-12 h-12 bg-canvas-secondary hover:bg-emerald-500 rounded-3xl hover:rounded-2xl
                   transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer
                   flex items-center justify-center text-emerald-400 hover:text-white shadow-sm"
        title="Add a Server"
        aria-label="Add a server"
      >
        <Plus size={22} strokeWidth={2.5} />
      </button>

      {/* Discover servers */}
      <button
        className="w-12 h-12 bg-canvas-secondary hover:bg-emerald-500 rounded-3xl hover:rounded-2xl
                   transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer
                   flex items-center justify-center text-emerald-400 hover:text-white shadow-sm"
        title="Discover Servers"
        aria-label="Discover servers"
      >
        <Compass size={20} />
      </button>
    </nav>
  );
}
