import {storageActionTypes} from './actionTypes';

/**
 * store a game to the local redux store
 *
 * @param   {object}  gameData
 * @return  {function(*): *}
 */
export function storeGame(gameData) {
  return (dispatch) => {
    dispatch({type: storageActionTypes.storeGame, gameData});
  };
}

/**
 * hide the full-size LoadingIndicator
 *
 * @param   {number} index
 * @return  {function(*): *}
 */
export function removeGame(index) {
  return (dispatch) => {
    dispatch({type: storageActionTypes.removeGame, index});
  };
}
