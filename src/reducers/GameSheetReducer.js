import {updateGameSheet} from 'Actions/actionTypes';

const INITIAL_STATE = {
  players: {
    playerOne: {
      name: '',
      currentScore: 0,
      highestScore: 0,
      averageScore: 0.00,
    },
    playerTwo: {
      name: '',
      currentScore: 0,
      highestScore: 0,
      averageScore: 0.00,
    },
  },
  currentRound: 1,
  maxPoints: 100,
  maxRounds: 25,
};

const GameSheetReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;
  let newState = {...state};

  switch (action.type) {
    case updateGameSheet.startGame:
      newState.players.playerOne.name = payload.players.playerOne.name;
      newState.players.playerTwo.name = payload.players.playerTwo.name;
      newState.maxPoints = payload.maxPoints;
      newState.maxRounds = payload.maxRounds;
      break;
    case updateGameSheet.updatePlayerScore:
      newState.players[payload.key].currentScore += payload.score;
      newState.players[payload.key].highestScore =
        payload.score > newState.players[payload.key].highestScore
          ? payload.score
          : newState.players[payload.key].highestScore;
      newState.players[payload.key].averageScore = payload.score;
      break;
    default:
      return state;
  }

  return newState;
};

export const getGameState = (state) => ({
  gameState: state.gameState,
});

export default GameSheetReducer;
