import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';

// project files
import {CustomStatusBar} from 'Components/common';
import GameSettings from 'Components/GameSettings';
import GameSheet from 'Components/GameSheet';
import Home from 'Components/Home';
import SPS from 'Common/variables';
import {store} from 'Store/configureStore';

const RootStack = createStackNavigator(
  {
    Home: Home,
    GameSettings: GameSettings,
    GameSheet: GameSheet,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
    },
  },
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
