/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['"Lexend Tera"', 'sans-serif'],
        pacifico: ['"Pacifico"', 'cursive'],
        surfer: ['"Original Surfer"', 'cursive'],
      },
    },
  },
  plugins: [],
}

