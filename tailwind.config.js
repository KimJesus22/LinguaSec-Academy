/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-black': '#0a0a0a',
                'cyber-dark': '#121212',
                'neon-cyan': '#00f3ff',
                'neon-purple': '#bd00ff',
                'neon-green': '#39ff14',
                'neon-red': '#ff073a',
            },
            fontFamily: {
                sans: ['"JetBrains Mono"', 'monospace'], // Default font is now techy
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'reveal': {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)' },
                    '50%': { boxShadow: '0 0 25px rgba(0, 243, 255, 0.6)' },
                },
                'glitch': {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' },
                },
                'glitch-2': {
                    '0%': { clipPath: 'inset(20% 0 80% 0)' },
                    '20%': { clipPath: 'inset(60% 0 10% 0)' },
                    '40%': { clipPath: 'inset(40% 0 50% 0)' },
                    '60%': { clipPath: 'inset(80% 0 5% 0)' },
                    '80%': { clipPath: 'inset(10% 0 70% 0)' },
                    '100%': { clipPath: 'inset(30% 0 20% 0)' },
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
                'reveal': 'reveal 1s ease-in-out forwards',
                'pulse-glow': 'pulse-glow 2s infinite',
                'glitch': 'glitch 0.5s cubic-bezier(.25, .46, .45, .94) both infinite',
                'glitch-slow': 'glitch 2s cubic-bezier(.25, .46, .45, .94) both infinite',
            }
        },
    },
    plugins: [],
}
