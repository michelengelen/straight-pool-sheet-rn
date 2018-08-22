import {Dimensions} from 'react-native';

let SPS = {};

SPS.variables = {
  colors: {
    backgroundColors: {
      dark: 'rgba(45, 45, 45, 1)',
      darker: 'rgba(48, 48, 48, 1)',
      darkest: 'rgba(28, 28, 28, 1)',
      green: 'rgba(151, 208, 91, 1)',
      blue: 'rgba(102, 176, 189, 1)',
      red: 'rgba(217, 100, 59, 1)',
      dim: 'rgba(10, 10, 10, .25)',
      grey: 'rgba(70, 70, 70 ,1)',
      darkGrey: 'rgba(20, 20, 20, 1)',
      darkerGrey: 'rgba(40, 40, 40, 1)',
      // new Colors
      primary: 'rgba(102, 176, 189, 1)', // blue
      // primary: 'rgba(172, 44, 64, 1)', // red
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

export default SPS;
