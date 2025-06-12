/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "video-bg": "#1a1a1a",
        "controls-bg": "rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
