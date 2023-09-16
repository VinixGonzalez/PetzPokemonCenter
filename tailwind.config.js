/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        customRed: "#E40F0F",
      },
      fontSize: {
        "2xbase": "2rem", // 32px
      },
      gap: {
        "7/5": "1.875rem", // 30px
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
