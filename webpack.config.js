const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const forkTsCheckerPlugin = new ForkTsCheckerWebpackPlugin({
  async: false,
});

const esLintPlugin = new ESLintPlugin({
  extensions: ["js", "jsx", "ts", "tsx"],
});

module.exports = {
  /**
   * Секции entry и output в данном случае можно было бы опустить,
   * т.к. по умолчанию заданы именно такие настройки.
   */
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".less", ".tsx"],
  },
  plugins: [htmlPlugin, forkTsCheckerPlugin, esLintPlugin],
};
