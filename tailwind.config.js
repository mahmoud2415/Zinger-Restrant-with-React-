/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e33d00",
        "primary-container": "#ff5117",
        surface: "#fcf9f8",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#5b4039",
        background: "#fcf9f8",
        "outline-variant": "#e4beb4",
      },
      maxWidth: {
        "container-max": "1180px",
      },
      spacing: {
        "margin-mobile": "1rem",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        numeric: ["Montserrat", "sans-serif"],
      }
    },
  },
  plugins: [],
};
