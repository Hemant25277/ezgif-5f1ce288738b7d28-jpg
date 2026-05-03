/** @type {import('tailwindcss').Config} */
// Using JS-style type annotation to avoid strict TypeScript conflicts
// with custom color key names (e.g. 'accent', 'dark') and keyframe types.

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#F5E6D3',
          100: '#E6D2B5',
          200: '#D4A574',
          300: '#C9B8A0',
          400: '#9C7A63',
          500: '#7A5044',
          600: '#5A4034',
          700: '#4D3428',
          800: '#3D2820',
          900: '#2D1810',
          950: '#1A0F0A',
        },
        'teal-accent': '#4F9C8F',
        'teal-dark': '#3D8B7F',
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { "box-shadow": "0 0 5px rgba(79, 156, 143, 0.2)" },
          "100%": { "box-shadow": "0 0 20px rgba(79, 156, 143, 0.6)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies import('tailwindcss').Config;

export default config;

