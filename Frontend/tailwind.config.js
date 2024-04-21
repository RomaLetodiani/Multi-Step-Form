/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        loaderGradient: 'linear-gradient(rgb(186, 66, 255), rgb(0, 225, 255))',
      },
      colors: {
        danger: '#FF5C6E',
        light: {
          DEFAULT: '#f0f6ff', // Light background
          container: '#f9f9f9', // Light container
          btn: '#6259FF', // Light button
          primary: '#483EFF',

          secondary: '#6259FF', // Adjust for your secondary color
          accent: '#F9818E', // Can be used for highlights, buttons, etc.
          white: '#fff',
          text: '#000', // Adjust for good contrast on light background
        },
        dark: {
          DEFAULT: '#0C111D', // Dark background
          container: '#161B26', // Dark container
          btn: '#534BEF', // Dark button
          primary: '#443EB1',

          secondary: '#D3D9FF', // Adjust for contrast
          accent: '#FFD1D6', // Consider adjusting for contrast
          white: '#fff',
          text: '#fff', // Adjust for good contrast on dark background
        },
      },
      boxShadow: {
        sm: '0 0 20px -5px rgba(0, 0, 0, 0.25)',
        loader:
          '0px -5px 20px 0px rgba(186, 66, 255, 0.5), 0px 5px 20px 0px rgba(0, 225, 255, 0.5)',
      },

      fontFamily: {
        seymour: 'Seymour One',
        ubuntu: 'Ubuntu',
      },
    },
  },
  plugins: [],
}
