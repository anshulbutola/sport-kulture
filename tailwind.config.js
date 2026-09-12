/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.html"],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0a0a0a',
        'brand-red': '#dc2626',
        'brand-red-dark': '#b91c1c',
        'brand-gray': '#171717',
        'brand-light': '#fafafa'
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
