/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      colors: {
        brand: {
          // Main colors
          primary: "#134a93",
          secondary: "#e62224",

          // Additional colors
          accent: "#F39C12",
          light: "#EBF5FB",
          dark: "#154360",
        },
      },

      animation: {
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up":
          "slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },

  plugins: [],
};