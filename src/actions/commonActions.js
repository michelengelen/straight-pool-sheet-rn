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
