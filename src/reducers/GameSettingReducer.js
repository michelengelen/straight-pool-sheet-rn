import {updateSettings} from 'Actions/actionTypes';

const INITIAL_STATE = {
  players: {
    playerOne: {
      name: '',
    },
    playerTwo: {
      name: '',
    },
  },
  maxPoints: 100,
  maxRounds: 25,
};

const GameSettingReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;
  let newState = {...state};

  switch (action.type) {
    case updateSettings.updatePlayer:
      newState.players[payload.key].name = payload.name;
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
