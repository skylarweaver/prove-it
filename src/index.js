// Import React Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Import Redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { sessionService } from 'redux-react-session';
import rootReducer from './redux/reducers';
// Import Drizzle
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";
// Import Global Styles
import './styles/sass/sass.scss';
// Import Scenes
// import AuthComponent from './scenes/AuthComponent';
// Import Services
import registerServiceWorker from './services/registerServiceWorker';
// Import contract
// import TutorialToken from "./contracts/TutorialToken.json";
// console.log(TutorialToken);
// const store = createStore(rootReducer);
const store = createStore(rootReducer, undefined, compose(applyMiddleware(thunkMiddleware)));
// Init the session service
sessionService.initSessionService(store);

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545"
    }
  },
  contracts: [TutorialToken],
  events: {}
};

ReactDOM.render(
  <DrizzleProvider options={options}>
    <Provider store={store}>
      <BrowserRouter>
        <AuthComponent/>
      </BrowserRouter>
    </Provider>
  </DrizzleProvider>,
  document.getElementById('root'),
);
registerServiceWorker();

// ReactDOM.render(
//     <App />
//   document.getElementById("root")
// );
// registerServiceWorker();