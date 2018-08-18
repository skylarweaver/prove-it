// Import React Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// Import Drizzle
import { generateContractsInitialState } from 'drizzle';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
// Import Redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { sessionService } from 'redux-react-session';
import rootReducer from './redux/reducers';
import sagas from './redux/sagas';
// Import Global Styles
import './styles/sass/sass.scss';
// Import Scenes
import Home from './scenes/Home/Home';
// Import Services
import registerServiceWorker from './services/registerServiceWorker';
// Import contract
import ProofContract from './build/contracts/ProofContract.json';
// Init Saga middleware and create store
const sagaMiddleware = createSagaMiddleware();
// Init Drizzle contracts
const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:754',
    },
  },
  contracts: [
    ProofContract,
  ],
  events: {},
};
const initialState = {
  contracts: generateContractsInitialState(drizzleOptions),
};
console.log(rootReducer);
const store = createStore(rootReducer, initialState, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);
// Init the session service
// sessionService.initSessionService(store);

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions} store={store}>
        <BrowserRouter>
        <Home/>
        </BrowserRouter>
  </DrizzleProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
