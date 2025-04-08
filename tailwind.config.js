import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/components/**/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "white": "#FFFFFF",

      "pink-50": "#F1C9DC",
      "pink-100": "F1B4D0",
      "pink-200": "F09EC5",
      "pink-300": "F089B9",
      "pink-400": "F074AE",
      "pink-500": "EF5EA2",
      "pink-600": "EF4997",
      "pink-700": "EF348B",
      "pink-800": "EE1E80",
      "pink-900": "#EE0974"
    },
    fontFamily: {
      "title": ['Space Grotesk', 'sans-serif'],
      "body": ['Inter', 'sans-serif']
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
}
