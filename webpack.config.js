module.exports = {
  context: __dirname,
  entry: "./js/judochess.js",
  output: {
    path: "./",
    publicPath: "/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
