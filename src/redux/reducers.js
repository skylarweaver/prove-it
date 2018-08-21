import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { drizzleReducers } from 'drizzle';

const INITIAL_STATE = {
  isSubmitProofDialogOpen: false,
};

const submitProofReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SUBMIT_PROOF_DIALOG_OPEN':
      return {
        ...state,
        isSubmitProofDialogOpen: action.payload,
      };
    default:
      return state;
  }
};

// const setNotificationCountReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'SET_NOTIFICATION_COUNT':
//       return {
//         ...state,
//         notificationCount: action.notificationCount,
//       };
//     default:
//       return state;
//   }
// };

// Add the sessionReducer
const rootReducer = combineReducers({
  session: sessionReducer,
  submitProofReducer,
  ...drizzleReducers,
});

export default rootReducer;
