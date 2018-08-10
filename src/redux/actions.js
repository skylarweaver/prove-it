import { sessionService } from 'redux-react-session';

/*
 * action types
 */

export const SET_LAST_SEARCH = 'SET_LAST_SEARCH';
export const SET_NOTIFICATION_COUNT = 'SET_NOTIFICATION_COUNT';

/*
 * action creators
 */

export function setLastSearch(ssnLastSearched, queryStringLastSearched) {
  return {
    type: SET_LAST_SEARCH,
    ssnLastSearched,
    queryStringLastSearched,
  };
}

export function setNotificationCount(notificationCount) {
  return {
    type: SET_NOTIFICATION_COUNT,
    notificationCount,
  };
}

/*
 * Redux-react-session actions
 */

// This action is in a unique format based on redux-react-session
export function loginSucceeded(role, agency, agencyId, jwt, hashOfSsn) {
  return () => {
    return sessionService.saveSession({ jwt }).then(() => {
      sessionService.saveUser({ role, agency, agencyId, jwt, hashOfSsn }).then(() => {
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  };
}

export function logout(history) {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push('/login');
  };
}

