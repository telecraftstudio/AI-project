/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          900: '#070b14',
          800: '#0e1525',
          700: '#17233d',
          500: '#2dd4bf'
        }
      }
    }
  },
  plugins: []
}
