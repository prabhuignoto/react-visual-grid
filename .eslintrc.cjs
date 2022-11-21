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
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "sort-keys-fix",
    "simple-import-sort",
  ],
  rules: {
    "react/prop-types": "off",
    "jsx-a11y/no-noninteractive-tabindex": "off",
    "react/jsx-sort-props": "warn",
    "sort-keys": "warn",
    "sort-vars": "warn",
    "sort-keys-fix/sort-keys-fix": "warn",
    "simple-import-sort/exports": "error",
  },
};
