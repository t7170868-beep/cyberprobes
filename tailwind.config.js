/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Cyber Theme Colors
        'cyber-blue': '#00d4ff',
        'cyber-blue-dark': '#0099cc',
        'cyber-blue-light': '#33ddff',
        'neon-green': '#00ff88',
        'neon-purple': '#8844ff',
        'neon-pink': '#ff0080',
        'neon-yellow': '#ffff00',
        'matrix-green': '#00ff41',
        
        // Glass Colors
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        
        // Background Colors
        'bg-primary': '#000000',
        'bg-secondary': '#0a0a0a',
        'bg-tertiary': '#111111',
        
        // Legacy primary colors
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#00d4ff",
          600: "#0099cc",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'matrix-rotate': 'matrixRotate 30s linear infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'node-move': 'nodeMove 15s linear infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'progress-move': 'progressMove 2s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}; 