import {ActionCreators} from 'redux-undo';
import {clearGameSettings, onStartGame, onStopGame, swapPlayers} from './gameSettingActions';
import {storeGame} from './storageActions';
import {gamesheetActionTypes} from './actionTypes';
import {createNewGame, cancelRunningGame} from 'common';

const startGame = (gameSettings) => {
  return {
    type: gamesheetActionTypes.startGame,
    payload: gameSettings,
  };
};

const clearGame = () => {
  return {
    type: gamesheetActionTypes.clearGame,
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

const _HOAfinishGame = (gameData) => {
  return (dispatch) => {
    dispatch(finishGame());
    dispatch(storeGame(gameData));
    dispatch(onStopGame());
  };
};

const _HOAcancelGame = (gameData) => {
  return (dispatch) => {
    const {gameKey} = gameData;
    if (gameKey && gameKey !== '') {
      cancelRunningGame(gameKey).then(() => {
        dispatch(cancelGame());
        dispatch(storeGame(gameData));
        dispatch(clearGame());
        dispatch(ActionCreators.clearHistory());
        dispatch(onStopGame());
      });
    } else {
      dispatch(cancelGame());
      dispatch(storeGame(gameData));
      dispatch(clearGame());
      dispatch(ActionCreators.clearHistory());
      dispatch(onStopGame());
    }
  };
};

const _HOAclearGame = (restart) => {
  return (dispatch) => {
    if (restart) {
      dispatch(swapPlayers());
    } else {
      dispatch(clearGameSettings());
    }
    dispatch(clearGame());
    dispatch(ActionCreators.clearHistory());
    dispatch(onStopGame());
  };
};

// Higher Order Action Creators
export const startGameAction = (dispatch, settings, userId) => {
  return dispatch(_HOAstartGame(settings, userId));
};
export const finishGameAction = (dispatch, gameData) => {
  return dispatch(_HOAfinishGame(gameData));
};

export const clearGameAction = (dispatch, restart) => {
  return dispatch(_HOAclearGame(restart));
};

export const cancelGameAction = (dispatch, gameData) => {
  return dispatch(_HOAcancelGame(gameData));
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
