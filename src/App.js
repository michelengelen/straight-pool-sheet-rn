import React, {Component} from 'react';
import {NetInfo, View} from 'react-native';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import RNLanguages from 'react-native-languages';

// project files
import {CustomStatusBar, CustomNavigationDrawer, LoadingIndicator} from 'components/common';
import GameSettings from 'components/GameSettings';
import GameSheet from 'components/GameSheet';
import Home from 'components/Home';
import Profile from 'components/Profile';
import LoginRegister from 'components/LoginRegister';
import GamesList from 'components/profile/GamesList';
import Statistics from 'components/profile/Statistics';

import SPS from 'common/variables';
const {colors} = SPS.variables;
import {store, persistor} from 'store/configureStore';
import {i18n} from 'assets';
import {commonActions, authActions} from 'actions';
import {storageActions} from 'actions';

const renderNavigationDrawer = (props) => (<CustomNavigationDrawer {...props} />);

const DrawerNavigatorConfig = {
  initialRouteName: 'Home',
  drawerPosition: 'right',
  mode: 'card',
  navigationOptions: {
    header: null,
  },
  contentComponent: (props) => renderNavigationDrawer(props),
};

const navigationScenes = {
  Home,
  GameSettings,
  GameSheet,
  Profile,
  GamesList,
  LoginRegister,
  Statistics,
};

const StackNavigator = createStackNavigator(
  navigationScenes,
  {
    navigationOptions: {
      header: null,
    },
  },
);

const buildDrawerNavigation = (scenes) => {
  const drawerNavigation = {};
  for (const scene in scenes) {
    if (Object.prototype.hasOwnProperty.call(scenes, scene)) {
      drawerNavigation[scene] = StackNavigator;
    }
  }
  return drawerNavigation;
};

const RootStack = createDrawerNavigator(
  buildDrawerNavigation(navigationScenes),
  DrawerNavigatorConfig,
);

// eslint-disable-next-line
console.disableYellowBox = true;

/**
 * This is the main class that renders the complete App
 */
export default class App extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);

    RNLanguages.addEventListener('change', App._onLanguagesChange);

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      (isConnected) => App._handleConnectivityChange(isConnected)
    );
  }

  /**
   * React lifecycle hook - componentDidMount
   */
  componentDidMount() {
    RNLanguages.removeEventListener('change', App._onLanguagesChange);
  }

  /**
   * React lifecycle hook - componentWillUnmount
   */
  componentWillUnmount() {
    RNLanguages.removeEventListener('change', App._onLanguagesChange);
  }

  /**
   * event callback
   * @param {boolean} isConnected
   * @private
   */
  static _handleConnectivityChange(isConnected) {
    Promise.all([
      Promise.resolve(
        store.dispatch(commonActions.appNetworkStatus(isConnected))
      ),
      Promise.resolve(
        store.dispatch(authActions.checkLoginStatus(isConnected))
      ),
    ]).then(() => {
      const state = store.getState();
      const {auth, storage} = state;

      // if stored games are present and the user is logged in update all stored games in DB
      if (isConnected && auth.user && auth.user.uid && storage.playedGames.length > 0) {
        storageActions.addStoredGamestoDB(auth.user.uid, storage.playedGames, store.dispatch);
      }
    });
  }

  /**
   * handle language change on android devices
   * @param {string} language
   * @private
   */
  static _onLanguagesChange({language}) {
    i18n.locale = language;
  }

  /**
   * React-Native render function
   * @return {*}
   */
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1, backgroundColor: colors.grey.darkest}}>
            <LoadingIndicator size={'full-size'} />
            <CustomStatusBar
              barStyle={'light-content'}
              backgroundColor={colors.grey.darkest}
              darkMode
            />
            <RootStack />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
