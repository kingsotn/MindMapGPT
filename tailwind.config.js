const { blackA, mauve, violet } = require('@radix-ui/colors');

module.exports = {
  content: ["./content-script/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
};
