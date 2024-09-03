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
      coGray4: "#EEEEEE",
      coGray5: "#F3F3F3",
      coGray6: "#D8D9DA",
      coWhite: "#ffffff",
      coBlue1: "#00a0e9",
      coBlue2: "#3559E0",
      coBlue3: "#EEF5FF",
      coCyan: "#97DEFF",
      coPink: "#E966A0",
      coPink2: "#FFF6F6",
      coRed: "#B31312",
      coRed2:"#FF8080",
      coGreen: "#508D69",
      coGreen2: "#CDFADB",
      coGreen3: "#2cb67d",
      coYellow: "#FFF8DB"
    },
    extend: {},
  },
  plugins: [],
};
