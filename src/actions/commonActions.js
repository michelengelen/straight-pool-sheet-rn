import {commonActions} from './actionTypes';

/**
 * show the full-size LoadingIndicator
 * @return {function(*): *}
 */
export function appLoadingAction() {
  return (dispatch) => {
    dispatch({type: commonActions.appLoading});
  };
}

/**
 * hide the full-size LoadingIndicator
 * @return {function(*): *}
 */
export function appReadyAction() {
  return (dispatch) => {
    dispatch({type: commonActions.appReady});
  };
}
