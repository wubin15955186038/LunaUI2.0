'use strict'

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
process.env.STATIC_ENV = 'development';

process.on('unhandledRejection', err => {
    throw err;
})

require('../config/env');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('../config/webpack.config.dev.js');
const createDevServerConfig = require('../config/webpackDevServer.config.js');
const {
    choosePort,
    createCompiler,
    prepareProxy,
    prepareUrls    
} = require('react-dev-utils/WebpackDevServerUtils');

