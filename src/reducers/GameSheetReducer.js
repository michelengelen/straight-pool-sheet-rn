import {updateGameSheet} from 'Actions/actionTypes';

import {
  buildCurrentScoreText,
  updateObjectsInArray,
  updateObjectInArray
} from './stateHelpers';
import {INITIAL_STATE, roundTemplate} from './initialStates';

const GameSheetReducer = (state = {...INITIAL_STATE.GameSheet}, action) => {
  const {payload} = action;
  let newState = {...state};

  // Define values that get used later on
  const {rounds} = state;
  const {
    currentRound,
    currentRoundIndex,
    currentPlayerIndex,
  } = state.gameState;
  const currentPlayer = state.players[currentPlayerIndex];
  const currentRoundSet = rounds[currentRoundIndex][currentPlayerIndex];

  // case: SwitchPlayer
  let newRoundSet = {
    ...roundTemplate,
    breaks: [],
  };

  switch (action.type) {
    case updateGameSheet.startGame:
      return {
        ...state,
        players: updateObjectsInArray(state.players, payload.players),
        // maxPoints: payload.maxPoints,
        // maxRounds: payload.maxRounds,
      };

    case updateGameSheet.updatePlayerScore:
      let newTotalScore = 0;
      let newHighestScore = 0;
      let newHighestScoreIndex = 0;
      // calculate the new totalsScore for the player

      for (let i = 0; i < rounds.length; i++) {
        newTotalScore += rounds[i][currentPlayerIndex].totalScore;
      }

      // check if the current score is higher than the past highestScore
      if (currentRoundSet.totalScore > currentPlayer.highestScore) {
        newHighestScoreIndex = currentRoundIndex;
      }

      // update the average score based on the totalScore and the played rounds
      const newAverageScore =
        parseFloat(Math.round(
          (newTotalScore / currentRound) * 100) / 100
        ).toFixed(2);

      const playerObject = {
        index: currentPlayerIndex,
        item: {
          ...currentPlayer,
          totalScore: newTotalScore,
          highestScore: newHighestScore,
          highestScoreIndex: newHighestScoreIndex,
          averageScore: newAverageScore,
        },
      };

      return {
        ...state,
        players: updateObjectInArray(state.players, playerObject),
      };

    case updateGameSheet.incrementCurrentScore:
      newState.rounds[currentRoundIndex][currentPlayerIndex].score++;
      newState.rounds[currentRoundIndex][currentPlayerIndex].totalScore++;
      newState.rounds[currentRoundIndex][currentPlayerIndex].remainingBalls--;

      if (newState.rounds[currentRoundIndex][currentPlayerIndex].remainingBalls < 2) {
        newState.rounds[currentRoundIndex][currentPlayerIndex].breaks.push(
          newState.rounds[currentRoundIndex][currentPlayerIndex].score < 14
            ? newState.rounds[currentRoundIndex][currentPlayerIndex].score
            : '*'
        );
        newState.rounds[currentRoundIndex][currentPlayerIndex].score = 0;
        newState.rounds[currentRoundIndex][currentPlayerIndex].remainingBalls = 15;
      }

      newState.rounds[currentRoundIndex][currentPlayerIndex].currentScore =
        buildCurrentScoreText(
          newState.rounds[currentRoundIndex][currentPlayerIndex].score,
          newState.rounds[currentRoundIndex][currentPlayerIndex].breaks
        );

      if (newState.rounds[currentRoundIndex][currentPlayerIndex].totalScore
          >= state.maxPoints) {
        newState.gameState.winner = currentPlayerIndex;
      }
      break;

    case updateGameSheet.switchPlayer:
      if (currentPlayerIndex === 1 && currentRound === state.maxRounds) {
        newState.gameState.winner =
          state.players[0].totalScore > state.players[1].totalScore ? 0 : 1;
        break;
      }

      newRoundSet.remainingBalls =
      newState.gameState.remainingBalls =
        rounds[currentRoundIndex][currentPlayerIndex].remainingBalls;

      if (currentPlayerIndex === 0) {
        newState.gameState.currentPlayerIndex++;
        newState.rounds[currentRoundIndex].push(newRoundSet);
      } else {
        newState.gameState.currentPlayerIndex--;
        newState.gameState.currentRound++;
        newState.rounds.push([newRoundSet]);
      }
      break;

    case updateGameSheet.incrementFouls:
      newState.rounds[currentRoundIndex][currentPlayerIndex].fouls++;
      newState.rounds[currentRoundIndex][currentPlayerIndex].totalScore--;
      break;

    case updateGameSheet.clearGame:
      newState.rounds = [{
        ...newRoundSet,
      }];
      if (payload) {
        newState.players[0].name = state.players[1].name;
        newState.players[1].name = state.players[0].name;
      }
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
