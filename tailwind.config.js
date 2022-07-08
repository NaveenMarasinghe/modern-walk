/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#EB8120",
        "primary-hover": "#F17502",
        "primary-selected": "#D16400",
        "primary-inverse-hover": "#F7CDA6",
        "primary-inverse-hover-click": "#EBB888",
        "font-main": "#001948",
        "font-active-border": "#7C89A1",
        "font-inactive-border": "#C6CBD5",
        "bg-elephant-grey": "#F7F8F9",
        "bg-elephant-contrast": "#F0F2F5",
        "bg-white": "#FFFFFF",
        "link-color": "#6A81FD",
        "link-color-hover": "#5467CE",
        "link-color-active": "#4054C1",
        "link-color-disabled": "#A5B0E3",
        "danger-color": "#E1273D",
        "danger-color-glow": "#ED9AA4",
        "danger-color-inactive": "#F0939E",
        "danger-color-disabled": "#F9D4D8",
        "danger-color-hover": "#C01227",
        "danger-color-active": "#9D0215",
      },
      dropShadow: {
        "normal": "0px 0px 30px rgba(0, 25, 72, 0.15)",
        "hover": "0px 10px 40px rgba(0, 25, 72, 0.25)",
        "selected": "0px 5px 30px rgba(0, 25, 72, 0.25)",
        "button": "0px 4px 6px rgba(1, 5, 93, 0.15)",
      },
      spacing: {
        "10px":"10px",
        "100px": "100px"
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
