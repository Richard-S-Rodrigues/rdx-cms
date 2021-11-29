module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: "#1052fc",
        darkerBlue: "#0c3fc4",
        green: "#08d14f",
        darkerGreen: "#049136"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
