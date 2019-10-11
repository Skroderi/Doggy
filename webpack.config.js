const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/main-[contenthash:4].js"
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    overlay: true,
    openPage: "http://localhost:8080",
    open: true,
    contentBase: path.join(__dirname, "src", "assets")
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      //   { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.(jpg|png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
          publicPath: "../images"
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "usage", corejs: "2.0.0" }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:4].css"
    }),
    new CopyPlugin([
      {
        from: "src/assets/images",
        to: "images"
      }
    ])
  ]
};
