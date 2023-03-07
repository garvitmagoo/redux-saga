import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
//axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://rem.dbwebb.se/api'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

