import {Dimensions} from 'react-native';

let SPS = {};

SPS.variables = {
  colors: {
    backgroundColors: {
      light: 'rgba(230, 230, 230, 1)',
      lighter: 'rgba(245, 245, 245, 1)',
      dark: 'rgba(35, 63, 76, 1)',
      darker: 'rgba(26, 48, 58, 1)',
      dimm: 'rgba(10, 10, 10, .15)',
      grey: 'rgba(70, 70, 70 ,1)',
      darkGrey: 'rgba(45, 45, 45, 1)',
      darkerGrey: 'rgba(40, 40, 40, .7)',
      darkRed: 'rgba(127, 7, 7, 1)',
    },
    borderColors: {
      dark: 'rgba(33, 33, 33, .2)',
      darker: 'rgba(12, 12, 12, .2)',
    },
    shadow: 'rgba(33, 33, 33, 1)',
    textColor: 'rgba(240, 240, 240, .8)',
    textColorDim: 'rgba(245, 245, 245, .4)',
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
