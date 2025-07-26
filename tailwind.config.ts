import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'dark-purple': '#081A51',
        'light-white': 'rgba(255,255,255,0.17)',
      },
    },
  },
  plugins: [],
} satisfies Config


