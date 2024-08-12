/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EEF5FF",
        secondary: "#B4D4FF",
        tertiary: "#86B6F6",
      },
    },
  },
  plugins: [],
};
