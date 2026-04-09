/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f5ff',
          100: '#e3ebff',
          500: '#3f5dff',
          700: '#2c40b7',
          900: '#1d294f',
        },
      },
      boxShadow: {
        card: '0 8px 24px rgba(23, 32, 56, 0.08)',
      },
    },
  },
  plugins: [],
}
