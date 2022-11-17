const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

__webpack_base_uri__ = 'http://localhost:8081';

module.exports = {
  entry: {
    main: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: 'img/[name].[hash:8][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx|ts?$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new htmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        favicon: "./public/favicon.ico",
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      'vue': '@vue/runtime-dom',
      '@':  path.resolve('src'),
      '~': path.resolve('src')
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8081,
  },
};