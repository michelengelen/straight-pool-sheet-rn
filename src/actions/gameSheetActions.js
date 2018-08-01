import {updateGameSheet} from './actionTypes';

const startGame = (gameSettings) => {
  return {
    type: updateGameSheet.startGame,
    payload: gameSettings,
  };
};

const updatePlayerScore = (playerData) => {
  return {
    type: updateGameSheet.updatePlayerScore,
    payload: playerData,
  };
};

const incrementCurrentScore = () => {
  return {
    type: updateGameSheet.incrementCurrentScore,
  };
};

export const updatePlayerScoreAction = (dispatch, payload) => {
  return dispatch(updatePlayerScore(payload));
};

export const startGameAction = (dispatch, payload) => {
  return dispatch(startGame(payload));
};

export const incrementCurrentScoreAction = (dispatch) => {
  return dispatch(incrementCurrentScore());
};


