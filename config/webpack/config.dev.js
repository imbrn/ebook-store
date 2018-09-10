const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const rootPath = process.cwd();
const distPath = path.join(rootPath, "dist");

module.exports = {
  mode: "development",
  context: rootPath,
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: require("./babel.config.dev")
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(distPath, { allowExternal: true }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  serve: {
    port: 3000
  }
};
