import {combineReducers} from 'redux';
import undoable, {includeAction} from 'redux-undo';

import AuthReducer from './AuthReducer';
import GameSettingReducer from './GameSettingReducer';
import GameSheetReducer from './GameSheetReducer';
import CommonReducer from './CommonReducer';

import {updateGameSheet} from 'Actions/actionTypes';

const rootReducer = combineReducers({
  auth: AuthReducer,
  gameSettings: GameSettingReducer,
  gameSheet: undoable(
    GameSheetReducer,
    {
      filter: includeAction([
        updateGameSheet.incrementFouls,
        updateGameSheet.incrementCurrentScore,
        updateGameSheet.switchPlayer,
        updateGameSheet.completeBook,
      ]),
    }
  ),
  appState: CommonReducer,
});

export {rootReducer};
