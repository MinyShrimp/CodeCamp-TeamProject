const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: false,
        hot: true,
        compress: true,
        port: 8080,
        historyApiFallback: true,
        liveReload: true,
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: `.env`,
        }),
    ],
});
