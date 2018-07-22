import React from 'react';
import {View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// project files
import reducers from 'Reducers';
import GameSettings from 'Components/GameSettings';
import SPS from 'Common/variables';

const store = createStore(reducers, composeWithDevTools());

const App = () => {
  return (
    <Provider store={store}>
      <View style={{
        flex: 1,
        paddingTop: 15,
        backgroundColor: SPS.variables.colors.backgroundColor,
      }}>
        <StatusBar barStyle={'light-content'} />
        <GameSettings updatePlayer={reducers.updatePlayer}/>
      </View>
    </Provider>
  );
};

export default App;
