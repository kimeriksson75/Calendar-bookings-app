import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'
import App from './components/App';

const store = createStore(reducers,
  compose(
    applyMiddleware(thunk), composeWithDevTools())
);
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#root')
);
