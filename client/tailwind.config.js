
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      lineClamp: {
        7: '7',
      },
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    flowbite.plugin(),
  ],
}

