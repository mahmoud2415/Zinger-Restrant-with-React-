/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinger: {
          bg: "#0B0B0B",
          surface: "#121212",
          card: "#181818",
          cardHover: "#222222",
          border: "#282828",
          borderLight: "#383838",
          yellow: "#FFD000",
          yellowHover: "#FFE033",
          yellowDark: "#E6BC00",
          yellowLight: "#FFF4B8",
          white: "#FFFFFF",
          muted: "#9E9E9E",
          subtle: "#666666",
          red: "#FF3838",
          green: "#00E676",
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "'Syne'", "sans-serif"],
        syne: ["'Syne'", "sans-serif"],
        cairo: ["'Cairo'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Cairo'", "sans-serif"],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px -5px rgba(255, 208, 0, 0.4)',
        'glow-yellow-sm': '0 0 15px -3px rgba(255, 208, 0, 0.3)',
        'glow-red': '0 0 20px -5px rgba(255, 56, 56, 0.4)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px -3px rgba(255, 208, 0, 0.3)' },
          '50%': { boxShadow: '0 0 25px 2px rgba(255, 208, 0, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
