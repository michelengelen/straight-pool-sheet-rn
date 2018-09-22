import {storageActionTypes} from './actionTypes';
import {NetInfo} from 'react-native';
import {updateRunningGame} from 'common';
import {database} from 'assets';

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
 * when device is reconnected store the last games into the DB
 * @param   {string}    uid
 * @param   {object[]}  games
 * @param   {function}  dispatch
 * @return  {function(*): *}
 */
export function addStoredGamestoDB(uid, games, dispatch) {
  console.log('--- games: ', games);
  console.log('--- uid: ', uid);
  for (let i = 0; i < games.length; i++) {
    if (games[i].gameKey && games[i].gameKey !== '') continue;

    const gameKey = database.ref().child('posts').push().key;
    games[i].gameKey = gameKey;

    // perform database actions
    const playedGamesRef = database.ref('users/' + uid + '/playedGames');

    // sync down from server
    playedGamesRef.once('value').then((snap) => {
      let list = [];
      const gamesList = snap.val();

      if (Array.isArray(gamesList)) {
        list = gamesList;
      }

      // push the new gameKey to the gamesPlayed array
      list.push(gameKey);
      playedGamesRef.set(list);
    });

    database.ref('games/' + gameKey).set(games[i]).then(() => gameKey);
  }

  dispatch({type: storageActionTypes.updateAllGames, games});
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
