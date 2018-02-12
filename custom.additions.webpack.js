const webpackRenderer = require('electron-webpack/webpack.renderer.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path')

console.log(3333);
var webpackConfig = merge(webpackRenderer, {
    entry: {
        index: path.join(__dirname, '/src/renderer/index.js'),
        settings: path.join(__dirname, '/src/renderer/settings.js')
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index'],
        template: './common.ejs',
    }), new HtmlWebpackPlugin({
        filename: 'settings.html',
        chunks: ['settings'],
        template: './common.ejs',
    })],
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }]
    },
    resolve: {
        alias: {
            jquery: 'jQuery'
        }
    }
});
module.exports = webpackConfig;

