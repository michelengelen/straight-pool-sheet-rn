import {ActionCreators} from 'redux-undo';
import {gamesheetActions} from './actionTypes';

const startGame = (gameSettings) => {
  return {
    type: gamesheetActions.startGame,
    payload: gameSettings,
  };
};

const clearGame = (restartingGame) => {
  return {
    type: gamesheetActions.clearGame,
    payload: restartingGame,
  };
};

const updatePlayerScore = (playerData) => {
  return {
    type: gamesheetActions.updatePlayerScore,
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
    type: gamesheetActions.incrementCurrentScore,
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
    type: gamesheetActions.completeBook,
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
    type: gamesheetActions.incrementFouls,
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
    type: gamesheetActions.switchPlayer,
  };
};

const _HOAundoScore = () => {
  return (dispatch) => {
    dispatch(ActionCreators.undo());
    dispatch(updatePlayerScore());
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

// Higher Order Action Creators
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

export const undoAction = (dispatch) => {
  return dispatch(_HOAundoScore());
};
