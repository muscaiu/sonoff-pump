import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'routes';

class Admin extends React.Component {

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
    return (
      <Switch>{this.getRoutes(routes)}</Switch>
    );
  }
}

export default Admin;
