import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './assets/css/spinner.css';
import './assets/css/nucleo-icons.css';
import './assets/css/black-dashboard-react.css';

import fbConfig from './config/fbConfig';
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';

import AdminLayout from './layouts/Admin';
import Log from './components/Log';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig),
  ),
);

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/* <Redirect from="/" to="/dashboard" /> */}
        <Route exact path="/" render={props => <AdminLayout {...props} />} />
        <Route path="/log" render={props => <Log {...props} />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
