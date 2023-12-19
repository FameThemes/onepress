const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { getWebpackEntryPoints } = require("@wordpress/scripts/utils");
const NODE_ENV = process.env.NODE_ENV || "development";
const RtlCssPlugin = require("rtlcss-webpack-plugin");
const glob = require("glob");
const path = require("path");

module.exports = [
  {
    ...defaultConfig,
    entry: {
      iconPicker: "./src/iconPicker.js",
    },
    output: {
      ...defaultConfig.output,
      path: path.resolve(__dirname, "./dist/"),
      publicPath: "auto",
    },

    plugins: [
      ...defaultConfig.plugins,
      new RtlCssPlugin({
        filename: "[name]-rtl.css",
      }),
    ],
  },

  // Default Wordpress Config.
  {
    ...defaultConfig,
    plugins: [
      ...defaultConfig.plugins,
      new RtlCssPlugin({
        filename: "[name]-rtl.css",
      }),
    ],
  },
];
