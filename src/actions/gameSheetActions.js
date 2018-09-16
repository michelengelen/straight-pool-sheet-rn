import {ActionCreators} from 'redux-undo';
import {onStartGame, onStopGame} from './gameSettingActions';
import {gamesheetActionTypes} from './actionTypes';
import {createNewGame, cancelRunningGame} from 'common';

const startGame = (gameSettings) => {
  return {
    type: gamesheetActionTypes.startGame,
    payload: gameSettings,
  };
};

const clearGame = (restartingGame) => {
  return {
    type: gamesheetActionTypes.clearGame,
    payload: restartingGame,
  };
};

const finishGame = () => {
  return {
    type: gamesheetActionTypes.finishGame,
  };
};

const cancelGame = () => {
  return {
    type: gamesheetActionTypes.cancelGame,
  };
};

const updatePlayerScore = (playerData) => {
  return {
    type: gamesheetActionTypes.updatePlayerScore,
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
    type: gamesheetActionTypes.incrementCurrentScore,
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
    type: gamesheetActionTypes.completeBook,
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
    type: gamesheetActionTypes.incrementFouls,
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
    type: gamesheetActionTypes.switchPlayer,
  };
};

const _HOAundoScore = () => {
  return (dispatch) => {
    dispatch(ActionCreators.undo());
    dispatch(updatePlayerScore());
  };
};

const _HOAstartGame = (gameSettings, userId) => {
  return (dispatch) => {
    if (userId) {
      createNewGame(gameSettings, userId).then((gameKey) => {
        gameSettings.gameKey = gameKey;
        gameSettings.userId = userId;

        dispatch(onStartGame());
        dispatch(startGame(gameSettings));
      });
    } else {
      dispatch(onStartGame());
      dispatch(startGame(gameSettings));
    }
  };
};

const _HOAfinishGame = () => {
  return (dispatch) => {
    dispatch(finishGame());
    dispatch(onStopGame());
  };
};

const _HOAcancelGame = (gameKey) => {
  return (dispatch) => {
    cancelRunningGame(gameKey).then(() => {
      dispatch(cancelGame());
      dispatch(onStopGame());
    });
  };
};

// Higher Order Action Creators
export const startGameAction = (dispatch, settings, userId) => {
  return dispatch(_HOAstartGame(settings, userId));
};
export const finishGameAction = (dispatch) => {
  return dispatch(_HOAfinishGame());
};

export const clearGameAction = (dispatch, payload) => {
  return dispatch(clearGame(payload));
};

export const cancelGameAction = (dispatch, gameKey) => {
  return dispatch(_HOAcancelGame(gameKey));
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

export const undoAction = (dispatch) => {
  return dispatch(_HOAundoScore());
};
