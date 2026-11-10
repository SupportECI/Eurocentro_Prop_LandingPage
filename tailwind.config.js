/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ec-navy-950': '#050a18',
        'ec-navy-900': '#0a1128',
        'ec-navy-800': '#101c3d',
        'ec-navy-700': '#192b56',
        'ec-blue-primary': '#0071e3',
        'ec-blue-hover': '#0077ed',
        'ec-blue-active': '#005bb5',
        'ec-blue-light': '#eef5fc',
        'ec-amber': '#ff9500',
        'ec-coral': '#ff5e3a',
        'ec-gold': '#f5a623',
        'ec-canvas': '#fbfbfd',
        'ec-canvas-alt': '#f5f5f7',
        'ec-text-main': '#1d1d1f',
        'ec-text-muted': '#515154',
        'ec-text-subtle': '#86868b',
        'ec-yellow': '#ffcc00',
        'ec-whatsapp': '#25d366',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 16px 36px rgba(0, 0, 0, 0.1)',
        'glass': '0 24px 60px -15px rgba(0, 0, 0, 0.45)',
        'btn': '0 6px 18px rgba(0, 113, 227, 0.35)',
        'btn-hover': '0 10px 24px rgba(0, 113, 227, 0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
      transitionTimingFunction: {
        'apple-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'apple': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'apple-smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
