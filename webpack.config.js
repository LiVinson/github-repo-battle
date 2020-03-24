const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./app/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      { test: /\.svg$/, use: "svg-inline-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }, //reverse order
      { test: /\.js$/, use: "babel-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "app/index.html" }) //creates html in dist based on app/index with link to js
    //new webpack.EnvironmentPlgin({"NODE_ENV": "production"}) - Not needed if mode set to production
  ],
  //If production parameter passed when build script in packag.json run, use prod mode. Otherwise use dev mode
  mode: "development", //If prod, auto sets environment, minifies removes comments
  devServer: {
    historyApiFallback: true
  }
}
