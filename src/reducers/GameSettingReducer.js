import {updateSettings} from 'Actions/actionTypes';
import {INITIAL_STATE} from './initialStates';
import {updateObjectInArray} from './stateHelpers';

const GameSettingReducer = (state = INITIAL_STATE.GameSettings, action) => {
  const {payload} = action;
  console.log('##### GameSettings Reducer: ', action);

  switch (action.type) {
    case updateSettings.updatePlayer:
      return {
        ...state,
        players: updateObjectInArray(
          state.players,
          {
            index: payload.index,
            item: {
              ...state.players[payload.index],
              name: payload.name,
            },
          }
        ),
      };

    case updateSettings.updatePoints:
      return {
        ...state,
        maxPoints: payload,
      };

    case updateSettings.updateRounds:
      return {
        ...state,
        maxRounds: payload,
      };

    case updateSettings.preFillPlayers:
      return {
        ...state,
        players: state.players.reverse(),
      };

    default:
      return state;
  }
};

export const getSettings = (state) => ({
  gameSettings: state.gameSettings,
});

export default GameSettingReducer;
