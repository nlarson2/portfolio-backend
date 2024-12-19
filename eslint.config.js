const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const nodePlugin = require("eslint-plugin-node");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"], // Adjust patterns as needed
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      node: nodePlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...nodePlugin.configs.recommended.rules,
      "node/no-missing-import": "error",
      "node/no-deprecated-api": "off",
      "node/no-extraneous-require": "off",
    },
  },
];
