import autoprefixer from "autoprefixer";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import cssnano from "cssnano";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import PostCSSPreset from "postcss-preset-env";
import TerserWebpackPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
// import MergeIntoSingleFilePlugin from "webpack-merge-and-include-globally";
import pkg from "./package.json" assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "dist");
const reportsPath = path.resolve(__dirname, "reports");

export default {
  cache: {
    type: "filesystem",
  },
  devtool: "source-map",
  entry: "./src/react-visual-grid.ts",
  experiments: {
    outputModule: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  externalsType: "module",
  ignoreWarnings: [
    {
      message: /export .* was not found in/,
    },
  ],
  mode: "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              configFile: false,
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-optional-chaining",
              ],
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
              experimentalWatchApi: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  PostCSSPreset({
                    browsers: "last 2 versions",
                  }),
                  cssnano({
                    preset: "default",
                  }),
                ],
                syntax: "postcss-scss",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  output: {
    clean: true,
    environment: {
      module: true,
    },
    filename: `${pkg.name}.js`,
    library: {
      type: "module",
    },
    path: distPath,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [distPath, reportsPath],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "README.md", to: distPath }],
    }),
    new MiniCssExtractPlugin({
      filename: `${pkg.name}.css`,
    }),
    // new MergeIntoSingleFilePlugin({
    //   files: {
    //     "react-visual-grid.d.ts": ["./src/react-visual-grid.ts"],
    //   },
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      generateStatsFile: true,
      logLevel: "warn",
      openAnalyzer: false,
      reportFilename: `${reportsPath}/bundle-analyzer-report.html`,
      statsFilename: `${reportsPath}/bundle-analyzer-stats.json`,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
