import {updateSettings} from './actionTypes';

const updatePlayer = (playerData) => {
  return {
    type: updateSettings.updatePlayer,
    payload: playerData,
  };
};

const updatePoints = (maxPoints) => {
  return {
    type: updateSettings.updatePoints,
    payload: maxPoints,
  };
};

const updateRounds = (maxRounds) => {
  return {
    type: updateSettings.updateRounds,
    payload: maxRounds,
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
