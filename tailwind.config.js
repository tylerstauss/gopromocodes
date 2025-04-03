/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d9172c',
          blue: {
            DEFAULT: '#25475a',
            dark: '#1a3748',
            light: '#34637f'
          },
          gray: '#ECECEC',
          highlight: '#abe1fa'
        },
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
        },
      },
      fontFamily: {
        myriad: ['MyriadProRegular', 'Arial', 'sans-serif'],
        trebuchet: ['"Trebuchet MS"', 'Arial', 'Helvetica', 'sans-serif']
      },
    },
  },
  plugins: [],
} 