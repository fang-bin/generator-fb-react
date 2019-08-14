const path = require('path');
const rules = require('./rule');
const plugins = require('./plugin');
const {
  publicPath,
  isPro,
  isDev,
} = require('./config.js');
const externals = isPro ? {
  react: 'react',
  'react-dom': 'react-dom',
} : {};

const webpackConfig = {
  context: path.resolve(__dirname, './'),
  devtool: false,
  mode: isPro ? 'production' : 'development',
  entry: '../src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'umd',
    publicPath,
  },
  devServer: {
    port: '8888',
    host: 'localhost',
    hot: true,
    open: true,
    publicPath: '/',
    contentBase: '..',
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@common': path.resolve(__dirname, '../src/common'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@page': path.resolve(__dirname, './src/page'),
    },
  },
  module: {
    rules,
  },
  plugins,
  externals,
};

module.exports = webpackConfig;