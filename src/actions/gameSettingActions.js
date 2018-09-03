import {settingActions} from './actionTypes';

const updatePlayer = (playerData) => {
  return {
    type: settingActions.updatePlayer,
    payload: playerData,
  };
};

const updatePoints = (maxPoints) => {
  return {
    type: settingActions.updatePoints,
    payload: maxPoints,
  };
};

const updateRounds = (maxRounds) => {
  return {
    type: settingActions.updateRounds,
    payload: maxRounds,
  };
};

const preFillPlayers = (players) => {
  return {
    type: settingActions.preFillPlayers,
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

export const preFillPlayersAction = (dispatch, payload) => {
  return dispatch(preFillPlayers(payload));
};
