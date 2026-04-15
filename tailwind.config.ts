import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sage: '#1A6B5A',
        'sage-dark': '#0D4A3D',
        'sage-light': '#E1F5EE',
        coral: '#E07A5F',
        cream: '#FAF8F5',
        ink: '#1A1A2E',
      },
    },
  },
  plugins: [],
};

export default config;
