const path = require('path');
const paths = require('./paths');
module.exports = {
    entry: [
        paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        filename: 'static/[name].js',
        publicPath: '/'
    }
}