// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./views/*.{hbs}', './views/**/*.{hbs}'],
  theme: {
    extend: {
      fontFamily: {
        // @ts-ignore
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        primary: '#0F485B',
        secondary: '#9EDD79',
        accent: '#009587',
        ms: {
          light: '#f8fdfe',
          dark: '#424242',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
