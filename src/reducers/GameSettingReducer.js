const initialState = {
  players: {
    playerOne: {
      name: '',
    },
    playerTwo: {
      name: '',
    },
  },
};

const GameSettingReducer = (state = initialState, action) => {
  const {payload} = action;
  let newState = {...state};

  switch (action.type) {
    case 'update_player':
      newState.players[payload.key].name = payload.name;
      return newState;
    default:
      return state;
  }
};

export default GameSettingReducer;
