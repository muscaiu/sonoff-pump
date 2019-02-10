import Dashboard from "components/Dashboard";
import HomeDashboard from "components/HomeDashboard";
// import Notifications from "views/Notifications";
// import UserProfile from "views/UserProfile.jsx";

var routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/"
  },
  {
    path: "/home",
    name: "HomeDashboard",
    icon: "tim-icons icon-bell-55",
    component: HomeDashboard,
    layout: "/home"
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin"
  // }
];
export default routes;
