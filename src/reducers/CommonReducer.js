import {commonActionTypes} from 'actions/actionTypes';

const INITIAL_STATE = {
  loading: true,
  online: false,
};

const CommonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commonActionTypes.appLoading:
      return {
        ...state,
        loading: true,
      };

    case commonActionTypes.appReady:
      return {
        ...state,
        loading: false,
      };

    case commonActionTypes.appNetworkStatus:
      return {
        ...state,
        online: action.online,
      };

    default:
      return state;
  }
};

export const getAppState = (state) => ({
  appState: state.appState,
});

export default CommonReducer;
