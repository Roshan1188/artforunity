/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09090B",
        canvas: "#FAF9F6",
        graphite: {
          950: "#18181B",
          900: "#27272A",
        },
        vermilion: {
          DEFAULT: "#E0241B",
          dark: "#B81C15",
        },
      },
      fontFamily: {
        display: ['"Inter"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slower": {
          to: { transform: "rotate(360deg)" },
        },
        "logo-in": {
          "0%": { opacity: "0", transform: "scale(0.6) rotate(-12deg)" },
          "60%": { opacity: "1", transform: "scale(1.06) rotate(3deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "letter-up": {
          "0%": { opacity: "0", transform: "translateY(120%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        curtain: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "word-cycle": {
          "0%": { transform: "translateY(110%)", opacity: "0" },
          "8%, 94%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-110%)", opacity: "0" },
        },
        "scroll-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "spin-slower": "spin-slower 14s linear infinite",
        "logo-in": "logo-in 1s cubic-bezier(0.16,1,0.3,1) both",
        "letter-up": "letter-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        curtain: "curtain 0.7s cubic-bezier(0.76,0,0.24,1) both",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease-in-out infinite",
        "word-cycle": "word-cycle 2.6s cubic-bezier(0.16,1,0.3,1) both",
        "scroll-up": "scroll-up 32s linear infinite",
        "scroll-down": "scroll-down 36s linear infinite",
      },
    },
  },
  plugins: [],
};
