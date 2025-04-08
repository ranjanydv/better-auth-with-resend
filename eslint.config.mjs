import { dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/order
import { FlatCompat } from '@eslint/eslintrc';

// Import plugins directly
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        'next/core-web-vitals',
        'next/typescript',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ),
    {
        // Use the flat config format for plugins (object with named imports)
        plugins: {
            react: reactPlugin,
            'unused-imports': unusedImportsPlugin,
            import: importPlugin,
            '@typescript-eslint': typescriptPlugin,
            'jsx-a11y': jsxA11yPlugin,
            prettier: prettierPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // Next.js specific rules
            'react/no-unknown-property': 'off',

            // React-specific rules
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'react/self-closing-comp': 'warn',

            // JSX A11y rules
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/interactive-supports-focus': 'warn',
            'jsx-a11y/heading-has-content': 'warn',
            'jsx-a11y/anchor-has-content': 'warn',

            // Prettier rules
            'prettier/prettier': [
                'warn',
                {
                    printWidth: 150,
                    tabWidth: 4,
                    useTabs: false,
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'all',
                    bracketSpacing: true,
                    bracketSameLine: false,
                    arrowParens: 'always',
                    endOfLine: 'lf',
                },
            ],

            // Unused imports/variables
            'no-unused-vars': 'off',
            'unused-imports/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'after-used',
                    ignoreRestSiblings: false,
                    argsIgnorePattern: '^_.*?$',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',

            // Import ordering
            'import/order': [
                'warn',
                {
                    groups: ['type', 'builtin', 'object', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        {
                            pattern: '~/**',
                            group: 'external',
                            position: 'after',
                        },
                    ],
                    'newlines-between': 'always',
                },
            ],

            // JSX props ordering
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    noSortAlphabetically: false,
                    reservedFirst: true,
                },
            ],

            // Padding/formatting
            'padding-line-between-statements': [
                'warn',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            ],
        },
    },
];

export default eslintConfig;
