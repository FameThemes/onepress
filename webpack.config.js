const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const { getWebpackEntryPoints } = require("@wordpress/scripts/utils");
const NODE_ENV = process.env.NODE_ENV || "development";
const RtlCssPlugin = require("rtlcss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const path = require("path");
const MergeIntoSingle = require("webpack-merge-and-include-globally");

/**
 * @see https://github.com/WordPress/wp-movies-demo/tree/main
 */

const plugins = defaultConfig.plugins || [];

// console.log("defaultConfig", defaultConfig);

module.exports = (env, args) => {
  const isBuild = env?.WEBPACK_BUILD || false;
  let suffix = isBuild ? ".minified" : "";

  let entry = {
    [`frontend/theme${suffix}`]: "./src/frontend/index.js",
    [`frontend/gallery-isotope${suffix}`]: "./src/frontend/libs/gallery/isotope.js",
    [`frontend/gallery-justified${suffix}`]: "./src/frontend/libs/gallery/jquery.justified.js",
    [`frontend/gallery-carousel${suffix}`]: "./src/frontend/libs/gallery/owl.carousel.js",
  };

  return [
    {
      ...defaultConfig[0],
      entry,
      output: {
        ...defaultConfig[0].output,
        path: path.resolve(__dirname, "assets/build"),
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
      optimization: undefined,
      devServer: undefined,
      // plugins: [
      //   new MergeIntoSingle({
      //     files: {
      //       "./frontend/frontend.js": [
      //         "./src/frontend/libs/FitVids.js",
      //         "./src/frontend/libs/wow.js/wow.js",
              
      //         "./src/frontend/libs/Morphext/morphext.js",
      //         "./src/frontend/libs/jquery.backstretch/backstretch.js",
      //         "./src/frontend/libs/waypoints/index.js",
      //         "./src/frontend/libs/jquery.counterup.js",
      //         "./src/frontend/libs/imagesloaded.js",
      //         "./src/frontend/libs/lightgallery.js",
      //         "./src/frontend/libs/lightgallery-video.js",
      //         "./src/frontend/libs/jarallax.js",
      //         // "./src/frontend/libs/tether/index.js",
      //         // "./src/frontend/libs/bootstrap/bootstrap.js",
      //         "./src/frontend/inc/theme.js",
      //       ],
      //     },
      //   }),
      // ],
      // plugins: [
      //   ...plugins.filter(
      //     (plugin) => !(plugin instanceof MiniCssExtractPlugin)
      //   ),
      //   new MiniCssExtractPlugin({
      //     filename: "css/[name].css", // custom CSS folder
      //   }),
      // ],
    },
  ];
};
