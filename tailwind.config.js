/** @type {import('tailwindcss').Config} */
export const mode = 'jit';
export const content = [
  './src/**/*.{html,js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    colors: {
      "black-light": 'hsl(0, 0%, 21%)',
      "black": 'hsl(0, 0%, 13%)',
      "black-transparent-dark": 'hsla(0, 0%, 0%, 0.7)',
      "black-transparent-light": 'hsla(0, 0%, 0%, 0.4)',
      "blue": 'hsl(234, 100%, 50%)',
      "blue-dark": 'hsl(240, 100%, 25%)',
      "body": 'hsl(249, 88%, 5%)',
      "cyan": 'hsl(172, 85%, 49%)',
      "cyan-dark": 'hsl(170, 79%, 33%)',
      "footer": 'hsl(249, 88%, 8%)',
      "green": 'hsl(89, 73%, 54%)',
      "grey": 'hsl(210, 7%, 78%)',
      "grey-dark": 'hsl(300, 3%, 26%)',
      "orange": 'hsl(18, 81%, 54%)',
      "orange-dark": 'hsl(18, 81%, 25%)',
      "pink": 'hsl(330, 72%, 69%)',
      "pink-dark": 'hsl(330, 72%, 25%)',
      "red": 'hsl(358, 75%, 55%)',
      "red-dark": 'hsl(358, 75%, 25%)',
      "white": 'hsl(0, 0%, 100%)',
      "white-dark": 'hsl(300, 37%, 96%)',
      "yellow": 'hsl(53, 87%, 53%)',
      "yellow-dark": 'hsl(53, 87%, 30%)',
    },
    textShadow: {
      "chromatic-glitch": '2px 3px 2px hsl(0, 0%, 13%), 4px -3px 2px rgba(255, 52, 52, 0.3), 5px -5px 2px rgba(52, 255, 120, 0.3)',
      "chromatic-glitch-strong": '2px 3px 2px hsl(0, 0%, 13%), 5px -3px 2px rgba(255, 52, 52, 0.6), 6px -5px 2px rgba(52, 255, 120, 0.6)',
      "milked-pink": '2px 3px 2px hsl(0, 0%, 13%), 4px -3px 2px rgba(255, 255, 255, 0.75), 5px -5px 2px rgb(192, 99, 153, 1)',
      "cyan": '0 -40px 100px, 0 0 2px, 0 0 10px hsl(172, 85%, 49%), 0 0 1px hsl(172, 85%, 49%), 0 0 0.1em hsl(172, 85%, 49%), 0 0px 6px hsl(172, 85%, 49%)',
      "retro-computer-green": '0 0 3px #80ffc0, 0 0 10px #00ff66, 0 0 20px #00ff66, 0 0 30px #00ff66',
      "retro-computer-red": '0 0 3px #ff8080, 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
    },
    boxShadow: {
      "pink": '0px 1px 10px -2px hsl(330, 72%, 69%)',
      "black-transparent-dark": '2px 2px 0px 0px hsla(0, 0%, 0%, 0.7)',
      "vhs-lines": '6px -4px 2px rgba(255, 52, 52, 0.6), 8px -6px 2px rgba(52, 255, 120, 0.6)',
      "inset-white": 'inset 1px 0px 100px 0px rgba(255, 255, 255, 0.04)',
      "inset-white-strong": 'inset 0px 0px 37px 15px hsla(281, 88%, 76%, 0.22)'
    },
    padding: {
      '1.33': '0.33rem',
      '2.5': '0.5rem',
    },
  }
};
export const plugins = [
  require('tailwindcss-textshadow')
];