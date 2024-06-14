/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      inset: {
        "-10": "-10px",
        "-15": "-30px",
        "-20": "-95px", // 새로운 inset 값을 추가
      },
    },
  },
  plugins: [],
};
