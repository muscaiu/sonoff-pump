import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import routes from 'routes';

var ps;

class Admin extends React.Component {

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      if (navigator.platform.indexOf('Win') > -1) {
        let tables = document.querySelectorAll('.table-responsive');
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.layout === '/') {
        return (
          <Route
            path={route.path}
            component={route.component}
            key={key}
            // path={route.layout + route.path}
          />
        );
      }

      return null;
    });
  };

  render() {
    console.log(this.props);
    return (
      <div
        ref="mainPanel"
        data={'blue'}
      >
        <Switch>{this.getRoutes(routes)}</Switch>
      </div>
    );
  }
}

export default Admin;
