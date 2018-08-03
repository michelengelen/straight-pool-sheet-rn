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
  GameSettings: {
    players: [
      {
        name: '',
      },
      {
        name: '',
      },
    ],
    maxPoints: 100,
    maxRounds: 25,
  },
  GameSheet: {
    players: [
      {
        name: '',
        totalScore: 0,
        highestScore: 0,
        highestScoreInRound: -1,
        averageScore: 0,
      },
      {
        name: '',
        totalScore: 0,
        highestScore: 0,
        highestScoreInRound: -1,
        averageScore: 0.00,
      },
    ],
    rounds: [[
      {
        ...roundTemplate,
      },
    ]],
    gameState: {
      currentRound: 1,
      currentPlayer: 0,
      remainingBalls: 15,
      winner: -1,
    },
    maxPoints: 10,
    maxRounds: 5,
  },
};

export {INITIAL_STATE, roundTemplate};
