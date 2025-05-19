module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', 'cursive'],
      },
      colors: {
        'comic-red': '#D92332',
        'comic-blue': '#04ADBF',
        'comic-yellow': '#F2D022',
        'comic-beige': '#F2E0C9',
        'comic-orange': '#BF472C',
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
          "primary": "#D92332",
          "secondary": "#04ADBF",
          "accent": "#F2D022",
          "neutral": "#BF472C",
          "base-100": "#F2E0C9",
          "info": "#04ADBF",
          "success": "#F2D022",
          "warning": "#BF472C",
          "error": "#D92332",
        },
      },
    ],
  },
} 