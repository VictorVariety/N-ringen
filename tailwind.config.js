/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        text: "rgb(var(--text) / <alpha-value>)",
        button: "rgb(var(--button) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          light: "rgb(var(--primary-light) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          light: "rgb(var(--secondary-light) / <alpha-value>)",
        },
        cardinal: {
          DEFAULT: "rgb(var(--cardinal) / <alpha-value>)",
          dark: "rgb(var(--cardinal-dark) / <alpha-value>)",
        },
        greenblue: {
          DEFAULT: "rgb(var(--greenblue) / <alpha-value>)",
          dark: "rgb(var(--greenblue-dark) / <alpha-value>)",
        }
        
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
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