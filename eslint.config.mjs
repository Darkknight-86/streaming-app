import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: [
      "**/tsconfig.json",
      "**/tsconfig.*.json",
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs",
      "*.config.ts",
      ".eslintrc",
      ".eslintrc.js",
      ".eslintrc.cjs",
      ".eslintrc.json",
      ".prettierrc",
      ".prettierrc.js",
      ".prettierrc.json"
    ]
  },
  {files: ["**/*.js"], languageOptions: {sourceType: "module"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];