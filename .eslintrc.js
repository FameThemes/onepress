/**
 * ESLint for OnePress theme.
 * @wordpress/scripts `lint:js` only picks up `.eslintrc.js` (not `.eslintrc.cjs`).
 * Webpack production build does not run ESLint.
 */
module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	env: {
		browser: true,
		es2021: true,
		jquery: true,
	},
	globals: {
		C_Icon_Picker: 'readonly',
		Color: 'readonly',
		QTags: 'readonly',
		_: 'readonly',
		switchEditors: 'readonly',
		tinymce: 'readonly',
		tinyMCEPreInit: 'readonly',
		wp: 'readonly',
	},
	ignorePatterns: [
		'**/node_modules/**',
		'**/assets/**/*.js',
		'**/vendor/**',
	],
	overrides: [
		{
			files: [ 'src/admin/**/*.js', 'src/admin/**/*.jsx' ],
			globals: {
				ONEPRESS_CUSTOMIZER_DATA: 'readonly',
				_wpCustomizeSettings: 'readonly',
				_wpEditor: 'readonly',
				onepress_customizer_settings: 'readonly',
				quicktags: 'readonly',
				tinyMCE: 'readonly',
			},
			rules: {
				'@wordpress/no-unused-vars-before-return': 'off',
				'array-callback-return': 'off',
				'dot-notation': 'off',
				eqeqeq: 'off',
				'jsdoc/check-tag-names': 'off',
				'jsdoc/no-undefined-types': 'off',
				'jsdoc/require-param': 'off',
				'jsdoc/require-param-type': 'off',
				'no-alert': 'off',
				'no-cond-assign': 'off',
				'no-else-return': 'off',
				'no-implicit-globals': 'off',
				'no-lonely-if': 'off',
				'no-nested-ternary': 'off',
				'no-shadow': 'off',
				'no-undef': 'off',
				'no-unreachable': 'off',
				'no-unused-vars': 'off',
				'no-var': 'off',
				'object-shorthand': 'off',
				'prefer-const': 'off',
				camelcase: 'off',
				'prettier/prettier': 'off',
				'vars-on-top': 'off',
				'jsx-a11y/anchor-has-content': 'off',
				'jsx-a11y/anchor-is-valid': 'off',
				'jsx-a11y/label-has-associated-control': 'off',
				'react-hooks/exhaustive-deps': 'off',
			},
		},
	],
};
