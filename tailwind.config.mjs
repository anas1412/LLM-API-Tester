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
        // Professional color palette
        background: "#F9FAFB", // Light gray background
        foreground: "#111827", // Dark gray text
        primary: {
          DEFAULT: "#3B82F6", // Blue
          hover: "#2563EB", // Darker blue
        },
        secondary: {
          DEFAULT: "#6B7280", // Gray
          hover: "#4B5563", // Darker gray
        },
        accent: {
          DEFAULT: "#10B981", // Green
          hover: "#059669", // Darker green
        },
        error: {
          DEFAULT: "#EF4444", // Red
          hover: "#DC2626", // Darker red
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Professional sans-serif font
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
        button: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};
