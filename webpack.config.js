const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/scripts/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
      publicPath: '/weather-app/',
   },
   mode: 'development',
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         },
         {
            test: /\.html$/,
            use: 'html-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            type: 'asset/resource',
            generator: {
               filename: 'images/[name][ext]',
            },
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
   ],
   devtool: 'eval-source-map',
   devServer: {
      watchFiles: ['src/index.html'],
      static: {
         directory: path.join(__dirname, 'public'),
      },
      port: 3000,
      open: true,
      hot: true,
   },
};
