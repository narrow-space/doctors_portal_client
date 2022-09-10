/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  darkMode: 'class',
  theme: {
    
    extend: {
     
    },
  },
  //...
  daisyui: {
    themes: [
      {
        doctortheme: {
          accent: "#0FCFEC",
          secondary: "#19D3AE",
          primary: "#3A4256",
          neutral: "#3d4451",
          
          "base-100": "#ffffff",
        },
      },
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ],
  },
  plugins: [require("daisyui"), require('tw-elements/dist/plugin')],
}
