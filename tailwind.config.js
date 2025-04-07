/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
      boxShadow: {
        'custom': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(-90deg, #25475a, #34637f, #25475a)',
      },
    },
  },
  plugins: [],
} 