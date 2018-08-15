// Import React Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// Import Drizzle
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
// Import Redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { sessionService } from 'redux-react-session';
import rootReducer from './redux/reducers';
// Import Global Styles
import './styles/sass/sass.scss';
// Import Scenes
// import Home from './scenes/Home/Home';
// Import Services
import registerServiceWorker from './services/registerServiceWorker';
// Import contract
import ProofContract from './build/contracts/ProofContract.json';
// console.log(TutorialToken);
// const store = createStore(rootReducer);
const store = createStore(rootReducer, undefined, compose(applyMiddleware(thunkMiddleware)));
// Init the session service
sessionService.initSessionService(store);

const options = {
  // web3: {
  // block: false,
  // fallback: {
  // type: 'ws',
  // url: 'ws://127.0.0.1:754'5
  // }
  // },
  contracts: [
    ProofContract,
  ],
  // events: {}
};

ReactDOM.render(
  <DrizzleProvider options={options}>
    <LoadingContainer>
      <Provider store={store}>
        <BrowserRouter>
        <h1>Hi</h1>
        </BrowserRouter>
      </Provider>
    </LoadingContainer>
  </DrizzleProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
