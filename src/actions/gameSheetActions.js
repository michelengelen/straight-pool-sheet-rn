import {ActionCreators} from 'redux-undo';
import {onStartGame, onStopGame} from './gameSettingActions';
import {gamesheetActions} from './actionTypes';
import {createNewGame} from 'common';

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

const finishGame = () => {
  return {
    type: gamesheetActions.finishGame,
  };
};

const cancelGame = () => {
  return {
    type: gamesheetActions.cancelGame,
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

const _HOAcancelGame = () => {
  return (dispatch) => {
    dispatch(cancelGame());
    dispatch(onStopGame());
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

export const cancelGameAction = (dispatch) => {
  return dispatch(_HOAcancelGame());
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
