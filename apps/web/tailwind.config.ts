import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ── Paleta LA SOÑADA COFFIE ──────────────────────────────
      colors: {
        coffee: {
          50:  '#fdf8f3',
          100: '#f9edd9',
          200: '#f2d9b3',
          300: '#e8be82',
          400: '#db9c4f',
          500: '#c97e2f',
          600: '#b06325',
          700: '#8f4c20',
          800: '#6b3820',
          900: '#3d1f11',
          950: '#1a0a04',
        },
        cream: {
          50:  '#fefcf7',
          100: '#fdf5e4',
          200: '#fae8c3',
          300: '#f5d490',
          400: '#edb957',
          500: '#e5a030',
        },
        olive: {
          500: '#6b7c40',
          600: '#536030',
          700: '#3d4824',
        },
        charcoal: {
          800: '#1c1a17',
          900: '#0f0e0c',
          950: '#080705',
        },
      },
      // ── Tipografía ───────────────────────────────────────────
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      // ── Animaciones suaves ───────────────────────────────────
      transitionTimingFunction: {
        'ease-coffee': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-coffee forwards',
        'slide-up': 'slideUp 0.5s ease-coffee forwards',
        'steam': 'steam 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(-10px) scaleX(1.1)', opacity: '0.4' },
        },
      },
      // ── Texturas ─────────────────────────────────────────────
      backgroundImage: {
        'coffee-grain': "url('/textures/coffee-grain.png')",
        'hero-gradient': 'linear-gradient(135deg, #1a0a04 0%, #3d1f11 50%, #6b3820 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
