import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore ,applyMiddleware} from 'redux';
import myReducer from './reducers/index'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import  mySaga from './sagas'

import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(myReducer,applyMiddleware(thunk,sagaMiddleware)
  // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
sagaMiddleware.run(mySaga)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
