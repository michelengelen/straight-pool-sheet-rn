import React, {Component} from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';

// project files
import {CustomStatusBar, CustomNavigationDrawer} from 'components/common';
import GameSettings from 'components/GameSettings';
import GameSheet from 'components/GameSheet';
import Home from 'components/Home';
import Profile from 'components/Profile';
import LoginRegister from 'components/LoginRegister';

import SPS from 'common/variables';
import {store} from 'store/configureStore';

const DrawerNavigatorConfig = {
  initialRouteName: 'Home',
  drawerPosition: 'right',
  navigationOptions: {
    header: null,
  },
  contentComponent: (props) => (
    <CustomNavigationDrawer {...props} />
  ),
};

const RootStack = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => {
        const {params} = navigation.state;
        if (!params) {
          navigation.setParams({
            icon: 'md-home',
            showWhenLoggedIn: true,
            alwaysShow: true,
          });
        }
        return {
          drawerLabel: 'Home TEST',
        };
      },
    },
    GameSettings: {
      screen: GameSettings,
      navigationOptions: ({navigation}) => {
        const {params} = navigation.state;
        if (!params) {
          navigation.setParams({
            icon: 'md-home',
            showWhenLoggedIn: true,
            alwaysShow: false,
          });
        }
      },
    },
    GameSheet: {
      screen: GameSheet,
      navigationOptions: ({navigation}) => {
        const {params} = navigation.state;
        if (!params) {
          navigation.setParams({
            icon: 'md-home',
            showWhenLoggedIn: true,
            alwaysShow: true,
          });
        }
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => {
        const {params} = navigation.state;
        if (!params) {
          navigation.setParams({
            icon: 'md-home',
            showWhenLoggedIn: true,
            alwaysShow: true,
          });
        }
      },
    },
    LoginRegister: {
      screen: LoginRegister,
      navigationOptions: ({navigation}) => {
        const {params} = navigation.state;
        if (!params) {
          navigation.setParams({
            icon: 'md-home',
            showWhenLoggedIn: true,
            alwaysShow: true,
          });
        }
      },
    },
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
  /**
   * React lifecycle hook: componentDidMount
   */
  componentDidMount() {
    // SplashScreen.hide();
  }

  /**
   * React-Native render function
   * @return {*}
   */
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar
            barStyle={'light-content'}
            backgroundColor={colors.grey.darkest}
            darkMode
          />
          <RootStack />
        </View>
      </Provider>
    );
  }
}
