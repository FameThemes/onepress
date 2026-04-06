const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const { getWebpackEntryPoints } = require("@wordpress/scripts/utils");
const NODE_ENV = process.env.NODE_ENV || "development";
const RtlCssPlugin = require("rtlcss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const path = require("path");
const MergeIntoSingle = require("webpack-merge-and-include-globally");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * @see https://github.com/WordPress/wp-movies-demo/tree/main
 *
 * Production build does not run ESLint (no eslint-webpack-plugin in @wordpress/scripts).
 * Use `npm run lint:js` separately; admin bundle rules are relaxed in `.eslintrc.js`.
 */

const plugins = defaultConfig.plugins || [];

// console.log("defaultConfig", defaultConfig);

module.exports = (env, args) => {
  const isBuild = env?.WEBPACK_BUILD || false;
  let suffix = isBuild ? ".minified" : "";

  let entry = {
    [`frontend/theme${suffix}`]: "./src/frontend/index.js",
    [`frontend/gallery-isotope${suffix}`]:
      "./src/frontend/libs/gallery/isotope.js",
    [`frontend/gallery-justified${suffix}`]:
      "./src/frontend/libs/gallery/jquery.justified.js",
    [`frontend/gallery-carousel${suffix}`]:
      "./src/frontend/libs/gallery/owl.carousel.js",
    [`admin/editor${suffix}`]: "./src/frontend/styles/editor.scss",
    [`admin/customizer${suffix}`]: "./src/admin/customizer.js",
    [`admin/customizer-liveview${suffix}`]: "./src/admin/customizer-liveview.js",
    [`admin/admin${suffix}`]: "./src/admin/admin.js",
    [`frontend/lightgallery${suffix}`]: "./src/frontend/lightgallery.js",
  };

  return [
    {
      ...defaultConfig[0],
      entry,
      output: {
        ...defaultConfig[0].output,
        path: path.resolve(__dirname, "assets"),
        // filename: "build/[name].bundle.js",
        // assetModuleFilename: (pathData) => {
        //   const ext = path.extname(pathData.filename).toLowerCase();
        //   if ([".css"].includes(ext)) {
        //     return "css/[name][ext]";
        //   }
        //   if (
        //     [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(ext)
        //   ) {
        //     return "images/[name][ext]";
        //   }
        //   if ([".woff", ".woff2", ".ttf", ".otf", ".eot"].includes(ext)) {
        //     return "fonts/[name][ext]";
        //   }
        //   return "media/[name][ext]"; // Mặc định: PDF, mp4, webm, v.v.
        // },
      },
      plugins: [
        ...(defaultConfig[0].plugins || []),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "src/images"),
              to: "images",
              noErrorOnMissing: true,
            },
          ],
        }),
      ],
      optimization: undefined,
      devServer: undefined,
    },
  ];
};
