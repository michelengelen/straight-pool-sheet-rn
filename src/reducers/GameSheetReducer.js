import {updateGameSheet} from 'Actions/actionTypes';

import {
  buildCurrentScoreText,
  updateObjectsInArray,
  updateObjectInArray,
  updateNestedArray,
  insertItem,
} from './stateHelpers';
import {INITIAL_STATE, roundTemplate} from './initialStates';

const GameSheetReducer = (state = {...INITIAL_STATE.GameSheet}, action) => {
  const {payload} = action;

  // Define values that get used later on
  const {rounds} = state;
  const {
    currentRound,
    currentRoundIndex,
    currentPlayerIndex,
  } = state.gameState;
  const currentPlayer = state.players[currentPlayerIndex];
  const currentRoundSet = rounds[currentRoundIndex][currentPlayerIndex];
  let winner = -1;

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
        maxPoints: payload.maxPoints,
        maxRounds: payload.maxRounds,
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

      if (newTotalScore >= state.maxPoints) {
        winner = currentPlayerIndex;
      }

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
        gameState: {
          ...state.gameState,
          winner: winner,
        },
      };

    case updateGameSheet.incrementCurrentScore:
      winner = -1;
      let incrementScoreRoundSet = {
        score: currentRoundSet.score + 1,
        totalScore: currentRoundSet.totalScore + 1,
        remainingBalls: currentRoundSet.remainingBalls - 1,
        breaks: [...currentRoundSet.breaks],
      };

      if (incrementScoreRoundSet.remainingBalls < 2) {
        incrementScoreRoundSet.breaks.push(
          incrementScoreRoundSet.score <= 13
            ? incrementScoreRoundSet.score
            : '*'
        );
        incrementScoreRoundSet.score = 0;
        incrementScoreRoundSet.remainingBalls = 15;
      }

      incrementScoreRoundSet.currentScore = buildCurrentScoreText(
        incrementScoreRoundSet.score,
        incrementScoreRoundSet.breaks
      );

      const incrementScoreObject = {
        index: currentRoundIndex,
        item: updateObjectInArray(
          state.rounds[currentRoundIndex],
          {
            index: currentPlayerIndex,
            item: incrementScoreRoundSet,
          }
        ),
      };

      return {
        ...state,
        rounds: updateNestedArray(rounds, incrementScoreObject),
        gameState: {
          ...state.gameState,
          winner: winner,
        },
      };

    case updateGameSheet.completeBook:
      winner = -1;
      const {remainingBalls, score, totalScore} = currentRoundSet;
      const scoreAddition = remainingBalls + score -1;
      const breakAddition =
        scoreAddition === 14 ? '*' : scoreAddition;

      let completeBookRoundSet = {
        score: 0,
        totalScore: totalScore + remainingBalls - 1,
        remainingBalls: 15,
        breaks: [...currentRoundSet.breaks, breakAddition],
      };

      completeBookRoundSet.currentScore = buildCurrentScoreText(
        completeBookRoundSet.score,
        completeBookRoundSet.breaks
      );

      const updateScoreObject = {
        index: currentRoundIndex,
        item: updateObjectInArray(
          state.rounds[currentRoundIndex],
          {
            index: currentPlayerIndex,
            item: completeBookRoundSet,
          }
        ),
      };

      return {
        ...state,
        rounds: updateNestedArray(rounds, updateScoreObject),
        gameState: {
          ...state.gameState,
          winner: winner,
        },
      };

    case updateGameSheet.switchPlayer:
      if (currentPlayerIndex === 1 && currentRound === state.maxRounds) {
        winner =
          state.players[0].totalScore > state.players[1].totalScore ? 0 : 1;
      }

      const newRemainingBalls =
      newRoundSet.remainingBalls =
        rounds[currentRoundIndex][currentPlayerIndex].remainingBalls;

      if (currentPlayerIndex === 0) {
        const updateSwitchObject = {
          index: currentRoundIndex,
          item: insertItem(
            rounds[currentRoundIndex],
            {
              index: currentPlayerIndex + 1,
              item: newRoundSet,
            }
          ),
        };

        return {
          ...state,
          gameState: {
            ...state.gameState,
            currentPlayerIndex: 1,
            remainingBalls: newRemainingBalls,
          },
          rounds: updateNestedArray(rounds, updateSwitchObject),
        };
      }

      return {
        ...state,
        gameState: {
          ...state.gameState,
          currentPlayerIndex: 0,
          currentRound: currentRound + 1,
          currentRoundIndex: currentRoundIndex + 1,
          remainingBalls: remainingBalls,
          winner: winner,
        },
        rounds: insertItem(
          rounds,
          {
            index: currentRoundIndex + 1,
            item: [newRoundSet],
          }
        ),
      };

    case updateGameSheet.incrementFouls:
      const updateFoulsObject = {
        index: currentRoundIndex,
        item: updateObjectInArray(
          state.rounds[currentRoundIndex],
          {
            index: currentPlayerIndex,
            item: {
              ...currentRoundSet,
              fouls: currentRoundSet.fouls + 1,
              totalScore: currentRoundSet.totalScore - 1,
            },
          }
        ),
      };

      return {
        ...state,
        rounds: updateNestedArray(rounds, updateFoulsObject),
      };

    case updateGameSheet.clearGame:
      return {
        ...INITIAL_STATE.GameSheet,
      };

    default:
      return state;
  }
};

export const getGameState = (state) => ({
  gameSheet: state.gameSheet,
});

export default GameSheetReducer;
