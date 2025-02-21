module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#facc15", // Yellow background
          secondary: "#4f46e5", // Purple buttons
          accent: "#22c55e", // Green buttons
          textDark: "#000000",
          textLight: "#4b5563",
        },
        fontSize: {
          title: "2.5rem",
          description: "1.25rem",
        },
      },
    },
    plugins: [],
  };
  