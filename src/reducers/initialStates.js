const roundTemplate = {
  score: 0,
  fouls: 0,
  breaks: [],
  totalScore: 0,
  currentScore: 0,
  remainingBalls: 15,
};

const INITIAL_STATE = {
  GameSettings: {
    gameRunning: false,
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
        highestScoreIndex: -1,
        averageScore: parseFloat(0).toFixed(2),
      },
      {
        name: '',
        totalScore: 0,
        highestScore: 0,
        highestScoreIndex: -1,
        averageScore: parseFloat(0).toFixed(2),
      },
    ],
    rounds: [[
      {
        ...roundTemplate,
      },
    ]],
    gameState: {
      currentRound: 1,
      currentRoundIndex: 0,
      currentPlayerIndex: 0,
      remainingBalls: 15,
      winner: -1,
    },
    maxPoints: 100,
    maxRounds: 25,
    gameKey: '',
  },
};

export {INITIAL_STATE, roundTemplate};
