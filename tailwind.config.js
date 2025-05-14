module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', 'cursive'],
      },
      colors: {
        'comic-red': '#FF5252',
        'comic-blue': '#4285F4',
        'comic-yellow': '#FFEB3B',
        'comic-green': '#0F9D58',
      },
    },
  },
  safelist: [
    'border',
    'border-black',
    'border-4',
    'shadow-[8px_8px_0_rgba(0,0,0,0.8)]',
    'shadow-[5px_5px_0_rgba(0,0,0,0.8)]',
    'shadow-[3px_3px_0_rgba(0,0,0,0.7)]'
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        comicbook: {
          "primary": "#FF5252",
          "secondary": "#4285F4",
          "accent": "#FFEB3B",
          "neutral": "#191D24",
          "base-100": "#ffffff",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
} 