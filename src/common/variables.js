import {Dimensions} from 'react-native';

let SPS = {};

SPS.variables = {
  colors: {
    primary: {
      full: 'rgba(110, 206, 219, 1)', // ice-blue
      dark: 'rgba(50, 143, 155, 1)', // darker ice-blue
    },
    secondary: {
      full: 'rgba(223, 40, 64, 1)', // red
    },
    useCase: {
      error: 'rgba(175, 0, 0, 1)',
      success: 'rgba(151, 208, 91, 1)',
      foul: 'rgba(217, 100, 59, 1)',
      player1: 'rgba(244, 58, 81, 1)',
      player2: 'rgba(37, 106, 113, 1)',
    },
    text: {
      light: 'rgba(244, 244, 244, 1)',
      mid: 'rgba(179, 179, 179, 1)',
      dark: 'rgba(112, 112, 112, 1)',
    },
    grey: {
      light: 'rgba(61, 61, 61, 1)',
      mid: 'rgba(51, 51, 51, 1)',
      dark: 'rgba(48, 48, 48, 1)',
      darker: 'rgba(40, 40, 40, 1)',
      darkest: 'rgba(32, 32, 32, 1)',
    },
    backgroundColors: {
      dark: 'rgba(38, 50, 62, 1)',
      darker: 'rgba(30, 39, 46, 1)',
      darkest: 'rgba(22, 32, 38, 1)',
      green: 'rgba(151, 208, 91, 1)',
      blue: 'rgba(102, 176, 189, 1)',
      red: 'rgba(217, 100, 59, 1)',
      dim: 'rgba(10, 10, 10, .25)',
      grey: 'rgba(70, 70, 70 ,1)',
      darkGrey: 'rgba(20, 20, 20, 1)',
      darkerGrey: 'rgba(40, 40, 40, 1)',
      // new Colors
      primary: 'rgba(61, 115, 150, 1)', // blue
      secondary: 'rgba(17, 55, 84, 1)', // red
    },
    borderColors: {
      dark: 'rgba(33, 33, 33, .2)',
      darker: 'rgba(12, 12, 12, .2)',
    },
    shadow: 'rgba(33, 33, 33, 1)',
    textColor: 'rgba(250, 250, 250, 1)',
    textColorDim: 'rgba(245, 245, 245, .6)',
    borderColor: 'rgba(245, 245, 245, .3)',
    borderColorDim: 'rgba(10, 10, 10, .25)',
    borderColorDark: 'rgba(33, 33, 33, .3)',
    textColorLink: '',
  },
  sizes: {
    gutter: 20,
    font_S: 11,
    font_M: 13,
    font_L: 16,
    font_XL: 24,
    font_XXL: 32,
    dimensions: Dimensions.get('window'),
  },
};

/**
 * takes a string with rgb color value ('rgb(0, 0, 0)') and creates a rgba color value from it ('rgba(0, 0, 0, 1)')
 *
 * @param {string} color
 * @param {number} opacity
 * @return {string}
 */
SPS.getDimColor = (color, opacity = .5) => {
  const rgbParts = color
    .split('(')[1]
    .replace(')', '')
    .replace(' ', '')
    .split(',', 3);
  let dimmedColor = 'rgba(';
  for (let i = rgbParts.length - 1; i >= 0; i--) {
    rgbParts[i] = parseInt(rgbParts[i]);
    dimmedColor += `${rgbParts[i]}, `;
  }
  dimmedColor += `${opacity})`;
  return dimmedColor;
};

export default SPS;
