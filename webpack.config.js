const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);

  return merge(
    {
      mode,
      entry: "./src/index",
      devServer: {
        open: true,
        hot: true,
      },
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
      },
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
          src: path.resolve(__dirname, "src/"),
        },
      },
      module: {
        rules: [
          {
            test: /\.(j|t)s(x)?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            test: /\.jpe?g|png$/,
            exclude: /node_modules/,
            use: ["url-loader", "file-loader"],
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: "svg-url-loader",
                options: {
                  limit: 10000,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin(),
      ],
    },
    modeConfiguration(mode)
  );
};
