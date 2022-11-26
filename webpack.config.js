const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env) => ({
  mode: "development",
  entry: "./client/index.tsx",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".ts", ".tsx"],
    fallback: {
      fs: false,
      path: false,
    },
  },

  devServer: {
    historyApiFallback: true,
    static: {
      publicPath: "/build",
      directory: path.resolve(__dirname, "build"),
    },
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      "/": "http://localhost:3000",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: path.resolve(__dirname, "./client/index.html"),
    }),
  ],
});
