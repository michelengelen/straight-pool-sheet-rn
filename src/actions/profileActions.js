import {profileActionTypes} from './actionTypes';
import {database} from 'assets';

/**
 * show the full-size LoadingIndicator
 *
 * @return  {function(*): *}
 */
export function getGamesList() {
  return (dispatch) => {
    dispatch({
      type: profileActionTypes.getGamesList,
      payload: gamesList,
    });
  };
}

/**
 * This is for future reference of playing with friends
 * It can be updated in real-time and according to the currentPlayer the controls could be (de-)activated
 *
 * @param {string} gameKey
 */
export function addGamesListener(gameKey) {
  const gamesRef = database.ref(`games/${gameKey}`);
  gamesRef.on('value', function(snapshot) {
    // This is for future reference of playing with friends
    // It can be updated in real-time and according to the currentPlayer the controls could be (de-)activated
  });
}
