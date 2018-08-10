import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

const setLastSearchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LAST_SEARCH':
      return {
        ...state,
        ssnLastSearched: action.ssnLastSearched,
        queryStringLastSearched: action.queryStringLastSearched,
      };
    default:
      return state;
  }
};

const setNotificationCountReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_COUNT':
      return {
        ...state,
        notificationCount: action.notificationCount,
      };
    default:
      return state;
  }
};

// Add the sessionReducer
const rootReducer = combineReducers({
  session: sessionReducer,
  setLastSearchReducer,
  setNotificationCountReducer,
});

export default rootReducer;
