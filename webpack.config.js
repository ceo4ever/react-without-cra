const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    mode: webpackEnv,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "static/js/[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          use: "babel-loader",
          include: path.resolve(__dirname, "src"),
        },
        {
          loader: "file-loader",
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            outputPath: "static/media",
            name: "[name].[hash:8].[ext]",
            esModule: false,
          },
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    devServer: {
      port: 3000,
      contentBase: path.join(__dirname, "public"),
      open: true,
      historyApiFallback: true,
      overlay: false,
    },
  };
};
