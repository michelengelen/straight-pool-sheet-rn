import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// project files
import {rootReducer} from 'Reducers';
import {CustomStatusBar} from 'Components/common';
import GameSettings from 'Components/GameSettings';
import GameSheet from 'Components/GameSheet';
import Home from 'Components/Home';
import SPS from 'Common/variables';

const store = createStore(rootReducer, composeWithDevTools());
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

const App = () => {
  return (
    <Provider store={store}>
      <View style={{
        flex: 1,
        backgroundColor: colors.backgroundColors.dark,
      }}>
        <CustomStatusBar
          barStyle={'light-content'}
          backgroundColor={colors.backgroundColors.darker}
          darkMode
        />
        <RootStack />
      </View>
    </Provider>
  );
};

export default App;
