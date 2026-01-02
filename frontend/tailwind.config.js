/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // MSC Brand Colors - Only yellow/gold and neutrals
        'msc-yellow': '#D4AF37',
        'msc-gold': '#B8860B',
        
        // Shadcn colors using MSC palette
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#D4AF37", // MSC Yellow
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#F8F9FA", // Light gray
          foreground: "#212529",
        },
        destructive: {
          DEFAULT: "#DC3545", // Red for errors
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#6C757D",
        },
        accent: {
          DEFAULT: "#D4AF37", // MSC Yellow
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}