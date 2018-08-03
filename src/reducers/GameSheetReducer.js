import {updateGameSheet} from 'Actions/actionTypes';

import {buildCurrentScoreText, updateObjectsInArray} from './stateHelpers';
import {INITIAL_STATE, roundTemplate} from './initialStates';

const GameSheetReducer = (state = {...INITIAL_STATE.GameSheet}, action) => {
  const {payload} = action;
  let newState = {...state};

  // Define values that get used later on
  const {currentRound, currentPlayer} = state.gameState;
  const roundIndex = currentRound - 1;
  // case: updatePlayerScore
  let averageScoreFloat = 0;
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
      let highestScore = 0;
      let highestScoreIndex = 0;

      for (let i = 0; i < state.rounds.length; i++) {
        newTotalScore += state.rounds[i][currentPlayer].totalScore;

        if (state.rounds[i][currentPlayer].totalScore
            > newState.players[currentPlayer].highestScore) {
          highestScore = state.rounds[i][currentPlayer].totalScore;
          highestScoreIndex = i;
        }
      }
      newState.rounds[highestScoreIndex][currentPlayer].highestScore =
        false;

      // update the average score based on the totalScore and the played rounds
      averageScoreFloat =
        newState.players[currentPlayer].totalScore / currentRound;

      newState.players[currentPlayer].averageScore =
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
          newState.rounds[roundIndex][currentPlayer].score,
          newState.rounds[roundIndex][currentPlayer].breaks
        );

      if (newState.rounds[roundIndex][currentPlayer].totalScore
          >= state.maxPoints) {
        newState.gameState.winner = currentPlayer;
      }
      break;

    case updateGameSheet.switchPlayer:
      if (currentPlayer === 1 && currentRound === state.maxRounds) {
        newState.gameState.winner =
          state.players[0].totalScore > state.players[1].totalScore ? 0 : 1;
        break;
      }

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
      newState.rounds[roundIndex][currentPlayer].totalScore--;
      break;

    case updateGameSheet.clearGame:
      newState.rounds = [{
        ...newRoundSet,
      }];
      newState.players
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
