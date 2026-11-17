/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EAEAEA',
        ink: '#111111',
        red: '#E5393F',
        'red-deep': '#B31F26',
        'red-text': '#C0272D',
        'red-bright': '#F25C63',
        smoke: '#5F5F5B',
        line: 'rgba(17,17,17,0.16)',
        bone: '#F4F3EF',
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'Archivo', 'Arial Black', 'sans-serif'],
        sans: ['"Archivo Variable"', 'Archivo', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      screens: {
        xs: '420px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'spin-slow': 'spinSlow 24s linear infinite',
        blink: 'blink 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
