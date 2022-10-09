/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        whiteGrey: "#A9A9A9",
      },
      fontFamily: {
        main: "Cantarell, sans-serif",
      },
    },
  },
  plugins: [],
};
