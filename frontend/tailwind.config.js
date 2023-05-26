/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#F7D9AF',
        'lightPrimary': '#FDF5EC',
        'secondaryColor': '#EDECFF',
        'darkSecondary': '#4847FE'
      },
    }
  },
  plugins: [],
}