/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F2EBDD',
          50: '#FAF7F2',
          100: '#F2EBDD',
          200: '#E5D8C1',
        },
        wine: {
          light: '#8F3E4E',
          DEFAULT: '#722F3D',
          dark: '#541F2B',
        },
        darkBrown: '#302622',
        coffee: '#29201F',
        warmWhite: '#FFFDF8',
        dota: {
          red: '#D32F2F',
          dark: '#1E1B18',
          accent: '#A6261D',
          gold: '#C29336',
          mana: '#2C82C9',
          hp: '#5DAA54',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'scrapbook': '2px 4px 15px rgba(48, 38, 34, 0.12), -1px 2px 5px rgba(48, 38, 34, 0.08)',
        'dota': '0 0 15px rgba(211, 47, 47, 0.4)',
      }
    },
  },
  plugins: [],
}
