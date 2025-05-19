module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', "cursive"],
        bangers: ['"Bangers"', "cursive"],
      },
      colors: {
        // Silver Age inspired palette with base CMYK values
        "comic-cyan": "#00A4E4", // Cyan (100%)
        "comic-magenta": "#EC008C", // Magenta (100%)
        "comic-yellow": "#FFF200", // Yellow (100%)
        "comic-black": "#000000", // Black (100%)
        "comic-blue": "#0072BC", // YR - Ruby red for Superman's cape
        "comic-red": "#ED1C24", // YR - Ruby red for Superman's cape
        "comic-green": "#00A651", // BY - Classic Green
        "comic-purple": "#92278F", // RB - Classic purple
        "comic-orange": "#F7941D", // YR - Classic orange
        "comic-gray": "#939598", // R2B2 - Batman gray
        "comic-beige": "#F9F5E9", // Vintage newsprint color
        "comic-skin": "#FFDBAC", // Classic skin tone
      },
      backgroundImage: {
        "halftone-dots":
          'url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000000" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1.5"/%3E%3Ccircle cx="13" cy="13" r="1.5"/%3E%3C/g%3E%3C/svg%3E\')',
      },
    },
  },
  safelist: [
    "border",
    "border-black",
    "border-4",
    "shadow-[8px_8px_0_rgba(0,0,0,0.8)]",
    "shadow-[5px_5px_0_rgba(0,0,0,0.8)]",
    "shadow-[3px_3px_0_rgba(0,0,0,0.7)]",
    "bg-halftone-dots",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        comicbook: {
          primary: "#ED1C24", // Classic red
          secondary: "#0072BC", // Classic blue
          accent: "#FFF200", // Pure yellow
          neutral: "#F7941D", // Orange
          "base-100": "#F9F5E9", // Newsprint beige
          info: "#00A4E4", // Cyan
          success: "#00A651", // Green
          warning: "#F7941D", // Orange
          error: "#ED1C24", // Red
        },
      },
    ],
  },
};
