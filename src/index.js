import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './assets/css/spinner.css';
import './assets/css/nucleo-icons.css';
import './assets/css/black-dashboard-react.css';

import registerServiceWorker from './registerServiceWorker';

import AdminLayout from './layouts/Admin';
import store from "./store";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/* <Redirect from="/" to="/dashboard" /> */}
        <Route exact path="/" render={props => <AdminLayout {...props} />} />
        {/* <Route path="/log" render={props => <Log {...props} />} /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
