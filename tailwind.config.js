/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'Arial', 'Helvetica', 'sans-serif'],
        display: ['var(--font-display)', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}