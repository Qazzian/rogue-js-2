import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";


export default tseslint.config([
	{
		files: ["**/*.{ts,mts,cts,jsx,tsx}"],
		plugins: {
			js,
			tseslint,
			prettier: prettierPlugin,
		},
		languageOptions: {globals: globals.browser},
		extends: [
			pluginReact.configs.flat.recommended,
			prettierConfig,
			tseslint.configs.recommended,
		],
		rules: {
			"@/no-unused-vars": "warn",
			// "no-console": "warn",
			"semi": ["error", "always"],
			"quotes": ["error", "double"],
			"prettier/prettier": "error",
		},
	},
]);
