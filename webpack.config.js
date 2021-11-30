const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);
  const isProduction = mode === "production";

  return {
    mode,
    entry: "./src/index.tsx",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          include: path.resolve(__dirname, "src"),
          use: [
            {
              loader: "ts-loader",
            },
          ],
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
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        src: path.resolve(__dirname, "src/"),
      },
    },
    devServer: {
      open: !isProduction,
    },
  };
};
