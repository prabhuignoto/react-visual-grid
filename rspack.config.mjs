import autoprefixer from "autoprefixer";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import cssnano from "cssnano";
import path from "path";
import PostCSSPreset from "postcss-preset-env";
import { fileURLToPath } from "url";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import pkg from "./package.json" assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "dist");
const reportsPath = path.resolve(__dirname, "reports");

export default {
  builtins: {
    banner: [
      {
        banner: `
        ${pkg.name} v${pkg.version}
        ${pkg.description}
      
        (c) ${new Date().getFullYear()} Prabhu Murthy
        License: MIT
      
        https://github.com/prabhuignoto/react-visual-grid
        `,
      },
    ],
    copy: {
      patterns: [
        {
          from: "./README.md",
        },
      ],
    },
    minifyOptions: {
      dropConsole: true,
      passes: 2,
    },
    progress: true,
  },
  cache: true,
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
  mode: "production",
  module: {
    rules: [
      {
        include: [/src/],
        test: /\.scss$/,
        type: "css",
        use: [
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
  },
  output: {
    clean: true,
    cssFilename: `${pkg.name}.css`,
    filename: `${pkg.name}.js`,
    library: {
      type: "module",
    },
    path: distPath,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [distPath, reportsPath],
    }),
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
