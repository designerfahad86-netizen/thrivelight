import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f8f5',
          100: '#eef1ea',
          200: '#d8e2cc',
          300: '#bdd0a9',
          400: '#9abc7c',
          500: '#7aa657',
          600: '#5f8743',
          700: '#4d6a37',
          800: '#3f552f',
          900: '#354628',
        },
        accent: '#FF7A59',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
    },
  },
  plugins: [typography],
}
export default config
