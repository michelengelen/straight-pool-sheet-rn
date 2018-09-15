import {database} from 'assets/index';
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
    },
  ]];

  // perform database actions
  const playedGamesRef = database.ref('users/' + userId + '/playedGames');

  // sync down from server
  let list = [];
  playedGamesRef.on('value', function(snap) {
    list = snap.val();
  });

  // push the new gameKey to the gamesPlayed array
  list.push(gameKey);
  playedGamesRef.set(list);

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

const removeGame = (gameKey) => {

};

export {createNewGame, updateRunningGame, cancelRunningGame};
