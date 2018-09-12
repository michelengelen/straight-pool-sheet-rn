import {sceneNames} from './labels';

const filterVariables = {
  Home: {
    showWhenLoggedIn: true,
    showOnGameRunning: true,
    iconName: 'md-home',
  },
  GameSettings: {
    showWhenLoggedIn: false,
    showOnGameRunning: false,
    iconName: 'md-options',
  },
  GameSheet: {
    showWhenLoggedIn: true,
    showOnGameRunning: true,
    iconName: 'md-play',
  },
  Profile: {
    showWhenLoggedIn: true,
    showOnGameRunning: true,
    iconName: 'md-person',
  },
  LoginRegister: {
    showWhenLoggedIn: false,
    showOnGameRunning: true,
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
    return itemValues.showWhenLoggedIn === isLoggedIn || itemValues.showOnGameRunning === gameRunning;
  });
};

export {filterDrawerItems};
