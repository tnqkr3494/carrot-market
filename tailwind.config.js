/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media", // media : 컴퓨터 설정, class : js내용으로 따라감.
  plugins: [require("@tailwindcss/forms")],
};
