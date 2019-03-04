import Dashboard from 'components/Dashboard';
import Log from 'components/Log';

var routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/',
  },
  {
    path: '/log',
    name: 'Log',
    icon: 'tim-icons icon-bell-55',
    component: Log,
    layout: '/home',
  }
];
export default routes;
