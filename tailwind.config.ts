import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Based on the "Calm & Focused" design proposal
        'brand-primary': '#6C7B95',
        'brand-accent': '#FFA726',
        'brand-success': '#4CAF50',
        'brand-alert': '#F44336',

        // Light Mode Palette
        'light-bg': '#F8F9FA',
        'light-surface': '#FFFFFF',
        'light-text-primary': '#212529',
        'light-text-secondary': '#6c757d',

        // Dark Mode Palette
        'dark-bg': '#121212', // A deeper charcoal for better contrast
        'dark-surface': '#1E1E1E', // Elevated surface color
        'dark-text-primary': '#EAEAEA',
        'dark-text-secondary': '#A0AEC0',
      },
    },
  },
  plugins: [],
}
export default config
