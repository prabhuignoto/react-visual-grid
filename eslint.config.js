import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
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
      "**/app_dist",
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  // js.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      // parserOptions: {
      //   project: "./tsconfig.json",
      //   tsconfigRootDir: ".",
      // },
    },
    plugins: {
      react,
      // "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-sort-props": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
