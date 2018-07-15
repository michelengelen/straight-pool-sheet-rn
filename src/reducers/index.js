import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import GameSettingReducer from './GameSettingReducer';

export default combineReducers({
  auth: AuthReducer,
  gameSettings: GameSettingReducer,
});
