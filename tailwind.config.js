/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(223.3, 64.8%, 52.2%)",
          hover: "hsl(224.6, 61.3%, 43.5%)",
          light: "hsl(222.9, 70.0%, 96.1%)",
        },
        secondary: {
          DEFAULT: "hsl(25.1, 85.5%, 59.4%)",
          hover: "hsl(25.1, 79.7%, 51.8%)",
          light: "hsl(25.3, 90.5%, 95.9%)",
        },
        accent: {
          DEFAULT: "hsl(266.8, 73.7%, 70.2%)",
          hover: "hsl(265.5, 73.8%, 62.5%)",
          light: "hsl(270, 75%, 96.9%)",
        },
        dark: {
          DEFAULT: "hsl(10.6, 45.9%, 7.3%)",
          hover: "hsl(10.7, 46.7%, 11.8%)",
          light: "hsl(15.0, 8.3%, 90.6%)",
        },

        // otros colores personalizados:
        st_light_blue: "#3761D5",
        st_dark_blue: "#316AA2",
        st_light_orange: "#EF8A3F",
        st_dark_orange: "#E57A31",
        st_light_purple: "#AC7CEE",
        st_dark_purple: "#5B2F52",
        st_black: "#1A0D0A",
        st_brown: "#63482B",
        st_dark_red: "#B54133",
        st_taupe: "#796D65",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
