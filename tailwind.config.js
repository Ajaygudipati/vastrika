/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-rev': 'float-rev 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-rev': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(15px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
