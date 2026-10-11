import { useState, useEffect } from 'react';
import ServerSidebar from './ServerSidebar';
import ChannelSidebar from './ChannelSidebar';
import MembersSidebar from './MembersSidebar';
import ChatHeader from '../chat/ChatHeader';
import { cn } from '../../utils/cn';

interface MainLayoutProps {
  chatArea: React.ReactNode;
}

export default function MainLayout({ chatArea }: MainLayoutProps) {
  // Desktop members panel toggle (lg screens)
  const [showDesktopMembers, setShowDesktopMembers] = useState(true);

  // Mobile / Tablet drawers
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMembersDrawerOpen, setIsMembersDrawerOpen] = useState(false);

  // Close drawers on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileNavOpen(false);
        setIsMembersDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMembers = () => {
    // If on mobile or tablet (< 1024px / lg), toggle the overlay drawer
    if (window.innerWidth < 1024) {
      setIsMembersDrawerOpen(prev => !prev);
    } else {
      // On desktop, toggle inline panel
      setShowDesktopMembers(prev => !prev);
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-canvas-primary">
      {/* ── 1. Desktop & Tablet Static Sidebars (md and up) ── */}
      <div className="hidden md:flex shrink-0 h-full">
        {/* Server icon bar (72px) */}
        <ServerSidebar />

        {/* Channel sidebar (240px) */}
        <ChannelSidebar />
      </div>

      {/* ── 2. Mobile Left Drawer (ServerBar + ChannelSidebar) ── */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 flex h-full shadow-2xl animate-slide-in-left">
            <ServerSidebar />
            <ChannelSidebar
              onClose={() => setIsMobileNavOpen(false)}
              onSelectChannelCallback={() => setIsMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── 3. Main Center Content Column ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Chat header */}
        <ChatHeader
          showMembers={window.innerWidth < 1024 ? isMembersDrawerOpen : showDesktopMembers}
          onToggleMembers={handleToggleMembers}
          onToggleMobileNav={() => setIsMobileNavOpen(true)}
        />

        {/* Chat body + Desktop members panel */}
        <div className="flex flex-1 min-h-0 overflow-hidden relative">
          {/* Main chat viewport */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {chatArea}
          </div>

          {/* Members sidebar inline — Desktop only (>= 1024px) */}
          <div
            className={cn(
              'hidden lg:flex transition-all duration-200 overflow-hidden',
              showDesktopMembers ? 'w-60 min-w-[240px]' : 'w-0 min-w-0',
            )}
          >
            {showDesktopMembers && <MembersSidebar />}
          </div>
        </div>
      </main>

      {/* ── 4. Mobile & Tablet Right Drawer for Members (< 1024px) ── */}
      {isMembersDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsMembersDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 h-full shadow-2xl animate-slide-in-right">
            <MembersSidebar onClose={() => setIsMembersDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
