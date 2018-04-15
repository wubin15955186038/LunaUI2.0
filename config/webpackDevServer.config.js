'use strict';

const config = require('./webpack.config.dev');
const path = require('path');
const paths = require('./paths');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = (proxy, allowedHost) {
    return {
        compress: true,
        disableHostCheck: !proxy || process.env.DISABLE_HOST_CHECK === 'true',
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        contentBase: path.appPublic,
        watchContentBase: true,
        watchOption: {
            ignored: /node_modules/
        },
        publicPath: config.output.publicPath,
        // WebpackDevServer is noisy by default so we emit custom message instead
        // by listening to the compiler events with `compiler.plugin` calls above.
        quiet: true,
        hot: true,

        https: protocol === 'https',
        host: host,
        overlay: false,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            disableDotRule: true
        },
        public: allowedHost,
        proxy,
        before(app) {
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        }
    }
}