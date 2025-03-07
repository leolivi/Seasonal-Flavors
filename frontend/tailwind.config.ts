/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const screens = {
  mobile: "0px",
  tablet: "640px",
  laptop: "1024px",
  desktop: "1280px",
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /bg-(sfred|sfgreen|sfblue|sforange)-(light|DEFAULT|dark)/,
      variants: ["hover", "focus"],
    },
    {
      pattern: /bg-(sfred|sfgreen|sfblue|sforange)/,
      variants: ["hover", "focus"],
    },
    {
      pattern: /fill-(sfred|sfgreen|sfblue|sforange|sfblack)/,
      variants: ["hover", "focus"],
    },
    {
      pattern: /border-(sfred|sfgreen|sfblue|sforange)-(light|DEFAULT|dark)/,
      variants: ["hover", "focus"],
    },
    {
      pattern: /text-(sfred|sfgreen|sfblue|sforange)-(light|DEFAULT|dark)/,
      variants: ["hover", "focus"],
    },
    {
      pattern:
        /(scrollbar|scrollbar-thumb|scrollbar-track)-(sfred|sfgreen|sfblue|sforange)-(light|DEFAULT|dark)/,
      variants: ["hover", "focus"],
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBFCF8",
        sfblack: "#1D1C1C",
        "sfblack-light": "#1D1C1C",
        sfgreen: {
          light: "#DBF0E1",
          DEFAULT: "#A7D7B8",
          dark: "#2A714E",
        },
        sfblue: {
          light: "#D1E1EC",
          DEFAULT: "#7DA2C5",
          dark: "#5373A2",
        },
        sforange: {
          light: "#F9D08E",
          DEFAULT: "#F59D38",
          dark: "#D2520D",
        },
        sfred: {
          light: "#EFB682",
          DEFAULT: "#D15823",
          dark: "#8C3720",
        },
        sfwhite: {
          light: "#FFFFFF",
          DEFAULT: "#FBFCF8",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    fontFamily: {
      cordaRegular: ["var(--font-corda-regular)", "serif"],
      cordaMedium: ["var(--font-corda-medium)", "serif"],
      cordaBold: ["var(--font-corda-bold)", "serif"],
      figtreeRegular: ["var(--font-figtree-regular)", "sans-serif"],
      figtreeMedium: ["var(--font-figtree-medium)", "sans-serif"],
    },
  },
  screens: {
    tablet: screens.tablet,
    laptop: screens.laptop,
    desktop: screens.desktop,
  },
  fontSize: {
    xs: "15px",
    sm: "20px",
    base: "25px",
    lg: "30px",
    xl: "48px",
  },
  height: {
    "128": "40rem",
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
};

export default config;
