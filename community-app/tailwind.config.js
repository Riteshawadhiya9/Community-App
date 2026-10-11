/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom design tokens from design_guidelines.md
        canvas: {
          darkest:   '#111214',   // Server sidebar bg
          secondary: '#2b2d31',   // Channel list bg
          primary:   '#313338',   // Chat area bg
          card:      '#383a40',   // Hover states & input bg
          modal:     '#1e1f22',   // Modal / elevated surface
        },
        brand: {
          DEFAULT: '#5865f2',     // Indigo accent
          hover:   '#4752c4',
        },
        status: {
          online:  '#23a55a',
          idle:    '#f0b232',
          dnd:     '#f23f43',
          offline: '#80848e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'slide-in-left':  'slideInLeft 0.25s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'fade-in':        'fadeIn 0.15s ease-out',
        'bounce-subtle':  'bounceSubtle 0.3s ease-out',
      },
      keyframes: {
        slideInLeft: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',     opacity: '1' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)'   },
        },
        bounceSubtle: {
          '0%':   { transform: 'scale(1)'    },
          '50%':  { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)'    },
        },
      },
    },
  },
  plugins: [],
};
