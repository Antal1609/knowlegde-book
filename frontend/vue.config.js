/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        'Popper': ['popper.js', 'default']
      }),
    ],
    optimization: {
      moduleIds: "hashed",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10,
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
  },
}
