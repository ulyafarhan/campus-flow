import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Jika Anda menggunakan font Inter seperti di file layout
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Palet Warna dari Desain Baru
        'brand-blue': '#3B82F6',   // Biru untuk item aktif
        'brand-orange': '#F97316', // Oranye untuk waktu & deadline
        'brand-yellow': {
          light: '#FEF9C3', // Latar notifikasi
          dark: '#FBBF24',  // Ikon notifikasi
        },
        'background': '#F8FAFC', // Latar belakang abu-abu sangat muda
        'foreground': '#0F172A', // Teks utama (hitam kebiruan)
        'muted': '#64748B',      // Teks sekunder (abu-abu)
        'card': '#FFFFFF',       // Warna kartu
        'border': '#E2E8F0',     // Warna border/garis pemisah
      },
      borderRadius: {
        'xl': '1rem', // 16px
        'lg': '0.75rem', // 12px
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
export default config