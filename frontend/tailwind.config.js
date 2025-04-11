/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'rotate-close-mobile-nav-toggle-btn': {
          '0%': {
            transform: 'rotateZ(360deg)',
          },
          '100%': {
            transform: 'rotateZ(0deg)',
          },
        },
        'rotate-open-mobile-nav-toggle-btn': {
          '0%': {
            transform: 'rotateZ(0deg)',
          },
          '100%': {
            transform: 'rotateZ(360deg)',
          },
        },
      },
      animation: {
        'rotate-close-mobile-nav-toggle-btn':
          'rotate-close-mobile-nav-toggle-btn 300ms ease-in-out',
        'rotate-open-mobile-nav-toggle-btn':
          'rotate-open-mobile-nav-toggle-btn 300ms ease-in-out',
      },
    },
  },
  plugins: [],
};
