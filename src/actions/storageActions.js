import {storageActionTypes} from './actionTypes';
import {NetInfo} from 'react-native';
import {updateRunningGame} from 'common';

/**
 * store a game to the local redux store
 *
 * @param   {object}  gameData
 * @return  {function(*): *}
 */
export function storeGame(gameData) {
  return (dispatch) => {
    const {gameKey = null} = gameData;
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected && gameKey && gameKey !== '') {
        updateRunningGame(gameData, gameKey).then(() => dispatch({type: storageActionTypes.storeGame, gameData}));
      }

      dispatch({type: storageActionTypes.storeGame, gameData});
    });
  };
}

/**
 * remove a single game from the local storage
 *
 * @param   {number} index
 * @return  {function(*): *}
 */
export function removeGame(index) {
  return (dispatch) => {
    dispatch({type: storageActionTypes.removeGame, index});
  };
}

/**
 * clear all games from local storage
 *
 * @return  {function(*): *}
 */
export function clearGames() {
  return (dispatch) => {
    dispatch({type: storageActionTypes.clearGames});
  };
}
