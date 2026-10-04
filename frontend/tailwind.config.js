/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#2A0208',
          900: '#4A0404',
          800: '#5F0712',
          700: '#800020', // Royal Maroon
          600: '#9B111E',
          500: '#B81D24',
          100: '#FDECEF',
          50: '#FFF5F6',
        },
        gold: {
          900: '#6B5411',
          800: '#8E7019',
          700: '#B38F26',
          600: '#C79F2D',
          500: '#D4AF37', // Pure Gold
          400: '#E5C158',
          300: '#F5D77F',
          200: '#FAE8A4',
          100: '#FFF7D6',
          50: '#FFFDF0',
        },
        turmeric: {
          500: '#FFBF00',
          600: '#E5A900',
        },
        silk: {
          50: '#FFFEFA',
          100: '#FFFDF7',
          200: '#FAF3E0',
          300: '#F5EBE1',
        }
      },
      fontFamily: {
        telugu: ['"Mandali"', '"Suranna"', '"Gautami"', '"Nirmala UI"', 'sans-serif'],
        serif: ['"Cinzel Decorative"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Cinzel"', '"Marcellus"', '"Merriweather"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
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
