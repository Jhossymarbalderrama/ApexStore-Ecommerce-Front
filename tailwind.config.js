/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    ".pages/**/*.{html,ts}",
    ".components/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
  ],
}

