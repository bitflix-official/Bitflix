module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        black: '#0c0c0c',
        primary: '#2361e0',
        gray: {
          600: '#303030',
          700: '#2e2e2e',
          800: '#1c1c1c',
          900: '#121212',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
