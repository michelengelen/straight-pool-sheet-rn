import {Dimensions} from 'react-native';

let SPS = {};

SPS.variables = {
  colors: {
    backgroundColors: {
      light: 'rgba(230, 230, 230, 1)',
      lighter: 'rgba(245, 245, 245, 1)',
      dark: 'rgba(49, 79, 96, 1)',
      darker: 'rgba(45, 73, 89, 1)',
      dimm: 'rgba(10, 10, 10, .3)',
      grey: 'rgba(70, 70, 70 ,1)',
      darkGrey: 'rgba(45, 45, 45, 1)',
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
    font_S: 9,
    font_M: 10,
    font_L: 14,
    font_XL: 20,
    font_XXL: 28,
    dimensions: Dimensions.get('window'),
  },
};

export default SPS;
