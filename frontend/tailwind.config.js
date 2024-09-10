/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 
  theme: {
    extend: {
      animation: {
        rotate: "rotate 10s linear infinite",
        border: 'border 4s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'custom-shadow': '0 10px 20px -5px #9C2949',
      },
      lineHeight: {
        '1': '1rem',
        'small':'0.5rem' // Example of a custom line height
      },
      colors: {
        'custom-color': '#9C2949',
        'gradient-start': '#9C2949',
        'gradient-end': '#FF69B4',
        'text-color':'#3A3742',
        'blue-main':'#264790',
        'gold-main':'#DB7E19'
      },
      backgroundImage: {
        'custom-primary': 'linear-gradient(270deg, #E13B68 0%, #7B2039 100%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          'background': 'linear-gradient(90deg, #9C2949 0%, #FF69B4 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    },
    require('tailwind-scrollbar-hide') // Add this line

  ],
}

