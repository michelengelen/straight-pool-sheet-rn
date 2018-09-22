import {auth, database} from 'assets';
import {removeItem} from 'helpers';
import {roundTemplate} from 'reducers/initialStates';

/**
 *
 * @param   {object} initialGameData
 * @param   {string} userId
 * @return  {Promise<string>}
 */
const createNewGame = (initialGameData, userId) => {
  const gameKey = database.ref().child('posts').push().key;

  initialGameData.timeStarted = new Date().toString();
  initialGameData.rounds = [[
    {
      ...roundTemplate,
      startTime: new Date().toString(),
    },
  ]];

  // perform database actions
  const playedGamesRef = database.ref('users/' + userId + '/playedGames');

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

  // addGamesListener(gameKey);

  return database.ref('games/' + gameKey).set(initialGameData).then(() => gameKey);
};

/**
 * update the current game in the database
 * @param   {object} updatedGameData
 * @param   {string} gameKey
 * @return  {Promise}
 */
const updateRunningGame = (updatedGameData, gameKey) => {
  return database.ref('games/' + gameKey).set(updatedGameData);
};

/**
 * cancel the current game in the database
 * @param   {string} gameKey
 * @return  {Promise}
 */
const cancelRunningGame = (gameKey) => {
  return database.ref('games/' + gameKey + '/gameState/cancelled').set(true);
};

/**
 * remove a game from the database
 * @param   {string} gameKey
 * @return  {Promise}
 */
// TODO: implement remove game functionality in GamesList component
// eslint-disable-next-line
const removeGame = (gameKey) => {
  // store user ref
  const uid = auth.currentUser.uid;
  const playedGamesRef = database.ref('users/' + uid + '/playedGames');

  // sync down from server
  playedGamesRef.once('value').then((snap) => {
    let list = [];
    const gamesList = snap.val();

    // if no array is returned cancel the operation
    if (Array.isArray(gamesList)) {
      const gameIndex = gamesList.indexOf(gameKey);

      if (gameIndex) {
        // remove the gameKey from the array
        list = removeItem(gamesList, gameIndex);

        // set the new list to the user
        playedGamesRef.set(list);
      }
    }
  });

  // finally remove the game from the database
  return database.ref('games/' + gameKey).remove();
};

export {createNewGame, updateRunningGame, cancelRunningGame};
