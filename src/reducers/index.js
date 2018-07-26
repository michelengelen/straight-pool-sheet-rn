import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import GameSettingReducer from './GameSettingReducer';
import GameSheetReducer from './GameSheetReducer';
import CommonReducer from './CommonReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  gameSettings: GameSettingReducer,
  gameSheet: GameSheetReducer,
  appState: CommonReducer,
});

export {rootReducer};
