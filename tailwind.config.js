/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#E6C659",
          500: "#D4AF37", // Liquid Gold
          600: "#B59226",
          700: "#8C6F19",
        },
        obsidian: {
          900: "#0B0D12", // Primary dark background
          800: "#121620", // Card / surface background
          700: "#1A1F2C", // Light graphite surface
          600: "#252B3B", // Border subtle
        },
        amber: {
          accent: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        accent: ['"Dancing Script"', "cursive"],
      },
      backgroundImage: {
        "gold-gradient": "linear-[#D4AF37], #F59E0B",
        "glass-radial":
          "radial-gradient(circle at top, rgba(212, 175, 55, 0.12), transparent 70%)",
      },
    },
  },
  plugins: [],
};
