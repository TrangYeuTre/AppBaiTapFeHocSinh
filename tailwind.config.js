/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      coGray1: "#515b69",
      coGray2: "#718096",
      coGray3: "rgb(45,55,72)",
      coGray4: "#C7C8CC",
      coGray5: "#F3F3F3",
      coWhite: "#ffffff",
      coBlue1: "#00a0e9",
      coBlue2: "#3559E0",
      coBlue3: "#EEF5FF",
      coCyan: "#97DEFF",
      coPink: "#E966A0",
      coPink2: "#FFF6F6",
      coRed: "#B31312",
    },
    extend: {},
  },
  plugins: [],
};
