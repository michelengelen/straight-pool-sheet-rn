import {updateSettings} from './actionTypes';

export const updatePlayer = (playerData) => {
  return {
    type: updateSettings.updatePlayer,
    payload: playerData,
  };
};

export const updatePlayerAction = (dispatch, payload) => {
  return dispatch(updatePlayer(payload));
};
