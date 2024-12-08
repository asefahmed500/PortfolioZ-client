/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
    animation: {
      marquee: 'marquee 3s linear infinite',
    },
  },
};
export const plugins = [daisyui];
