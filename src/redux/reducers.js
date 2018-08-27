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

const setTabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SELECTED_TAB':
      return {
        ...state,
        selectedTab: action.payload,
      };
    default:
      return state;
  }
};

// Add the sessionReducer
const rootReducer = combineReducers({
  session: sessionReducer,
  submitProofReducer,
  setTabReducer,
  ...drizzleReducers,
});

export default rootReducer;
