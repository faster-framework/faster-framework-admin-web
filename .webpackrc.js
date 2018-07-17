const { resolve } = require('path');
const webpack = require('webpack');

let envConfig = {};
console.info(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    envConfig = require('./config/.webpackrc.prod.js')
} else {
    envConfig = require('./config/.webpackrc.dev.js')
}

const commonConfig = {
    resolve: {
        alias: {
            '@': resolve('src'),
            '@mock': resolve('mock'),
            '@common': resolve('src/common'),
            '@layouts': resolve('src/common/layouts'),
            '@modules': resolve('src/modules'),
            '@utils': resolve('src/common/utils'),
            '@redux': resolve('src/common/redux'),
            '@components': resolve('src/common/components')
        }
    }
};


module.exports = Object.assign({}, commonConfig, envConfig);