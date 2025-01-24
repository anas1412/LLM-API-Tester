/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#fff5f7",
        foreground: "#881337",
        primary: {
          DEFAULT: "#f43f5e",
          hover: "#e11d48",
        },
        secondary: {
          DEFAULT: "#fb7185",
          hover: "#fda4af",
        },
        accent: {
          DEFAULT: "#f472b6",
          hover: "#ec4899",
        },
      },
      fontFamily: {
        cursive: ["'Comic Neue'", "cursive"],
        sans: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        gentle: "0 8px 32px rgba(251, 113, 133, 0.1)",
        button: "0 4px 16px rgba(244, 63, 94, 0.2)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
      },
      backgroundImage: {
        "select-chevron":
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f43f5e'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e\")",
      },
    },
  },
  plugins: [],
};
