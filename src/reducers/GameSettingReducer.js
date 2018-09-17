import {settingActionTypes} from 'actions/actionTypes';
import {INITIAL_STATE} from './initialStates';
import {updateObjectInArray} from '../helpers/helpers';

const GameSettingReducer = (state = INITIAL_STATE.GameSettings, action) => {
  const {payload} = action;

  switch (action.type) {
    case settingActionTypes.updatePlayer:
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

    case settingActionTypes.updatePoints:
      return {
        ...state,
        maxPoints: payload,
      };

    case settingActionTypes.updateRounds:
      return {
        ...state,
        maxRounds: payload,
      };

    case settingActionTypes.swapPlayers:
      return {
        ...state,
        players: state.players.reverse(),
      };

    case settingActionTypes.onStartGame:
      return {
        ...state,
        gameRunning: true,
      };

    case settingActionTypes.onStopGame:
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
