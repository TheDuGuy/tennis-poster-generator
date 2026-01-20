import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'deep-green': '#2E8B57',
          'forest': '#1E6F4F',
        },
        secondary: {
          'navy': '#1B4965',
          'royal': '#2B5D7E',
        },
        neutral: {
          'warm-white': '#F8F6F1',
          'cream': '#FAF8F3',
          'light-gray': '#E8E6E1',
        },
        semantic: {
          'social': '#4A90A4',
          'match': '#E67E22',
          'league': '#9B59B6',
          'tournament': '#27AE60',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
