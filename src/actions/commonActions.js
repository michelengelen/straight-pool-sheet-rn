import {commonActionTypes} from './actionTypes';

/**
 * show the full-size LoadingIndicator
 *
 * @return  {function(*): *}
 */
export function appLoadingAction() {
  return (dispatch) => {
    dispatch({type: commonActionTypes.appLoading});
  };
}

/**
 * hide the full-size LoadingIndicator
 *
 * @param   {string} target
 * @return  {function(*): *}
 */
export function appReadyAction(target) {
  return (dispatch) => {
    dispatch({type: commonActionTypes.appReady, target});
  };
}

/**
 * set statur for app on-/offline
 *
 * @param   {bool} online
 * @return  {function(*): *}
 */
export function appNetworkStatus(online) {
  return (dispatch) => {
    dispatch({type: commonActionTypes.appNetworkStatus, online});
  };
}
