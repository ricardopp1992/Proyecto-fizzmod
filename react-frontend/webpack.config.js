const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins = [new MiniCssExtractPlugin({filename: 'css/[name].css'})]

module.exports = {
    mode: 'production',
    entry: {
        home: path.resolve(__dirname, 'src/entry/index.js'),
        chat: path.resolve(__dirname, 'src/entry/chat.js'),
        denied: path.resolve(__dirname, 'src/entry/denied.js')
    },
    output: {
        path: path.resolve(__dirname, '../frontend/build'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options : {
                        presets : ["@babel/preset-env", '@babel/preset-react'],
                        plugins : ['transform-class-properties', '@babel/plugin-transform-async-to-generator']
                    }
                }
            },
            {
                test: /\.(jpg|jpeg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: '../images'
                    }
                }
            }
        ]
    },
    plugins
}