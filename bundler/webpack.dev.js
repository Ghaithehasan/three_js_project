const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        host: '0.0.0.0',
        port: 8080,
        static: {
            directory: path.join(__dirname, '../envs'), // المسار إلى المجلد الذي يحتوي على الصور
        },
    },
});