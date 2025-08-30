/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
      },
      colors: {
        // Calmer hospital-inspired palette
        primary: {
          50: '#eef5ff',
          100: '#dae8ff',
          200: '#b8d3ff',
          300: '#8eb7ff',
          400: '#5f94ff',
          500: '#3366ff',
          600: '#1f4de0',
          700: '#183db3',
          800: '#142f8a',
          900: '#122867',
        },
        secondary: {
          50: '#f0fbfb',
          100: '#d8f3f2',
          200: '#b9e6e3',
          300: '#8fd6d1',
          400: '#5bbeb7',
          500: '#34a8a0',
          600: '#258a84',
          700: '#1f6e69',
          800: '#1c5855',
          900: '#184a47',
        },
        accent: {
          50: '#f5f7fb',
          100: '#e9eef7',
          200: '#d3dbef',
          300: '#b3c2e4',
          400: '#7f98d3',
          500: '#5477c6',
          600: '#3f5ead',
          700: '#354e8c',
          800: '#2d426f',
          900: '#26375b',
        },
        teal: {
          50: '#f1fbf8',
          100: '#d9f4eb',
          200: '#b6e8d8',
          300: '#87d7c0',
          400: '#56c1a3',
          500: '#36a98b',
          600: '#2a8c74',
          700: '#247161',
          800: '#205a50',
          900: '#1b4a42',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        wellness: {
          score: {
            excellent: '#10b981',
            good: '#f59e0b',
            warning: '#f97316',
            critical: '#ef4444',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(2, 6, 23, 0.06)',
        card: '0 6px 20px rgba(2, 6, 23, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.backface-visibility-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.will-change-transform': {
          'will-change': 'transform',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
