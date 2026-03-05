/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#1A1A1A',
        'surface-light': '#2A2A2A',
        primary: '#6C5CE7',
        'primary-light': '#8B7CF0',
        accent: '#0984E3',
        success: '#2ECC71',
        warning: '#F39C12',
        error: '#E74C3C',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8E8E93',
        'text-tertiary': '#636366',
        border: '#2C2C2E',
        card: '#1C1C1E',
      },
    },
  },
  plugins: [],
};
