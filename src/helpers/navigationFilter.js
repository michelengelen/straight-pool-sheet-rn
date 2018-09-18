import {scenes} from '../common/labels';

/**
 * config for the Navigation Items (Scenes)
 *
 * possible config values:
 * - alwaysShow: boolean
 * - neverShow: boolean
 * - showWhenGameRunning: boolean
 * - showWhenLoggedIn: boolean
 * - iconName: string
 */
const filterVariables = {
  Home: {
    alwaysShow: true,
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
  GamesList: {
    neverShow: true,
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

/**
 * filter the defined items by the config here
 * @param   {object}  items
 * @param   {boolean} isLoggedIn
 * @param   {boolean} gameRunning
 * @return  {object[]}
 */
const filterDrawerItems = (items, isLoggedIn, gameRunning) => {
  return items.map((item) => {
    const itemValues = filterVariables[item.key];
    item.drawerTitle = scenes[item.key].drawerTitle;
    item.iconName = itemValues.iconName;
    return item;
  }).filter((item) => {
    const itemValues = filterVariables[item.key];

    const shouldShowWhenLoggedIn = itemValues.showWhenLoggedIn === isLoggedIn;
    const shouldShowWhenWhenGameRunning = itemValues.showWhenGameRunning === gameRunning;

    return !itemValues.neverShow && (itemValues.alwaysShow || shouldShowWhenLoggedIn || shouldShowWhenWhenGameRunning);
  });
};

export {filterDrawerItems};
