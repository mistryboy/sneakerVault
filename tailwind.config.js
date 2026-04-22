/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          black: '#050505',
          charcoal: '#0A0A0A',
          purple: '#A855F7',
          red: '#EF4444',
          cream: '#F5F5F7',
        }
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'], // Bold, condensed style to be applied via CSS
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-.075em',
        'widest': '.25em',
      }
    },
  },
  plugins: [],
}
