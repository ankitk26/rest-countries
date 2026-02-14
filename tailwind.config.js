/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				paper: "hsl(var(--paper))",
				secondary: "hsl(var(--secondary))",
				muted: "hsl(var(--muted))",
				accent: "hsl(var(--accent))",
				border: "hsl(var(--border))",
				card: "hsl(var(--card))",
			},
			fontFamily: {
				display: ["var(--font-display)", "serif"],
				body: ["var(--font-body)", "sans-serif"],
			},
			borderRadius: {
				elegant: "0.375rem",
			},
			boxShadow: {
				elegant: "0 1px 3px hsl(var(--foreground) / 0.04)",
				"elegant-lg": "0 8px 30px hsl(var(--foreground) / 0.06)",
			},
		},
	},
	plugins: [],
};
