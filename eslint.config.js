import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.tsx"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-sort-props": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [
      "**/*.d.ts",
      "./src/**/*.test.tsx",
      "./src/App.tsx",
      "./src/**/*.module.scss",
      "**/.*",
      "**/dist",
      "**/coverage",
      "examples",
    ],
  },
];
