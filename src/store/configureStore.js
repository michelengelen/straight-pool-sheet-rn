import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';

// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from 'reducers';
import SplashScreen from 'react-native-splash-screen';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['appState'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
const persistor = persistStore(store, null, () => setTimeout(SplashScreen.hide, 700));

export {store, persistor};
