import {Dimensions} from 'react-native';

let SPS = {};

SPS.variables = {
  colors: {
    backgroundColors: {
      light: 'rgba(60, 210, 240, 1)',
      lighter: 'rgba(245, 245, 245, 1)',
      dark: 'rgba(45, 54, 69, 1)',
      darker: 'rgba(23, 35, 39, 1)',
      darkest: 'rgba(16, 20, 22, 1)',
      green: 'rgba(151, 208, 91, 1)',
      blue: 'rgba(102, 176, 189, 1)',
      red: 'rgba(217, 100, 59, 1)',
      dimm: 'rgba(10, 10, 10, .15)',
      grey: 'rgba(70, 70, 70 ,1)',
      darkGrey: 'rgba(20, 20, 20, 1)',
      darkerGrey: 'rgba(40, 40, 40, 1)',
    },
    borderColors: {
      dark: 'rgba(33, 33, 33, .2)',
      darker: 'rgba(12, 12, 12, .2)',
    },
    shadow: 'rgba(33, 33, 33, 1)',
    textColor: 'rgba(250, 250, 250, 1)',
    textColorDim: 'rgba(245, 245, 245, .3)',
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
