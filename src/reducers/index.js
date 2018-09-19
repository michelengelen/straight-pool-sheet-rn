import {combineReducers} from 'redux';
import undoable, {includeAction} from 'redux-undo';

import AuthReducer from './AuthReducer';
import GameSettingReducer from './GameSettingReducer';
import GameSheetReducer from './GameSheetReducer';
import CommonReducer from './CommonReducer';
import StorageReducer from './StorageReducer';

import {gamesheetActionTypes} from 'actions/actionTypes';

const rootReducer = combineReducers({
  auth: AuthReducer,
  gameSettings: GameSettingReducer,
  gameSheet: undoable(
    GameSheetReducer,
    {
      filter: includeAction([
        gamesheetActionTypes.incrementFouls,
        gamesheetActionTypes.incrementCurrentScore,
        gamesheetActionTypes.switchPlayer,
        gamesheetActionTypes.completeBook,
      ]),
    }
  ),
  storage: StorageReducer,
  appState: CommonReducer,
});

export {rootReducer};
