/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "salte/15": "#DFDFDF", // Define your custom color here
        "grey-cold-600": "#73848C",
        "grey-cold/900": "#2E3538",
        "content-border": "#E4E7E8",
        "content-base": "#F9FAFA",
        "custom-secondary": "#5C6970",
        "custom-primary": "#4426D9",
        "focus-primary": "#361FAD",
        "primary/50": "#ECE9FB",
        "text-primary": "#141C24",
        "light-blue/700": "#0077CC",
        "light-blue/50": "#E5F4FF",
        "grey-cold/50": "#F1F3F4",
      },
      boxShadow: {
        light: "0px 1px 3px 0px #1A1A1A14",
        avatar: "0px 2px 10px 0px #1A1A1A1A",
      },
    },
  },
  plugins: [],
};
