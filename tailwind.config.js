/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Inter', 'sans-serif'],
      },
    colors: {
      brand: {
        DEFAULT: '#6c63ff',
        light: '#ebe9ff',
      },
      accent: '#ffb703',
      },
    },
  },
  plugins: [],
}
