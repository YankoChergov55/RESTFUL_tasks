import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import js from '@eslint/js';

export default [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.jest,
				process: true,
				__dirname: true,
				__filename: true,
			},
		},
		plugins: {
			prettier: prettier,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					semi: true,
					trailingComma: 'es5',
					singleQuote: true,
					printWidth: 100,
					endOfLine: 'auto',
					bracketSpacing: true,
					arrowParens: 'always',
					proseWrap: 'preserve',
				},
			],
			'no-console': 'off',
			'no-unused-vars': 'off',
		},
	},
];
