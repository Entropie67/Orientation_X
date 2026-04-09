/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef3ff',
          100: '#dce7ff',
          600: '#2f54c8',
          700: '#213d96',
          800: '#1b2f6f',
          900: '#15234e',
        },
      },
      boxShadow: {
        card: '0 10px 28px rgba(23, 32, 56, 0.07)',
      },
    },
  },
  plugins: [],
};
