/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'space-cadet-blue': '#1A1A2E',
        platinum: '#EAEAEA',
        'jet-grey': '#333333',
        'honolulu-blue': '#0077B6',
      },
      backgroundColor: {
        'space-cadet-blue': '#1A1A2E',
        platinum: '#EAEAEA',
        'jet-grey': '#333333',
        'honolulu-blue': '#0077B6',
      },
    },
  },
  plugins: [],
};
