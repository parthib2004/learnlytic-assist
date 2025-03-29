/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      fontFamily: {
        // Lexend is specifically designed for readers with dyslexia
        sans: ['Lexend', 'system-ui', 'sans-serif'],
        // Atkinson Hyperlegible is designed for maximum legibility
        readable: ['Atkinson Hyperlegible', 'Lexend', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'dyslexic': '0.05em', // Slightly increased letter spacing helps readability
      },
      lineHeight: {
        'dyslexic': '1.6', // Increased line height for better readability
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} 