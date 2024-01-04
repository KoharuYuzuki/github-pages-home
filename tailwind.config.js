/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'red': '#F6BFBC',
        'yellow': '#F4ECBC',
        'green': '#BCF4E1',
        'blue': '#BCE6F4',
        'brown': '#71686C'
      }
    }
  },
  plugins: []
}

