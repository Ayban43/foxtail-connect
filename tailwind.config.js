/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'active': 'bg-blue-500 text-white font-bold',
    },
  },
  plugins: [],
  darkMode: 'false',
}