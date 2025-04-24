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
        '13': '3.25rem',
        '18': '4.5rem',
        '17': '4.25rem',
        '4.5': '1.125rem',
        '2px': '2px',
        '5px': '5px',
        '550': '550px',
        '600': '600px',
        '480': '480px'
      },
      fontSize: {
        '4xs': '9px',
        '3xs': '10px',
        '2xs': '11px',
      },
      keyframes: {
        skeleton: {
          '0% ': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        left2right : {
          '0% ': { left: '0' },
          '100%': { left: '100%' },
        }
      },
      animation: {
        skeleton: 'skeleton 1s linear infinite',
        left2right: 'left2right 1.2s cubic-bezier(0.52, 0.22, 0.45, 0.74) infinite alternate',
        
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
        'iranyekan': ['iranyekan', 'sans-serif']
      },
    },
  },
  plugins: [],
} satisfies Config;
