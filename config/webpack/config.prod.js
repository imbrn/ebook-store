const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const rootPath = process.cwd();
const distPath = path.join(rootPath, "dist");

module.exports = {
  mode: "production",
  context: rootPath,
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: distPath,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: require("./babel.config")
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: { path: "./config/webpack" }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(distPath, { allowExternal: true }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([{ from: "public", to: "public" }])
  ],
  serve: {
    port: 3000
  }
};
