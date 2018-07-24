import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import GameSettingReducer from './GameSettingReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  gameSettings: GameSettingReducer,
});

export default rootReducer;
