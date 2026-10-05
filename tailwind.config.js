/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F3ECE1',
          300: '#E8DCcb',
          400: '#DACAB2',
          500: '#C7B194',
        },
        gold: {
          50: '#FAF6EE',
          100: '#F3E8D0',
          200: '#E4CEA0',
          300: '#D4B370',
          400: '#C49C48',
          500: '#B08836',
          600: '#947029',
          700: '#75561E',
          800: '#583F16',
          900: '#3D2A0E',
        },
        warmBrown: {
          50: '#F9F7F5',
          100: '#EFEBE7',
          200: '#DDD5CD',
          300: '#C3B6A9',
          400: '#A49282',
          500: '#867262',
          600: '#6B594B',
          700: '#524338',
          800: '#3C3028',
          900: '#261E19',
          950: '#1A1410',
        },
        espresso: '#231C18',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(184, 134, 11, 0.08), 0 4px 12px -4px rgba(42, 36, 33, 0.05)',
        'luxury-hover': '0 20px 40px -15px rgba(176, 136, 54, 0.16), 0 8px 16px -6px rgba(42, 36, 33, 0.08)',
        'card': '0 2px 20px 0 rgba(74, 62, 54, 0.04)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
