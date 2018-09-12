import {commonActions} from 'actions/actionTypes';

const INITIAL_STATE = {
  loading: true,
  gameRunning: false,
};

const CommonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commonActions.appLoading:
      return {
        ...state,
        loading: true,
      };

    case commonActions.appReady:
      return {
        ...state,
        loading: false,
      };

    case commonActions.setRunningGame:
      return {
        ...state,
        gameRunning: !state.gameRunning,
      };

    default:
      return state;
  }
};

export const getAppState = (state) => ({
  appState: state.appState,
});

export default CommonReducer;
