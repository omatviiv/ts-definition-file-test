const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = process.env.DEV_SERVER_PORT || 9005;

module.exports = {
  mode: 'development',
  entry: './demo/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './demo/dist'),
  },
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: /demo/,
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'component'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Shipa Components Demo',
      template: path.resolve(__dirname, 'demo/index.html'),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: './demo/dist',
    historyApiFallback: true,
    port: PORT,
  },
};
