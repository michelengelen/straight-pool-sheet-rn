import {commonActions} from 'Actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
};

const CommonReducer = (state = INITIAL_STATE, action) => {
  let newState = {...state};

  switch (action.type) {
    case commonActions.appLoading:
      newState.loading = !newState.loading;
      break;
    default:
      return state;
  }

  return newState;
};

export default CommonReducer;
