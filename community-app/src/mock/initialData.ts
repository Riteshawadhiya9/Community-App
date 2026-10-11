import { User, Server, Message } from '../types';

// ─── Users ────────────────────────────────────────────────────────────────────

export const USERS: User[] = [
  {
    id: 'u1',
    username: 'aman_dev',
    displayName: 'Aman',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aman',
    status: 'online',
    role: 'Admin',
    customStatus: '🚀 Building something epic',
    bio: 'Full-stack developer & community builder.',
    joinedAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'u2',
    username: 'priya_codes',
    displayName: 'Priya',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    status: 'online',
    role: 'Moderator',
    customStatus: '☕ Fueled by coffee',
    bio: 'React enthusiast & open-source contributor.',
    joinedAt: '2023-02-20T09:00:00Z',
  },
  {
    id: 'u3',
    username: 'rohan_gamer',
    displayName: 'Rohan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan',
    status: 'idle',
    role: 'Member',
    customStatus: '🎮 Away in another world',
    bio: 'Game developer & pixel art lover.',
    joinedAt: '2023-03-05T11:00:00Z',
  },
  {
    id: 'u4',
    username: 'sara_design',
    displayName: 'Sara',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara',
    status: 'dnd',
    role: 'Member',
    customStatus: '🎨 Deep focus mode',
    bio: 'UI/UX designer — Figma is my playground.',
    joinedAt: '2023-04-10T14:00:00Z',
  },
  {
    id: 'u5',
    username: 'kai_ml',
    displayName: 'Kai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kai',
    status: 'online',
    role: 'Member',
    customStatus: '🤖 Training neural nets',
    bio: 'Machine learning engineer & data science nerd.',
    joinedAt: '2023-05-18T08:00:00Z',
  },
  {
    id: 'u6',
    username: 'alex_devops',
    displayName: 'Alex',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    status: 'offline',
    role: 'Member',
    customStatus: undefined,
    bio: 'DevOps & cloud infrastructure specialist.',
    joinedAt: '2023-06-01T07:00:00Z',
  },
  {
    id: 'u7',
    username: 'mia_security',
    displayName: 'Mia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mia',
    status: 'offline',
    role: 'Member',
    customStatus: undefined,
    bio: 'Cybersecurity analyst & CTF player.',
    joinedAt: '2023-07-14T16:00:00Z',
  },
  {
    id: 'u8',
    username: 'community_bot',
    displayName: 'CommunityBot',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot',
    status: 'online',
    role: 'Bot',
    customStatus: '⚡ Always online',
    bio: 'I help keep things running smoothly!',
    joinedAt: '2023-01-01T00:00:00Z',
  },
];

// ─── Current Logged-in User ───────────────────────────────────────────────────

export const CURRENT_USER: User = USERS[0]; // Aman

// ─── Servers ──────────────────────────────────────────────────────────────────

export const SERVERS: Server[] = [
  {
    id: 's1',
    name: 'DevHub',
    icon: 'DH',
    iconColor: 'bg-indigo-600',
    notifications: 3,
    memberIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8'],
    channels: [
      { id: 'c1', name: 'general',       type: 'text',         topic: 'General discussion for everything dev-related 🚀', unread: true,  category: 'Text Channels' },
      { id: 'c2', name: 'announcements', type: 'announcement', topic: 'Important updates from the DevHub team',          unread: false, category: 'Announcements' },
      { id: 'c3', name: 'help',          type: 'help',         topic: 'Stuck? Ask your questions here 🙋',               unread: true,  category: 'Text Channels' },
      { id: 'c4', name: 'discussions',   type: 'text',         topic: 'Deep-dive technical discussions',                 unread: false, category: 'Text Channels' },
      { id: 'c5', name: 'showcase',      type: 'text',         topic: 'Show off your projects and side hustles ✨',       unread: false, category: 'Text Channels' },
      { id: 'c6', name: 'lounge',        type: 'voice',        topic: 'Chill voice chat — all welcome',                 unread: false, category: 'Voice Channels' },
      { id: 'c7', name: 'study-room',    type: 'voice',        topic: 'Quiet co-working space',                         unread: false, category: 'Voice Channels' },
      { id: 'c8', name: 'welcome',       type: 'text',         topic: 'New members start here 👋',                       unread: false, category: 'Information'    },
      { id: 'c9', name: 'rules',         type: 'text',         topic: 'Community rules & guidelines',                   unread: false, category: 'Information'    },
    ],
  },
  {
    id: 's2',
    name: 'Design League',
    icon: '🎨',
    iconColor: 'bg-purple-600',
    notifications: 0,
    memberIds: ['u1', 'u4', 'u5'],
    channels: [
      { id: 'd1', name: 'general',    type: 'text',         topic: 'Design talk & inspiration',            unread: false, category: 'Text Channels' },
      { id: 'd2', name: 'critiques',  type: 'text',         topic: 'Give & receive design feedback',       unread: true,  category: 'Text Channels' },
      { id: 'd3', name: 'resources',  type: 'announcement', topic: 'Free fonts, icons & assets shared here', unread: false, category: 'Announcements' },
      { id: 'd4', name: 'portfolios', type: 'text',         topic: 'Share your portfolio links',           unread: false, category: 'Text Channels' },
      { id: 'd5', name: 'live-draw',  type: 'voice',        topic: 'Live design sessions',                 unread: false, category: 'Voice Channels' },
    ],
  },
  {
    id: 's3',
    name: 'AI Lab',
    icon: '🤖',
    iconColor: 'bg-emerald-600',
    notifications: 7,
    memberIds: ['u1', 'u5', 'u6', 'u8'],
    channels: [
      { id: 'a1', name: 'general',        type: 'text',         topic: 'AI news, papers, and hot takes 🧠',    unread: true,  category: 'Text Channels'  },
      { id: 'a2', name: 'papers',         type: 'announcement', topic: 'Latest ML research papers',             unread: false, category: 'Announcements'  },
      { id: 'a3', name: 'experiments',    type: 'text',         topic: 'Share your model experiments',          unread: true,  category: 'Text Channels'  },
      { id: 'a4', name: 'datasets',       type: 'help',         topic: 'Find datasets & benchmarks',            unread: false, category: 'Text Channels'  },
      { id: 'a5', name: 'voice-lab',      type: 'voice',        topic: 'Paper reading sessions',                unread: false, category: 'Voice Channels' },
    ],
  },
];

