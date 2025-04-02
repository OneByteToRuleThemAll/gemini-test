/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        glamour: {
          gold: '#FFD700',
          silver: '#C0C0C0',
          rose: '#FF007F',
          lavender: '#B57EDC',
          teal: '#008080',
          coral: '#FF7F50',
          champagne: '#F7E7CE',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glamour-gradient': 'linear-gradient(to right, #FF007F, #B57EDC, #0ea5e9)',
        'dark-glamour-gradient': 'linear-gradient(to right, #4a044e, #86198f, #075985)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
      },
      boxShadow: {
        'glamour': '0 10px 25px -3px rgba(249, 168, 212, 0.4)',
        'glamour-dark': '0 10px 25px -3px rgba(192, 38, 211, 0.4)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
}