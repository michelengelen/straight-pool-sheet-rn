import React from 'react';
import {View, StatusBar} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// project files
import reducers from 'Reducers';
import GameSettings from 'Components/GameSettings';
import Home from 'Components/Home';
import SPS from 'Common/variables';

const store = createStore(reducers, composeWithDevTools());
const RootStack = createStackNavigator(
  {
    Home: Home,
    GameSettings: GameSettings,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
    },
  },
);

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <RootStack />
      </View>
    </Provider>
  );
};

export default App;
