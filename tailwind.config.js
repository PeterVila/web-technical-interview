/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      // #383960 Tailwind CSS Color Generator https://uicolors.app/create
      textColor: {
        'custom-50': '#F4F6FA',
        'custom-100': '#E5E7F4',
        'custom-200': '#D2D7EB',
        'custom-300': '#B2BDDE',
        'custom-400': '#8D9BCD',
        'custom-500': '#727DBF',
        'custom-600': '#5F66B1',
        'custom-700': '#5456A1',
        'custom-800': '#494984',
        'custom-900': '#383960',
        'custom-950': '#292942',
      },
    },
  },
  plugins: [],
}
