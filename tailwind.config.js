/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify files to scan for classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // Enable dark mode with class strategy
  darkMode: 'class',
  theme: {
    extend: {
      // Custom theme extensions if needed
    },
  },
  plugins: [],
}