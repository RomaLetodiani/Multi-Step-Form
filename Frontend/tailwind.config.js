/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: '#f0f6ff', // Light background
          container: '#f9f9f9', // Light container

          primary: '#483EFF', // Adjust for your primary brand color
          secondary: '#6259FF', // Adjust for your secondary color
          accent: '#F9818E', // Can be used for highlights, buttons, etc.
          white: '#fff',
          text: '#000', // Adjust for good contrast on light background
        },
        dark: {
          DEFAULT: '#333333', // Dark background
          container: '#222222', // Dark container

          primary: '#EBF5FF', // Adjust for good contrast on dark background
          secondary: '#D3D9FF', // Adjust for contrast
          accent: '#FFD1D6', // Consider adjusting for contrast
          white: '#fff',
          text: '#fff', // Adjust for good contrast on dark background
        },
      },
      boxShadow: {
        darks: '0 0 20px -5px rgba(250, 250, 250, 0.25)',
        lights: '0 0 20px -5px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
