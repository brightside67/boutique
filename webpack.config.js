let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let postcssWillChange = require('postcss-will-change');
let postcssAssets = require('postcss-assets');
let autoprefixer = require('autoprefixer');
let postcssPxtorem = require('postcss-pxtorem');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HashOutput = require('chunkhash-replace-webpack-plugin');
let path = require('path');

module.exports = {
  cache: true,
  devtool: 'source-map',
  entry: {
    bundle: ['./app/main.js', './app/main.sass'],
  },
  output: {
    path: path.resolve(__dirname, 'app/static'),
    filename: '[name].js',
    pathinfo: false,
  },
  resolve: {
    mainFiles: ['index'],
    alias: {
      app: path.resolve(__dirname, 'app'),
      component: path.resolve(__dirname, 'app/component'),
      lib: path.resolve(__dirname, 'app/lib'),
      asset: path.resolve(__dirname, 'app/asset'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.jext/,
        use: [
          {
            loader: 'jext-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader?limit=4096&name=static/img/[name].[ext]',
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=asset/fonts/[name].[ext]',
          },
        ],
      },
      {
        test: /\.(s?css|sass)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssWillChange(),
                  postcssAssets({ basePath: './app/static/img' }),
                  autoprefixer({
                    browsers: [
                      'last 2 versions',
                      'IE >= 9',
                      'opera 12',
                      'safari 7',
                      'Android >= 4',
                      'iOS >= 7',
                    ],
                  }),
                  postcssPxtorem(),
                ],
              },
            }, {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    // new HashOutput({
    //   src: 'app/main.html',
    //   dest: 'env/www/index.html'
    // }),
    // new CopyWebpackPlugin([
    //   { from: 'app/asset' }
    // ]),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),
  ],
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
  },
};
