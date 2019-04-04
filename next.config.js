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
    webpack: (nextConfig, options) => {
        nextConfig.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        nextConfig.module.rules.push({
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        });

        // nextConfig.exportPathMap = async function (defaultPathMap) {
        //     return {
        //         '/': {
        //             page: '/index'
        //         },
        //         '/about': {
        //             page: '/about'
        //         },
        //         '/profile': {
        //             page: '/profile-class'
        //         },
        //         '/g/12': {
        //             page: '/group',
        //             query: {
        //                 title: 'group 12'
        //             }
        //         }
        //     }
        // }

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