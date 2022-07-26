const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// BundleAnalyzer는 Bundle 최적화 용도로 보통 저는 사용합니다.

module.exports = {
    entry: `${path.resolve(__dirname, '../src')}/index.tsx`,
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/assets/img/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(otf|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/assets/fonts/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${path.resolve(__dirname, '../src/public')}/index.html`,
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '..src/'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
        },
    },
};
