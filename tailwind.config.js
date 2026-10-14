/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hanbit: {
          dark: '#061324',          // Deep Sapphire Midnight
          forest: '#0a213d',        // Royal Navy Blue
          green: '#0e345e',         // Imperial Ocean Blue
          'green-light': '#0066cc', // Cerulean Cyan Blue
          sage: '#4a90e2',          // Celestial Sky Blue
          'sage-light': '#e6f0fc',  // Ice Porcelain Blue
          gold: '#f5a623',          // Crane Sun Gold
          'gold-light': '#ffcb05',  // Radiant Solar Yellow
          'gold-soft': '#fff8e6',   // Soft Golden Glow
          ruby: '#d61a3c',          // Crane Crimson
          'ruby-dark': '#8b0000',   // Deep Garnet
          ivory: '#f4f8fd',         // Pearl Frost Porcelain
          paper: '#ffffff',
          ink: '#0a172a',
          muted: '#526680',
          border: '#d4e2f2',
        }
      },
      fontFamily: {
        sans: ['"Pretendard"', '"Noto Sans KR"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(10, 33, 61, 0.08)',
        'glass-hover': '0 16px 48px 0 rgba(10, 33, 61, 0.18)',
        'glow-gold': '0 0 25px rgba(245, 166, 35, 0.4)',
        'glow-blue': '0 0 35px rgba(0, 102, 204, 0.35)',
        'glow-crane': '0 0 30px rgba(214, 26, 60, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
