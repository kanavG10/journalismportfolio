import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: 'rgb(var(--navy) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        slate: 'rgb(var(--slate) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        harker: 'rgb(var(--harker) / <alpha-value>)',
        'harker-light': 'rgb(var(--harker-light) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      animation: {
        'drift': 'drift 20s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'ticker': 'ticker 30s linear infinite',
        'cursor-blink': 'cursorBlink 0.9s step-end infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-20px, -20px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
