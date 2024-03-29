var webpack = require('webpack');

var babelSettings = { stage: 0 };

if (process.env.NODE_ENV !== 'production') {
  babelSettings.plugins = ['react-transform'];
  babelSettings.extra = {
    'react-transform': {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      }]
      // redbox-react is breaking the line numbers :-(
      // you might want to disable it
    }
  };
}

module.exports = {
  entry: './entry',
  externals: {
    // Add global variables you would like to import
    'react': 'React',
    'react-router': 'ReactRouter',
    'react-router-ssr': 'ReactRouterSSR',
    'react-meteor-data': 'ReactMeteorData',
    'blaze-to-react': 'BlazeToReact'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8182' },
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: 'file' }
    ]
  }
};
