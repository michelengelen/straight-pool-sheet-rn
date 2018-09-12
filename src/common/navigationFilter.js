import {sceneNames} from './labels';

const filterVariables = {
  Home: {
    showAlways: true,
    showWhenLoggedIn: true,
    iconName: 'md-home',
  },
  GameSettings: {
    showWhenGameRunning: false,
    iconName: 'md-options',
  },
  GameSheet: {
    showWhenGameRunning: true,
    iconName: 'md-play',
  },
  Profile: {
    showWhenLoggedIn: true,
    iconName: 'md-person',
  },
  LoginRegister: {
    showWhenLoggedIn: false,
    iconName: 'md-log-in',
  },
};

const filterDrawerItems = (items, isLoggedIn, gameRunning) => {
  return items.map((item) => {
    const itemValues = filterVariables[item.key];
    item.drawerTitle = sceneNames[item.key].drawerTitle;
    item.iconName = itemValues.iconName;
    return item;
  }).filter((item) => {
    const itemValues = filterVariables[item.key];

    const shouldShowWhenLoggedIn = itemValues.showWhenLoggedIn === isLoggedIn;
    const shouldShowWhenWhenGameRunning = itemValues.showWhenGameRunning === gameRunning;

    return itemValues.showAlways || shouldShowWhenLoggedIn ||shouldShowWhenWhenGameRunning;
  });
};

export {filterDrawerItems};
