import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import viteConfig from "./vite.config.js";
import { defineConfig } from "eslint/config";

export const viteConfigObj = {
  resolve: {
      alias: {
          _: path.resolve(__dirname, "src")
      }
  },
};
// for using `eslint-plugin-import`
module.exports = {
  settings: {
      "import/resolver": {
          vite: {
              viteConfig: require("./vite.config").viteConfigObj, // named export of the Vite config object.
          }
      }
  }
}


// for using `eslint-plugin-import-x` resolver interface v3
const { createViteImportResolver } = require("eslint-import-resolver-vite");

module.exports = {
  settings: {
      "import-x/resolver-next": [
          createViteImportResolver({
              viteConfig: require("./vite.config").viteConfigObj, // named export of the Vite config object.
          })
      ]
  }
}
export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  rules, {
    'no-unused-vars': ['warn'],
    'qoutes': ['warn', 'single'],
    'semi': ['warn', 'always'],
  },
  // eslint.config.js
const { createViteImportResolver } = require("eslint-import-resolver-vite");

module.exports = [
  // ... other configs
  {
    settings: {
      "import-x/resolver-next": [ // Use "import-x/resolver-next" for eslint-plugin-import-x v3
        createViteImportResolver({
          // Optional configuration object
        })
      ]
    }
  }
];

  tseslint.configs.recommended,
  pluginReact.configs.recommended,
]);
