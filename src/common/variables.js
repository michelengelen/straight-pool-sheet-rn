import {Dimensions} from 'react-native';

let SPS = {};

SPS.variables = {
  colors: {
    backgroundColors: {
      light: 'rgba(230, 230, 230, 1)',
      lighter: 'rgba(245, 245, 245, 1)',
      dark: 'rgba(77, 43, 91, 1)',
      darker: 'rgba(61, 84, 96, 1)',
      dimm: 'rgba(10, 10, 10, .1)',
    },
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
    dimensions: Dimensions.get('window'),
  },
};

export default SPS;
