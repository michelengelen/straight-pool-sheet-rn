import {storageActionTypes} from 'actions/actionTypes';

const INITIAL_STATE = {
  playedGames: [],
};

const StorageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case storageActionTypes.storeGame:
      return {
        ...state,
        playedGames: [
          ...state.playedGames.slice(-19),
          action.gameData,
        ],
      };

    case storageActionTypes.removeGame:
      return {
        ...state,
        playedGames: [
          ...state.playedGames.slice(0, action.index),
          ...state.playedGames.slice(action.index + 1),
        ],
      };

    case storageActionTypes.updateAllGames:
      return {
        ...state,
        playedGames: [...action.games],
      };

    case storageActionTypes.clearGames:
      return {
        ...state,
        playedGames: [],
      };

    default:
      return state;
  }
};

export const getPlayedGames = (state) => ({
  playedGames: state.playedGames,
});

export default StorageReducer;
