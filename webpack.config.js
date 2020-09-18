require("dotenv").config();
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appIndex = path.resolve(__dirname, "src", "index.js");
const appHtml = path.resolve(__dirname, "public", "index.html");
const appBuild = path.resolve(__dirname, "build");
const appPublic = path.resolve(__dirname, "public");
const appSrc = path.resolve(__dirname, "src");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

function getClientEnv(nodeEnv) {
  return {
    "process.env": JSON.stringify(
      Object.keys(process.env)
        .filter((key) => /^REACT_APP/i.test(key))
        .reduce(
          (env, key) => {
            env[key] = process.env[key];
            return env;
          },
          { NODE_ENV: nodeEnv }
        )
    ),
  };
}

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  const clientEnv = getClientEnv(webpackEnv);

  return {
    mode: webpackEnv,
    entry: appIndex,
    output: {
      path: appBuild,
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : isEnvDevelopment && "static/js/bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          use: "babel-loader",
          include: appSrc,
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "url-loader",
          options: {
            limit: 10000,
            outputPath: "static/media",
            name: "[name].[hash:8].[ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: appHtml }),
      new webpack.DefinePlugin(clientEnv),
    ],
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    devServer: {
      port: 3000,
      contentBase: appPublic,
      open: true,
      historyApiFallback: true,
      overlay: true,
    },
  };
};
