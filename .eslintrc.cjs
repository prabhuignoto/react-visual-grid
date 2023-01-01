module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "prettier",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "sort-keys-fix",
    "simple-import-sort",
  ],
  rules: {
    "jsx-a11y/no-noninteractive-tabindex": "off",
    "react/jsx-sort-props": "warn",
    "react/prop-types": "off",
    "simple-import-sort/exports": "error",
    "sort-keys": "warn",
    "sort-keys-fix/sort-keys-fix": "warn",
    "sort-vars": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
