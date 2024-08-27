import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["build/", "eslint.config.mjs"],
  },
  {
    files: ["src/**/*.{ts,js,tsx,jsx}", "test/**/*.{ts,js,tsx,jsx}"],
    rules: {
      "unicorn/filename-case": "off",
      "import/prefer-default-export": "off",
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
      "no-console": "error",
      "no-restricted-syntax": "off",
      "no-duplicate-imports": "error",
      "import/no-extraneous-dependencies": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-namespace": "off",
      "no-underscore-dangle": "off",
      "spaced-comment": "off",
      "import/extensions": "off",
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": "off",
      "unicorn/no-anonymous-default-export": "off",
      "unicorn/prefer-string-replace-all": "off",
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
