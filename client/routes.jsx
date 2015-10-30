import ReactRouterSSR from 'react-router-ssr';

ReactRouterSSR.Run({
  childRoutes: [
    require('./App'),
    require('./Admin')
  ]
});
