var path = require('path');
var autoprefixer = require('autoprefixer');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

var config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './app/main.js')],
    resolve: {
        alias: {
            'react': pathToReact
        }
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    module: {
        noParse: [pathToReact],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loaders:['style-loader','css-loader','postcss-loader']
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000&name=../img/[name].[ext]'
        }]
    },
     postcss:[autoprefixer({browsers:['last 2 versions']})]
};

module.exports = config;