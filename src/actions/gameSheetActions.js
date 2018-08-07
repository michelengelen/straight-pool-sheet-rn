import {updateGameSheet} from './actionTypes';

const startGame = (gameSettings) => {
  return {
    type: updateGameSheet.startGame,
    payload: gameSettings,
  };
};

const clearGame = (restartingGame) => {
  return {
    type: updateGameSheet.clearGame,
    payload: restartingGame,
  };
};

const updatePlayerScore = (playerData) => {
  return {
    type: updateGameSheet.updatePlayerScore,
    payload: playerData,
  };
};

const _HOAincrementScore = () => {
  return (dispatch) => {
    dispatch(incrementScore());
    dispatch(updatePlayerScore());
  };
};

const incrementScore = () => {
  return {
    type: updateGameSheet.incrementCurrentScore,
  };
};

const _HOAcompleteBook = () => {
  return (dispatch) => {
    dispatch(completeBook());
    dispatch(updatePlayerScore());
  };
};

const completeBook = () => {
  return {
    type: updateGameSheet.completeBook,
  };
};

const _HOAincrementFouls = () => {
  return (dispatch) => {
    dispatch(incrementFouls());
    dispatch(updatePlayerScore());
  };
};

const incrementFouls = () => {
  return {
    type: updateGameSheet.incrementFouls,
  };
};

const _HOAswitchPlayer = () => {
  return (dispatch) => {
    dispatch(switchPlayer());
    dispatch(updatePlayerScore());
  };
};

const switchPlayer = () => {
  return {
    type: updateGameSheet.switchPlayer,
  };
};

export const startGameAction = (dispatch, payload) => {
  return dispatch(startGame(payload));
};

export const clearGameAction = (dispatch, payload) => {
  return dispatch(clearGame(payload));
};

export const updatePlayerScoreAction = (dispatch, payload) => {
  return dispatch(updatePlayerScore(payload));
};

export const incrementScoreAction = (dispatch) => {
  return dispatch(_HOAincrementScore());
};

export const completeBookAction = (dispatch) => {
  return dispatch(_HOAcompleteBook());
};

export const incrementFoulsAction = (dispatch) => {
  return dispatch(_HOAincrementFouls());
};

export const switchPlayerAction = (dispatch) => {
  return dispatch(_HOAswitchPlayer());
};


