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

export default (state = initialState, action) => {
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
