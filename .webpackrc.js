const { resolve } = require('path');
module.exports = {
    resolve: {
        alias: {
            '@': resolve('src'),
            '@pages': resolve('src/pages'),
            '@utils': resolve('src/utils'),
            '@redux': resolve('src/redux'),
            '@components': resolve('src/components')
        }
    }
};