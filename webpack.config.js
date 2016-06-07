var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './index.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './node_modules/bootstrap/dist/css/bootstrap.css', to: './bootstrap.css' }
        ])
    ],
    
    devServer: {
        contentBase: './dist'
    }
};