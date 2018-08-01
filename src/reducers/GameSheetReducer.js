import {updateGameSheet} from 'Actions/actionTypes';

const INITIAL_STATE = {
  players: {
    playerOne: {
      name: '',
      totalScore: 0,
      highestScore: 0,
      averageScore: 0,
    },
    playerTwo: {
      name: '',
      totalScore: 0,
      highestScore: 0,
      averageScore: 0,
    },
  },
  rounds: [[
    {
      score: 0,
      fouls: 0,
      breaks: 0,
      totalScore: 0,
      remainingBalls: 15,
      highestScore: false,
    },
  ]],
  gameState: {
    currentRound: 1,
    currentPlayer: 0,
    currentPlayerKey: 'playerOne',
  },
  maxPoints: 100,
  maxRounds: 25,
};

const GameSheetReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;
  let newState = {...state};

  // Define values that get used later on
  const {currentRound, currentPlayer, currentPlayerKey} = state.gameState;
  const roundIndex = currentRound - 1;
  let averageScoreFloat;

  switch (action.type) {
    case updateGameSheet.startGame:
      newState.players.playerOne.name = payload.players.playerOne.name;
      newState.players.playerTwo.name = payload.players.playerTwo.name;
      newState.maxPoints = payload.maxPoints;
      newState.maxRounds = payload.maxRounds;
      break;
    case updateGameSheet.updatePlayerScore:
      // update the total Score which gets used in PlayerOverview as well
      newState.players[currentPlayerKey].totalScore++;
      // update highestScore when it gets higher than the one stored
      newState.players[currentPlayerKey].highestScore =
        payload.score > newState.players[currentPlayerKey].highestScore
          ? payload
          : newState.players[currentPlayerKey].highestScore;
      // update the average score based on the totalScore and the played rounds
      averageScoreFloat =
        newState.players[currentPlayerKey].totalScore / currentRound;
      newState.players[currentPlayerKey].averageScore =
        parseFloat(Math.round(averageScoreFloat * 100) / 100).toFixed(2);
      break;
    case updateGameSheet.incrementCurrentScore:
      newState.rounds[roundIndex][currentPlayer].totalScore++;
      newState.rounds[roundIndex][currentPlayer].remainingBalls--;
      if (newState.rounds[roundIndex][currentPlayer].remainingBalls < 2) {
        newState.rounds[roundIndex][currentPlayer].breaks++;
        newState.rounds[roundIndex][currentPlayer].remainingBalls = 15;
      };
      break;
    default:
      return state;
  }

  return newState;
};

export const getGameState = (state) => ({
  gameSheet: state.gameSheet,
});

export default GameSheetReducer;
