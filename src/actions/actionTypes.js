export const settingActions = {
  updatePlayer: 'settings/UPDATE_PLAYER',
  updateRounds: 'settings/UPDATE_ROUNDS',
  updatePoints: 'settings/UPDATE_POINTS',
  swapPlayers: 'settings/SWAP_PLAYERS',
};

export const gamesheetActions = {
  startGame: 'gamesheet/START_GAME',
  clearGame: 'gamesheet/CLEAR_GAME',
  incrementFouls: 'gamesheet/INCREMENT_FOULS',
  incrementCurrentScore: 'gamesheet/INCREMENT_CURRENT_SCORE',
  completeBook: 'gamesheet/COMPLETE_BOOK',
  switchPlayer: 'gamesheet/SWITCH_PLAYER',
  updatePlayerScore: 'gamesheet/UPDATE_PLAYER_SCORE',
};

export const commonActions = {
  appLoading: 'common/APP_LOADING',
  appReady: 'common/APP_READY',
  setRunningGame: 'common/SET_RUNNING_GAME',
};

export const authActions = {
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT',
  USE_ACCOUNT: 'auth/USE_ACCOUNT',
};
