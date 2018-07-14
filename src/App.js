import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import project files
import reducers from './reducers';
import GameSettings from './components/GameSettings';
import SPS from './common/variables';

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{ flex: 1, paddingTop: 15, backgroundColor: SPS.variables.colors.backgroundColor }}>
        <StatusBar barStyle={'light-content'} />
        <GameSettings />
      </View>
    </Provider>
  );
};

export default App;