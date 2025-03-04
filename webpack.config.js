const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/scripts/webpackBundle.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        hot: true,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({ filename: "styles.css" }),
    ],
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};