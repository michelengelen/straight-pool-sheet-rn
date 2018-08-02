import {updateGameSheet} from 'Actions/actionTypes';

const roundTemplate = {
  score: 0,
  fouls: 0,
  breaks: [],
  totalScore: 0,
  currentScore: 0,
  remainingBalls: 15,
  highestScore: false,
};

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
      ...roundTemplate,
    },
  ]],
  gameState: {
    currentRound: 1,
    currentPlayer: 0,
    remainingBalls: 15,
  },
  maxPoints: 100,
  maxRounds: 25,
};

const getCurrentPlayerKey =
  (player) => player === 0 ? 'playerOne' : 'playerTwo';

const buildCurrentScoreText = (score, breaks) => {
  if (breaks.length < 1) return `${score}`;

  let currentScore = '';
  for (let i = 0; i < breaks.length; i++) {
    currentScore += breaks[i] + ' / ';
  }
  return currentScore + score;
};

const GameSheetReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;
  let newState = {...state};

  // Define values that get used later on
  const {currentRound, currentPlayer} = state.gameState;
  const roundIndex = currentRound - 1;
  // case: updatePlayerScore
  const currentPlayerKey =
    getCurrentPlayerKey(newState.gameState.currentPlayer);
  let averageScoreFloat = 0;
  let highestScoreIndex = 0;
  // case: SwitchPlayer
  let newRoundSet = {
    ...roundTemplate,
    breaks: [],
  };

  switch (action.type) {
    case updateGameSheet.startGame:
      newState.players.playerOne.name = payload.players.playerOne.name;
      newState.players.playerTwo.name = payload.players.playerTwo.name;
      newState.maxPoints = payload.maxPoints;
      newState.maxRounds = payload.maxRounds;
      break;

    case updateGameSheet.updatePlayerScore:
      newState.players[currentPlayerKey].totalScore = 0;

      for (let i = 0; i < state.rounds.length; i++) {
        newState.players[currentPlayerKey].totalScore +=
          state.rounds[i][currentPlayer].totalScore -
          state.rounds[i][currentPlayer].fouls;

        newState.rounds[i][currentPlayer].highestScore = false;

        if (state.rounds[i][currentPlayer].totalScore
            > newState.players[currentPlayerKey].highestScore) {
          newState.players[currentPlayerKey].highestScore =
            state.rounds[i][currentPlayer].totalScore;
          highestScoreIndex = i;
        }
      }
      newState.rounds[highestScoreIndex][currentPlayer].highestScore =
        false;

      // update the average score based on the totalScore and the played rounds
      averageScoreFloat =
        newState.players[currentPlayerKey].totalScore / currentRound;

      newState.players[currentPlayerKey].averageScore =
        parseFloat(Math.round(averageScoreFloat * 100) / 100).toFixed(2);
      break;

    case updateGameSheet.incrementCurrentScore:
      newState.rounds[roundIndex][currentPlayer].score++;
      newState.rounds[roundIndex][currentPlayer].totalScore++;
      newState.rounds[roundIndex][currentPlayer].remainingBalls--;

      if (newState.rounds[roundIndex][currentPlayer].remainingBalls < 2) {
        newState.rounds[roundIndex][currentPlayer].breaks.push(
          newState.rounds[roundIndex][currentPlayer].score < 14
            ? newState.rounds[roundIndex][currentPlayer].score
            : '*'
        );
        newState.rounds[roundIndex][currentPlayer].score = 0;
        newState.rounds[roundIndex][currentPlayer].remainingBalls = 15;
      }

      newState.rounds[roundIndex][currentPlayer].currentScore =
          buildCurrentScoreText(
            newState.rounds[roundIndex][currentPlayer].score -
            newState.rounds[roundIndex][currentPlayer].fouls,
            newState.rounds[roundIndex][currentPlayer].breaks
          );
      break;

    case updateGameSheet.switchPlayer:
      newRoundSet.remainingBalls =
      newState.gameState.remainingBalls =
        state.rounds[roundIndex][currentPlayer].remainingBalls;

      if (currentPlayer === 0) {
        newState.gameState.currentPlayer++;
        newState.rounds[roundIndex].push(newRoundSet);
      } else {
        newState.gameState.currentPlayer--;
        newState.gameState.currentRound++;
        newState.rounds.push([newRoundSet]);
      }
      break;

    case updateGameSheet.incrementFouls:
      newState.rounds[roundIndex][currentPlayer].fouls++;
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
