import {database} from 'assets';

const createNewGame = (initialGameData, userId) => {
  const gameKey = database.ref().child('posts').push().key;
  console.log('--- userId: ', userId);
  database.ref('users/' + userId + '/gamesPlayed').push(gameKey);
  return database.ref('games/' + gameKey).set(initialGameData).then(() => gameKey);
};

export {createNewGame};
