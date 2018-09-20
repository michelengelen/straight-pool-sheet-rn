// TODO: make use of reac-native-svg and port all svgs for better performance
const loader = require('./dots.svg');
const logo = {uri: 'logo'};

const Icons = {
  average: 'average',
  book: 'book',
  foul: 'foul',
  maximum: 'maximum',
  minus: 'minus',
  player: 'player',
  undo: 'undo',
};

const Images = {
  loader,
  logo,
  Icons,
};

export default Images;
