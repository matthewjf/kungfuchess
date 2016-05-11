module.exports = {
  context: __dirname,
  entry: "./js/kungfuchess.js",
  output: {
    path: "./",
    publicPath: "/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
