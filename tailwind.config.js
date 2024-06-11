/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#334155",
        secondary: "#c953c9",
      },
    },
    fontFamily: {
      mont: ["Montserrat", "sans-serif"],
      rob: ["Roboto", "sans-serif"],
      danc: ["Dancing Script", "cursive"],
      popp: ["Poppins", "sans-serif"],
      open: ["Open Sans", "sans-serif"],
      vibes: ["Great Vibes", "cursive"],
      rubik: ["Rubik", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      times: ["Times New Roman", "Times", "serif"],
    },
  },
  plugins: [],
};
