import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'large': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '17': '4.25rem',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'red': {
          100: '#ffe7ed',
          200: '#ffced7',
          300: '#ff9bad',
          400: '#ff647f',
          500: '#fe3659',
          600: '#fe1940',
          700: '#ff0434',
          800: '#e30027',
          900: '#cc0021',
        }
      },
      fontFamily: {
        'iranyekan' : ['iranyekan', 'sans-serif']
      },
    },
  },
  plugins: [],
} satisfies Config;
