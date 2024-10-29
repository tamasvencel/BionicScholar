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
        primary: '#EBE8E7',
        secondary: '#136A5C',
        neutrals: {
          900: '#171718',
          800: '#212122',
          700: '#4E4E51',
        },
      },
    },
  },
  plugins: [],
};
