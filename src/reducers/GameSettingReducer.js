import {updateSettings} from 'Actions/actionTypes';
import {INITIAL_STATE} from './initialStates';

const GameSettingReducer = (state = INITIAL_STATE.GameSettings, action) => {
  const {payload} = action;
  let newState = {...state};

  switch (action.type) {
    case updateSettings.updatePlayer:
      newState.players[payload.index].name = payload.name;
      break;
    case updateSettings.updatePoints:
      newState.maxPoints = payload;
      break;
    case updateSettings.updateRounds:
      newState.maxRounds = payload;
      break;
    default:
      return state;
  }

  return newState;
};

export const getSettings = (state) => ({
  gameSettings: state.gameSettings,
});

export default GameSettingReducer;
