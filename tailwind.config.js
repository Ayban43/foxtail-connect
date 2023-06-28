/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'active': 'bg-blue-500 text-white font-bold',
      transitionProperty: {
        'height': 'height',
        // Add more transition properties if needed
      },
      transitionDuration: {
        '200': '200ms',
        // Add more transition durations if needed
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
        // Add more transition timing functions if needed
      },
    },
  },
  plugins: [],
  darkMode: 'true',
}