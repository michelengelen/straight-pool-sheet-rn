import {settingActionTypes} from './actionTypes';

const updatePlayer = (playerData) => {
  return {
    type: settingActionTypes.updatePlayer,
    payload: playerData,
  };
};

const updatePoints = (maxPoints) => {
  return {
    type: settingActionTypes.updatePoints,
    payload: maxPoints,
  };
};

const updateRounds = (maxRounds) => {
  return {
    type: settingActionTypes.updateRounds,
    payload: maxRounds,
  };
};

const swapPlayers = (players) => {
  return {
    type: settingActionTypes.swapPlayers,
    payload: players,
  };
};

export const updatePlayerAction = (dispatch, payload) => {
  return dispatch(updatePlayer(payload));
};

export const updatePointsAction = (dispatch, payload) => {
  return dispatch(updatePoints(payload));
};

export const updateRoundsAction = (dispatch, payload) => {
  return dispatch(updateRounds(payload));
};

export const swapPlayersAction = (dispatch, payload) => {
  return dispatch(swapPlayers(payload));
};

/**
 * set a value for the case a game is currently running
 *
 * @return {function(*): *}
 */
export const onStartGame = () => {
  return {type: settingActionTypes.onStartGame};
};

/**
 * set a value for the case no game is running
 *
 * @return {function(*): *}
 */
export const onStopGame = () => {
  return {type: settingActionTypes.onStopGame};
};
