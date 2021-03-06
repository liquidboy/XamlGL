const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: [ '.js' ] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                'bootstrap',
                'bootstrap/dist/css/bootstrap.css',
                'event-source-polyfill',
                'jquery',

                'clamp',
                'gl-mat4',
                'gl-vec3',
                'gl-geometry',
                'gl-shader',
                'gl-texture2d',
                'gl-now',
                'hash-string',
                'gl-buffer',
                'ndpack-image',
                'bunny',
                'vertices-bounding-box',
                'normals',
                'orbit-camera',
                'gl-camera-pos-from-view-matrix'
            ]
        },
        output: {
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    //const serverBundleConfig = merge(sharedConfig, {
    //    target: 'node',
    //    resolve: { mainFields: ['main'] },
    //    output: {
    //        path: path.join(__dirname, 'ClientApp', 'dist'),
    //        libraryTarget: 'commonjs2',
    //    },
    //    module: {
    //        rules: [ { test: /\.css(\?|$)/, use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize' ] } ]
    //    },
    //    entry: { vendor: ['aspnet-prerendering'] },
    //    plugins: [
    //        new webpack.DllPlugin({
    //            path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
    //            name: '[name]_[hash]'
    //        })
    //    ]
    //});

    //return [clientBundleConfig, serverBundleConfig];
    return [clientBundleConfig];
}
