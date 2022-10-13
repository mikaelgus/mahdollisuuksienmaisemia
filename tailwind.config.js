/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "250px",
      // => @media (min-width: 640px) { ... }

      md: "500px",
      // => @media (min-width: 768px) { ... }

      lg: "600px",
      // => @media (min-width: 1024px) { ... }

      xl: "800px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "900px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        whiteGrey: "#A9A9A9",
        grey: "#202020",
      },
      fontFamily: {
        main: "Cantarell, sans-serif",
      },
    },
    backgroundImage: {
      "header-image": "url('/media/brick-wall-front.jpg')",
    },
  },
  plugins: [],
};
