export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        imageHeader: "url('./src/assets/images/headerimg.png')",
      },
    },
  },
  plugins: [],
}
