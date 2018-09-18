import React, {Component} from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from 'react-navigation';
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

import SPS from 'common/variables';
import {store, persistor} from 'store/configureStore';
import {i18n} from 'assets';

const renderNavigationDrawer = (props) => (<CustomNavigationDrawer {...props} />);

const DrawerNavigatorConfig = {
  initialRouteName: 'Home',
  drawerPosition: 'right',
  navigationOptions: {
    header: null,
  },
  contentComponent: (props) => renderNavigationDrawer(props),
};

const RootStack = createDrawerNavigator(
  {
    Home: Home,
    GameSettings: GameSettings,
    GameSheet: GameSheet,
    Profile: Profile,
    GamesList: GamesList,
    LoginRegister: LoginRegister,
  },
  DrawerNavigatorConfig,
);

const {colors} = SPS.variables;

// TODO@Michel: Remove when yellow warning-boxes are needed.
// eslint-disable-next-line
console.disableYellowBox = true;

/**
 * This is the main class that renders the complete App
 */
export default class App extends Component {
  constructor(props) {
    super(props);

    this._onLanguagesChange = this._onLanguagesChange.bind(this);
    RNLanguages.addEventListener('change', this._onLanguagesChange);
    console.log('### i18n: ', i18n);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this._onLanguagesChange);
  }

  _onLanguagesChange({language}) {
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
          <View style={{flex: 1}}>
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
