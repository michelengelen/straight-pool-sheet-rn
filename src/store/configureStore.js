import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';

// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from 'reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
const persistor = persistStore(store);

export {store, persistor};