// ─── Messages (seed data per channel) ────────────────────────────────────────

const u = (id: string) => USERS.find(u => u.id === id)!;

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  // DevHub — #general
  c1: [
    {
      id: 'm1', channelId: 'c1', sender: u('u8'), timestamp: '2026-10-10T06:00:00Z',
      content: '👋 Good morning, DevHub! Ready to build something awesome today?',
      reactions: [{ emoji: '🚀', count: 5, users: ['u1','u2','u3','u4','u5'] }],
    },
    {
      id: 'm2', channelId: 'c1', sender: u('u2'), timestamp: '2026-10-10T06:15:00Z',
      content: 'Morning everyone! ☕ Just pushed a new feature — React Server Components with streaming. Mind-blowing stuff!',
    },
    {
      id: 'm3', channelId: 'c1', sender: u('u3'), timestamp: '2026-10-10T06:30:00Z',
      content: 'Oh nice Priya! RSC is a game changer. Been playing with it myself. Did you run into any issues with third-party client components?',
    },
    {
      id: 'm4', channelId: 'c1', sender: u('u2'), timestamp: '2026-10-10T06:35:00Z',
      content: 'Yeah, the `use client` boundary stuff tripped me up at first. Key takeaway: keep your data fetching as high up as possible.',
      attachments: [{
        type: 'code',
        language: 'tsx',
        filename: 'page.tsx',
        codeSnippet: `// Server Component — fetches directly
async function Page() {
  const data = await fetchData();
  return <ClientWidget data={data} />;
}`,
      }],
    },
    {
      id: 'm5', channelId: 'c1', sender: u('u5'), timestamp: '2026-10-10T07:00:00Z',
      content: 'This is gold 🙌 Saving this for later. Also — anyone tried Bun as a runtime instead of Node? Noticing 3x faster test runs.',
      reactions: [{ emoji: '🔥', count: 3, users: ['u1','u3','u2'] }],
    },
    {
      id: 'm6', channelId: 'c1', sender: u('u1'), timestamp: '2026-10-10T07:20:00Z',
      content: 'Bun is insane for tests. We switched our CI pipeline and shaved 4 minutes off build times. Highly recommend!',
    },
    {
      id: 'm7', channelId: 'c1', sender: u('u4'), timestamp: '2026-10-10T08:00:00Z',
      content: "Hey devs 👀 dropping this Figma plugin I've been working on — auto-generates Tailwind class tokens from design variables!",
      attachments: [{
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=700&q=80',
        filename: 'figma-tailwind-plugin.png',
      }],
      reactions: [
        { emoji: '😍', count: 8, users: ['u1','u2','u3','u5','u6','u7','u8'] },
        { emoji: '🔥', count: 4, users: ['u1','u2','u5','u8'] },
      ],
    },
    {
      id: 'm8', channelId: 'c1', sender: u('u6'), timestamp: '2026-10-10T09:00:00Z',
      content: 'Sara this is EXACTLY what I needed. My Tailwind configs are a mess right now 😭',
    },
    {
      id: 'm9', channelId: 'c1', sender: u('u1'), timestamp: '2026-10-10T10:30:00Z',
      content: 'This community keeps delivering. Love you all 💜 Let\'s keep building!',
      reactions: [{ emoji: '💜', count: 6, users: ['u2','u3','u4','u5','u6','u7'] }],
    },
  ],
  // DevHub — #announcements
  c2: [
    {
      id: 'ma1', channelId: 'c2', sender: u('u1'), timestamp: '2026-10-09T12:00:00Z',
      content: '📣 **Welcome to DevHub Announcements!**\n\nAll major updates, events, and community news will be posted here. Sit tight — big things are coming! 🚀',
      reactions: [{ emoji: '🎉', count: 12, users: ['u2','u3','u4','u5','u6','u7','u8'] }],
    },
    {
      id: 'ma2', channelId: 'c2', sender: u('u8'), timestamp: '2026-10-10T08:00:00Z',
      content: '⚡ **Bot update v2.3 is live!** New commands: `/leaderboard`, `/stats`, `/remind`. Use `!help` to see all available commands.',
    },
  ],
  // DevHub — #help
  c3: [
    {
      id: 'mh1', channelId: 'c3', sender: u('u3'), timestamp: '2026-10-10T07:00:00Z',
      content: 'Anyone know why `useEffect` fires twice in React 18 dev mode? I know it\'s StrictMode but is there a clean way to handle it?',
    },
    {
      id: 'mh2', channelId: 'c3', sender: u('u2'), timestamp: '2026-10-10T07:05:00Z',
      content: 'Yes! StrictMode intentionally double-invokes effects to help surface bugs. The key is: your cleanup function should undo everything the setup does. Here\'s the pattern:',
      attachments: [{
        type: 'code',
        language: 'ts',
        filename: 'useEffect pattern',
        codeSnippet: `useEffect(() => {
  const subscription = subscribe(id);
  return () => {
    unsubscribe(subscription); // cleanup mirrors setup
  };
}, [id]);`,
      }],
    },
    {
      id: 'mh3', channelId: 'c3', sender: u('u3'), timestamp: '2026-10-10T07:08:00Z',
      content: 'Oh that makes total sense! My cleanup wasn\'t unsubscribing properly. Fixed now — thanks Priya! 🙌',
      reactions: [{ emoji: '✅', count: 2, users: ['u2','u1'] }],
    },
  ],
  // DevHub — #discussions
  c4: [
    {
      id: 'md1', channelId: 'c4', sender: u('u5'), timestamp: '2026-10-10T09:00:00Z',
      content: 'Hot take: TypeScript strict mode should be mandatory for all new projects. Fight me. 😤',
    },
    {
      id: 'md2', channelId: 'c4', sender: u('u6'), timestamp: '2026-10-10T09:03:00Z',
      content: 'Absolutely agree. The "it slows you down" argument is dead — it pays you back 10x when debugging production.',
    },
    {
      id: 'md3', channelId: 'c4', sender: u('u1'), timestamp: '2026-10-10T09:07:00Z',
      content: 'Strict mode + `zod` for runtime validation is the ultimate combo. Type-safe everywhere 🔒',
      reactions: [{ emoji: '💯', count: 4, users: ['u2','u3','u5','u6'] }],
    },
  ],
  // DevHub — #showcase
  c5: [
    {
      id: 'ms1', channelId: 'c5', sender: u('u4'), timestamp: '2026-10-09T16:00:00Z',
      content: '🎉 Just launched my portfolio redesign! Built with Next.js 14, Framer Motion, and a custom cursor effect. Check it out 👇',
      attachments: [{
        type: 'image',
        url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=80',
        filename: 'portfolio-screenshot.png',
      }],
      reactions: [
        { emoji: '🔥', count: 11, users: ['u1','u2','u3','u5','u6','u7','u8'] },
        { emoji: '👏', count: 7, users: ['u1','u2','u5','u6','u7'] },
      ],
    },
    {
      id: 'ms2', channelId: 'c5', sender: u('u5'), timestamp: '2026-10-10T10:00:00Z',
      content: 'Just open-sourced my CLI tool for generating mock data from TypeScript interfaces — it\'s like Faker but type-driven. GitHub: github.com/kai-ml/type-faker ⚡',
      reactions: [{ emoji: '⭐', count: 9, users: ['u1','u2','u3','u4','u6'] }],
    },
  ],
  // Design League — #general
  d1: [
    {
      id: 'dl1', channelId: 'd1', sender: u('u4'), timestamp: '2026-10-10T09:00:00Z',
      content: 'Welcome to Design League 🎨 Drop your inspiration & design wins here!',
    },
  ],
  // AI Lab — #general
  a1: [
    {
      id: 'al1', channelId: 'a1', sender: u('u5'), timestamp: '2026-10-10T08:00:00Z',
      content: '🧠 GPT-4o just got even more capable. The new reasoning updates are wild — tried it on competitive math and it nailed every problem.',
    },
    {
      id: 'al2', channelId: 'a1', sender: u('u8'), timestamp: '2026-10-10T08:10:00Z',
      content: '⚡ AutoSummary: Top AI papers this week — Gemini Ultra 2.5, LLaMA fine-tuning guide, and a breakthrough in protein folding accuracy. Links in #papers!',
    },
  ],
};
