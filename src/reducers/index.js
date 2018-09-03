import {combineReducers} from 'redux';
import undoable, {includeAction} from 'redux-undo';

import AuthReducer from './AuthReducer';
import GameSettingReducer from './GameSettingReducer';
import GameSheetReducer from './GameSheetReducer';
import CommonReducer from './CommonReducer';

import {gamesheetActions} from 'actions/actionTypes';

const rootReducer = combineReducers({
  auth: AuthReducer,
  gameSettings: GameSettingReducer,
  gameSheet: undoable(
    GameSheetReducer,
    {
      filter: includeAction([
        gamesheetActions.incrementFouls,
        gamesheetActions.incrementCurrentScore,
        gamesheetActions.switchPlayer,
        gamesheetActions.completeBook,
      ]),
    }
  ),
  appState: CommonReducer,
});

export {rootReducer};
