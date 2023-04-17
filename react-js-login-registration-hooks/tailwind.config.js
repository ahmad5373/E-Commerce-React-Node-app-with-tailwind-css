/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./assests/images/image1.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
