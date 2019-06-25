const path = require("path");

module.exports = {
  entry: "./client/src/App.jsx",
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/client/dist",
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: [/\.db$/, /\.sql$/],
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      }
    ]
  }
};
