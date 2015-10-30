import ReactRouterSSR from 'react-router-ssr';

require('./app-methods');
require('./app-subscriptions');

// Do server-rendering only in production mode
if (process.env.NODE_ENV === 'production') {
  // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(JSON.parse(Assets.getText('webpack.stats.json')));

  require('../client/routes');
}
