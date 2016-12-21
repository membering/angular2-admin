var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': helpers.root('src/polyfills.ts'),
        'vendor': helpers.root('src/vendor.ts'),
        'app': helpers.root('src/main.ts')
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        modules: [helpers.root('src'), helpers.root('node_modules'), helpers.root('bower_components')]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|ico)([\?]?.*)$/,
                loader: 'file?name=assets/images/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)([\?]?.*)$/,
                loader: 'file?name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css?sourceMap'])
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(['css','less'])
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css','sass?includePaths[]='+helpers.root('node_modules/compass-mixins/lib')])
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CopyWebpackPlugin([
            { from: helpers.root('src/assets/icon'), to: 'assets/icon' },
            { from: helpers.root('src/assets/img'), to: 'assets/img' },
            { from: helpers.root('src/assets/js'), to: 'assets/js' }
        ]),

        new HtmlWebpackPlugin({
            template: helpers.root('src/index.html')
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};