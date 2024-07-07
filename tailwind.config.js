/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        h1: '2.25rem', // 36px
        h2: '2rem', // 32px
        h3: '1.75rem', // 28px
        h4: '1.5rem', // 24px
        h5: '1.25rem', // 20px
      },
      fontWeight: {
        h1: '700', // Bold
        h2: '600', // Semi-Bold
        h3: '600', // Semi-Bold
        h4: '500', // Medium
        h5: '500', // Medium
      },
    },
  },
  plugins: [],
}
