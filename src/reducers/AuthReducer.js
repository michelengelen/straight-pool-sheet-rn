import {AsyncStorage} from 'react-native';
import {authActionTypes} from 'actions/actionTypes';

let initialState = {
  useAccount: false,
  isLoggedIn: false,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGGED_IN:
      const user = action.data;

      // Save token and data to Asyncstorage
      AsyncStorage.multiSet([
        ['user', JSON.stringify(user)],
      ]);

      return {
        ...state,
        isLoggedIn: true,
        useAccount: true,
        user: user,
      };

    case authActionTypes.LOGGED_OUT:
      let keys = ['user'];
      AsyncStorage.multiRemove(keys);

      return {
        ...state,
        isLoggedIn: false,
        useAccount: false,
        user: null,
      };

    case authActionTypes.USE_ACCOUNT:
      return {
        ...state,
        useAccount: !state.useAccount,
      };

    default:
      return state;
  }
};

export const getAuth = (state) => ({
  authState: state.auth,
});

export default AuthReducer;
