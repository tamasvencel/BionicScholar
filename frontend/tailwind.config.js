/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: '#EBE8E7',
          200: '#d4d1d0',
        },
        secondary: {
          300: '#5a978d',
          600: '#136A5C',
          700: '#115f53',
        },
        neutral: {
          100: '#f1efee',
          900: '#171718',
          800: '#212122',
          700: '#4E4E51',
        },
      },
    },
  },
  plugins: [],
};
