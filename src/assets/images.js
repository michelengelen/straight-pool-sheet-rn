// TODO: make use of reac-native-svg and port all svgs for better performance
const loader = require('./dots.svg');
const logo = {uri: 'logo'};

const Icons = {
  average: require('./icons/average.svg'),
  book: require('./icons/book.svg'),
  foul: require('./icons/foul.svg'),
  maximum: require('./icons/maximum.svg'),
  minus: require('./icons/minus.svg'),
  player: require('./icons/player.svg'),
  undo: require('./icons/undo.svg'),
};

const Images = {
  loader,
  logo,
  Icons,
};

export default Images;
