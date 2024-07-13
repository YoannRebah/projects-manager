/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{html,js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    colors: {
      "white": 'hsl(0, 0%, 100%)',
      "white-transparent-1": 'hsla(0, 0%, 100%, 0.15)',
      "white-transparent-2": 'hsla(0, 0%, 100%, 0.35)',
      "white-transparent-3": 'hsla(0, 0%, 100%, 0.75)',
      "black": 'hsl(0, 0%, 0%)',
      "black-transparent-1": 'hsla(0, 0%, 0%, 0.15)',
      "black-transparent-2": 'hsla(0, 0%, 0%, 0.35)',
      "black-transparent-3": 'hsla(0, 0%, 0%, 0.75)',
      "red": 'hsl(358, 75%, 55%)',
      "blue": '#00a1ff',
      "gray": "#9f9f9f",
      "lightgray": "#d3d3d3"
    },
  },
};
export const plugins = [];