/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{   
      'text-primary': '#0D0D0D',
      'text-secondary': '#2E2E2E',
      'text-tertiary': '#4A4A4A',
      'text-white': '#FFFFFF',
    },

    borderColor:{
      'border-primary': '#DFDFDF',
      'border-dark': "#0D0D0D",
    },
    extend: {},
  },
  plugins: [],
}