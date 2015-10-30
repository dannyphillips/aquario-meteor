import Admin from './Admin';
import Dashboard from './Dashboard';

export default {
  component: Admin,
  childRoutes: [
    { path: 'dashboard', component: Dashboard }
  ]
};
