import {authActions} from './actionTypes';
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
    authAPI.register(data, function(success, data, error) {
      if (success) {
        dispatch({type: authActions.LOGGED_IN, data});
        successCB(data);
      } else if (error) errorCB(error);
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
    authAPI.createUser(user, function(success, data, error) {
      if (success) {
        dispatch({type: authActions.LOGGED_IN, data: user});
        successCB();
      } else if (error) errorCB(error);
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
        if (data.exists) dispatch({type: authActions.LOGGED_IN, data: data.user});
        successCB(data);
      } else if (error) errorCB(error);
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
  return (dispatch) => {
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
        dispatch({type: authActions.LOGGED_OUT});
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
 * @param  {function} callback
 * @return {function}
 */
export function checkLoginStatus(callback) {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      let isLoggedIn = (user !== null);

      if (isLoggedIn) {
        authAPI.getUser(user, function(success, {exists, user}, error) {
          if (success) {
            dispatch({type: authActions.LOGGED_IN, data: user});
            // TODO: Show a completeProfile Scene to new users ... use the code below for shifting
            // if (data.exists) dispatch({type: authActions.LOGGED_IN, data: data.user});
            // callback(exists, isLoggedIn);
          } else if (error) {
            // unable to get user
            dispatch({type: authActions.LOGGED_OUT});
            callback(false, false);
          }
        });
      } else {
        dispatch({type: authActions.LOGGED_OUT});
        if (callback) callback(false, isLoggedIn);
      }
    });
  };
}

/**
 * sign a user in with facebook action for redux
 *
 * @param  {string}   fbToken
 * @param  {function} successCB
 * @param  {function} errorCB
 * @return {function}
 */
export function signInWithFacebook(fbToken, successCB, errorCB) {
  return (dispatch) => {
    authAPI.signInWithFacebook(fbToken, function(success, data, error) {
      if (success) {
        dispatch({type: authActions.LOGGED_IN, data: data.user});
        // TODO: Show a completeProfile Scene to new users ... use the code below for shifting
        // if (data.exists) dispatch({type: authActions.LOGGED_IN, data: data.user});
        // successCB(data);
      } else if (error) errorCB(error);
    });
  };
}
