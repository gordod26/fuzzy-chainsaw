module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {},
    },
  },
  variants: {
    fontWeight: ["responsive", "hover", "focus", "active"],
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [require("daisyui")],
};
