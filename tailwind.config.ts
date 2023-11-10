import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "background-main": "var(--background-main)",
        "background-dark": "var(--background-dark)",
        "background-light": "var(--background-light)",
        "background-sidebar": "var(--secondary-color)",
        "border-main": "var(--border-main)",
      },
    },
  },
  plugins: [],
}
export default config
