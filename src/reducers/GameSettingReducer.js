import {settingActions} from 'actions/actionTypes';
import {INITIAL_STATE} from './initialStates';
import {updateObjectInArray} from './stateHelpers';

const GameSettingReducer = (state = INITIAL_STATE.GameSettings, action) => {
  const {payload} = action;

  switch (action.type) {
    case settingActions.updatePlayer:
      return {
        ...state,
        players: updateObjectInArray(
          state.players,
          {
            index: payload.index,
            item: {
              ...state.players[payload.index],
              name: payload.name,
              avatar: payload.avatar || null,
              useAccount: payload.useAccount || false,
            },
          }
        ),
      };

    case settingActions.updatePoints:
      return {
        ...state,
        maxPoints: payload,
      };

    case settingActions.updateRounds:
      return {
        ...state,
        maxRounds: payload,
      };

    case settingActions.swapPlayers:
      return {
        ...state,
        players: state.players.reverse(),
      };

    case settingActions.onStartGame:
      return {
        ...state,
        gameRunning: true,
      };

    case settingActions.onStopGame:
      return {
        ...state,
        gameRunning: false,
      };

    default:
      return state;
  }
};

export const getSettings = (state) => ({gameSettings: state.gameSettings});
export const isGameRunning = (state) => ({gameRunning: state.gameSettings.gameRunning});

export default GameSettingReducer;
