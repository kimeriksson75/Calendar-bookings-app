import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'
import App from './components/App';

const store = createStore(reducers,
  composeWithDevTools(
    applyMiddleware(thunk))
);
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#root')
);
