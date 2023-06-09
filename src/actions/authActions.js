import {authActionTypes} from './actionTypes';
import {commonActions} from 'actions';
import {auth} from 'assets';
import {authAPI} from 'api';

/**
 * register action for redux
 *
 * @param  {object}    data
 * @param  {function}  successCB
 * @param  {function}  errorCB
 * @return {function}
 */
export function register(data, successCB, errorCB) {
  return (dispatch) => {
    dispatch(commonActions.appLoadingAction());
    authAPI.register(data, function(success, data, error) {
      if (success) {
        dispatch({type: authActionTypes.LOGGED_IN, data});
        successCB(data);
      } else if (error) {
        dispatch(commonActions.appReadyAction());
        errorCB(error);
      }
    });
  };
}

/**
 * createUser action for redux
 *
 * @param  {object} user
 * @param  {function} successCB
 * @param  {function} errorCB
 * @return {function}
 */
export function createUser(user, successCB, errorCB) {
  return (dispatch) => {
    dispatch(commonActions.appLoadingAction());
    authAPI.createUser(user, function(success, data, error) {
      if (success) {
        dispatch({type: authActionTypes.LOGGED_IN, data: user});
        dispatch(commonActions.appReadyAction());
        successCB();
      } else if (error) {
        dispatch(commonActions.appReadyAction());
        errorCB(error);
      }
    });
  };
}

/**
 * login user action for redux
 *
 * @param  {object}    data
 * @param  {function}  successCB
 * @param  {function}  errorCB
 * @return {function}
 */
export function login(data, successCB, errorCB) {
  return (dispatch) => {
    authAPI.login(data, function(success, data, error) {
      if (success) {
        if (data.exists) dispatch({type: authActionTypes.LOGGED_IN, data: data.user});
        successCB(data);
      } else if (error) {
        errorCB(error);
      }
    });
  };
}

/**
 * reset password action for redux
 *
 * @param  {object}    data
 * @param  {function}  successCB
 * @param  {function}  errorCB
 * @return {function}
 */
export function resetPassword(data, successCB, errorCB) {
  return () => {
    authAPI.resetPassword(data, function(success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error);
    });
  };
}

/**
 * sign out a user action for redux
 *
 * @param  {function} successCB
 * @param  {function} errorCB
 * @return {function}
 */
export function signOut(successCB, errorCB) {
  return (dispatch) => {
    authAPI.signOut(function(success, data, error) {
      if (success) {
        dispatch({type: authActionTypes.LOGGED_OUT});
        if (successCB) successCB();
      } else if (error) {
        if (errorCB) errorCB(error);
      }
    });
  };
}

/**
 * check if a user is logged in with firebase and updates the redux-store
 *
 * @param  {boolean} isConnected
 * @return {function}
 */
export function checkLoginStatus(isConnected) {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      let isLoggedIn = (user !== null);

      if (isLoggedIn && isConnected) {
        authAPI.getUser(user, function(success, {exists, user}, error) {
          if (success) {
            dispatch({type: authActionTypes.LOGGED_IN, data: user});
            dispatch(commonActions.appReadyAction());

            // TODO: Show a completeProfile Scene to new users ... use the code below for shifting
            // if (data.exists) dispatch({type: authActionTypes.LOGGED_IN, data: data.user});
            // callback(exists, isLoggedIn);
          } else if (error) {
            // unable to get user
            dispatch({type: authActionTypes.LOGGED_OUT});
            dispatch(commonActions.appReadyAction());
          }
        });
      } else if (isLoggedIn && !isConnected) {
        let handledUser = user;
        if (user.providerData[0].providerId.includes('facebook')) {
          handledUser = authAPI.extractDataFromFacebookUser(user)
        }
        // TODO: add showGeneralMessage function here (TBD)
        dispatch({type: authActionTypes.LOGGED_IN, data: handledUser});
        dispatch(commonActions.appReadyAction());
      } else {
        dispatch({type: authActionTypes.LOGGED_OUT});
        dispatch(commonActions.appReadyAction());
      }
    });
  };
}

/**
 * sign a user in with facebook action for redux
 *
 * @param  {string}   fbToken
 * @param  {function} successCB  returns a promise
 * @param  {function} errorCB
 * @return {function}
 */
export function signInWithFacebook(fbToken, successCB, errorCB) {
  return (dispatch) => {
    dispatch(commonActions.appLoadingAction());
    authAPI.signInWithFacebook(fbToken, function(success, data, error) {
      if (success) {
        dispatch({type: authActionTypes.LOGGED_IN, data: data.user});
        // TODO: Show a completeProfile Scene to new users ... use the code below for shifting
        // if (data.exists) dispatch({type: authActionTypes.LOGGED_IN, data: data.user});
        successCB('Profile').then(
          dispatch(commonActions.appReadyAction())
        );
      } else if (error) {
        errorCB(error);
      }
    });
  };
}

/**
 * use the logged in user as player in a new game (triggered by switch in GameSettings)
 *
 * @param {function} dispatch
 */
export function useAccount(dispatch) {
  dispatch({type: authActionTypes.USE_ACCOUNT});
}
