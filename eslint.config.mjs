import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/", "eslint.config.mjs"],
  },
  {
    files: ["src/**/*.{ts,js,tsx,jsx}", "test/**/*.{ts,js,tsx,jsx}"],
    rules: {
      "unicorn/filename-case": "off",
      "import/prefer-default-export": "off",
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
      "no-console": "warn",
      "no-restricted-syntax": "off",
      "import/no-extraneous-dependencies": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-namespace": "off",
      "no-underscore-dangle": "off",
      "unicorn/prefer-export-from": "off",
      "spaced-comment": "off",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
