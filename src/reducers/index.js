import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import GameSettingReducer from './GameSettingReducer';
import CommonReducer from './CommonReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  gameSettings: GameSettingReducer,
  appState: CommonReducer,
});

export {rootReducer};
