export const settingActionTypes = {
  updatePlayer: 'settings/UPDATE_PLAYER',
  updateRounds: 'settings/UPDATE_ROUNDS',
  updatePoints: 'settings/UPDATE_POINTS',
  swapPlayers: 'settings/SWAP_PLAYERS',
  onStartGame: 'settings/ON_START_GAME',
  onStopGame: 'settings/ON_STOP_GAME',
};

export const gamesheetActionTypes = {
  startGame: 'gamesheet/START_GAME',
  clearGame: 'gamesheet/CLEAR_GAME',
  cancelGame: 'gamesheet/CANCEL_GAME',
  finishGame: 'gamesheet/FINISH_GAME',
  incrementFouls: 'gamesheet/INCREMENT_FOULS',
  incrementCurrentScore: 'gamesheet/INCREMENT_CURRENT_SCORE',
  completeBook: 'gamesheet/COMPLETE_BOOK',
  switchPlayer: 'gamesheet/SWITCH_PLAYER',
  updatePlayerScore: 'gamesheet/UPDATE_PLAYER_SCORE',
};

export const commonActionTypes = {
  appLoading: 'common/APP_LOADING',
  appReady: 'common/APP_READY',
};

export const authActionTypes = {
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT',
  USE_ACCOUNT: 'auth/USE_ACCOUNT',
};

export const profileActionTypes = {
  getGamesList: 'profile/GET_GAMESLIST',
};
