/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'open-mobile-nav': {
          '0%': {
            opacity: '0',
            height: '0vh',
          },
          '100%': {
            opacity: '1',
            height: '100vh',
          },
        },
        'close-mobile-nav': {
          '0%': {
            opacity: '1',
            height: '100vh',
          },
          '100%': {
            opacity: '0',
            height: '0vh',
          },
        },
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
        'open-mobile-nav': 'open-mobile-nav 300ms ease-in-out',
        'close-mobile-nav': 'close-mobile-nav 300ms ease-in-out',
        'rotate-close-mobile-nav-toggle-btn':
          'rotate-close-mobile-nav-toggle-btn 300ms ease-in-out',
        'rotate-open-mobile-nav-toggle-btn':
          'rotate-open-mobile-nav-toggle-btn 300ms ease-in-out',
      },
    },
  },
  plugins: [],
};
