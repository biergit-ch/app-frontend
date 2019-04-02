const withOffline = moduleExists('next-offline') ?
    require('next-offline') : {};

const withTypescript = moduleExists('@zeit/next-typescript') ?
    require('@zeit/next-typescript') : {};

const {
    parsed: localEnv
} = require('dotenv').config()

const webpack = moduleExists('webpack') ?
    require('webpack') : {};

const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
    target: 'serverless',
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [{
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                expiration: {
                    maxEntries: 150,
                    maxAgeSeconds: 30 * 24 * 60 * 60
                },
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }]
    }
};

module.exports = moduleExists('next-offline') ? withOffline(withTypescript({
    webpack: (nextConfig) => {
        nextConfig.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return nextConfig;
    }
})) : nextConfig

function moduleExists(name) {
    try {
        return require.resolve(name);
    } catch (error) {
        return false;
    }
}