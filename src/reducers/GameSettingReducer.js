const initialState = {
  players: {
    playerOne: {
      name: ""
    },
    playerTwo: {
      name: ""
    }
  }
};

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case "update_player":
      let newState = { ...state };
      newState.players[payload.key].name = payload.name;
      return newState;
    default:
      return state;
  }
};
