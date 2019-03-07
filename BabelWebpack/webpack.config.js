const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  target: "node",
  externals: [nodeExternals()],
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js"
  }
};
