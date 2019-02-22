import Dashboard from 'components/Dashboard';
import HomeDashboard from 'components/HomeDashboard';

var routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/',
  },
  {
    path: '/home',
    name: 'HomeDashboard',
    icon: 'tim-icons icon-bell-55',
    component: HomeDashboard,
    layout: '/home',
  }
];
export default routes;
