import {ActionCreators} from 'redux-undo';
import {setRunningGame, setCancelGame} from './gameSettingActions';
import {gamesheetActions} from './actionTypes';
import {createNewGame} from 'common';

const startGame = (gameSettings) => {
  return {
    type: gamesheetActions.startGame,
    payload: gameSettings,
  }
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

const _HOAstartGame = (gameSettings, userId) => {
  if (userId) {
    createNewGame(gameSettings).then((gameKey) => {
      gameSettings.gameKey = gameKey;
      gameSettings.userId = userId;
    });
  }
  return (dispatch) => {
    dispatch(setRunningGame());
    dispatch(startGame(gameSettings));
  };
};

export const startGameAction = (dispatch, settings, userId) => {
  return dispatch(_HOAstartGame(settings, userId));
};

const _HOAcancelGame = (payload) => {
  return (dispatch) => {
    dispatch(setCancelGame());
    dispatch(clearGame(payload));
  };
};

export const clearGameAction = (dispatch, payload) => {
  return dispatch(_HOAcancelGame(payload));
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
