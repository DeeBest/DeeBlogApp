import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';

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
        slideFromLeft: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '50%': {
            transform: 'translateX(50%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        slideFromRight: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '50%': {
            transform: 'translateX(-50%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        slideFromTop: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },
        },
      },
      animation: {
        'rotate-close-mobile-nav-toggle-btn':
          'rotate-close-mobile-nav-toggle-btn 300ms ease-in-out',
        'rotate-open-mobile-nav-toggle-btn':
          'rotate-open-mobile-nav-toggle-btn 300ms ease-in-out',
        slideFromLeft: 'slideFromLeft 500ms ease-in',
        slideFromRight: 'slideFromRight 500ms ease-in',
        slideFromTop: 'slideFromTop 1000ms ease-out',
      },
    },
  },
  plugins: [],
};
