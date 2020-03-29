const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
        }
      }
    ]
  },
  devServer: {
    proxy: {
      "/auth/sign-up": "http://localhost:3000",
      "/auth/log-in": "http://localhost:3000",
      "/auth/me": "http://localhost:3000"
    },
    historyApiFallback: true
  }
};
