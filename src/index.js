import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { reduxFirestore, getFirestore } from 'redux-firestore';
// import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import { Router, Switch, Route } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

import './assets/css/spinner.css';
import './assets/css/nucleo-icons.css';
import './assets/css/black-dashboard-react.css';

// import fbConfig from './config/fbConfig';
// import rootReducer from './reducers/rootReducer';
// import apiMiddleware from './actions/apiMiddleware';
import registerServiceWorker from './registerServiceWorker';

// import AdminLayout from './layouts/Admin';
import Dashboard from 'components/Dashboard';
import store from "./store";

// const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
