import {database} from 'assets';

const createNewGame = (initialGameData) => {
  const gameKey = database.ref().child('posts').push().key;
  return database.ref('games/' + gameKey).set(initialGameData).then(() => gameKey);
};

export {createNewGame};
