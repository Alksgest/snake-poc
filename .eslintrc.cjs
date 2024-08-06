module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsConfigRootDir: __dirname,
    },
    plugins: ['react-refresh', 'import', 'prettier'],
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
    rules: {
        // typescript-eslint overrides.
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],

        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': ['error', {fixStyle: 'separate-type-imports'}],
        '@typescript-eslint/no-explicit-any': ['warn', {ignoreRestArgs: true}],
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/no-useless-template-literals': 'error',
        '@typescript-eslint/sort-type-constituents': 'error',

        // React plugin specific
        'react/display-name': 'off',
        'react/jsx-key': 'off',
        'react/jsx-sort-props': ['error', {reservedFirst: true, shorthandLast: true}],
        'react/no-unknown-property': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',

        'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],

        // Import plugin specific
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/newline-after-import': 'warn',
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
        'import/no-duplicates': ['error', {'prefer-inline': false}],
        'import/order': [
            'error',
            {
                alphabetize: {order: 'asc', caseInsensitive: true},
                distinctGroup: false,
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object'],
                'newlines-between': 'always',
                pathGroups: [
                    {
                        pattern: 'vitest',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@testing-library/**',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react*',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@azure/*',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: '@**',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: '*.{jpg,jpeg,png,svg,json}',
                        patternOptions: {matchBase: true},
                        group: 'index',
                        position: 'before',
                    },
                    {
                        pattern: '*.scss',
                        patternOptions: {matchBase: true},
                        group: 'index',
                        position: 'after',
                    },
                    {
                        pattern: '(../)+**',
                        group: 'parent',
                        position: 'before',
                    },
                    {
                        pattern: './**',
                        group: 'sibling',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: [],
                warnOnUnassignedImports: true,
            },
        ],
        'import/prefer-default-export': 'off',

        // ESLint built-in
        // TODO: Uncomment rule
        // "eol-last": ["error", "always"],
        'jsx-quotes': ['error', 'prefer-double'],
        'linebreak-style': ['error', 'unix'],
        'max-len': [
            'error',
            {
                code: 120,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                tabWidth: 2,
            },
        ],
        'no-console': ['error', {allow: ['error']}],
        'no-restricted-exports': 'off',
        'no-void': ['error', {allowAsStatement: true}],
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {consistent: true},
                ObjectPattern: {consistent: true},
                ImportDeclaration: {consistent: true},
                ExportDeclaration: {consistent: true},
            },
        ],
        'padding-line-between-statements': [
            'error',
            {blankLine: 'always', prev: '*', next: 'block'},
            {blankLine: 'always', prev: 'block', next: '*'},
            {blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
            {blankLine: 'always', prev: '*', next: ['const', 'let', 'var']},
            {blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
            {blankLine: 'always', prev: '*', next: 'class'},
            {blankLine: 'always', prev: 'class', next: '*'},
            {blankLine: 'always', prev: '*', next: 'for'},
            {blankLine: 'always', prev: 'for', next: '*'},
            {blankLine: 'always', prev: 'if', next: '*'},
            {blankLine: 'any', prev: 'if', next: 'if'},
            {blankLine: 'always', prev: '*', next: 'switch'},
            {blankLine: 'always', prev: 'switch', next: '*'},
            {blankLine: 'any', prev: '*', next: 'throw'},
            {blankLine: 'any', prev: 'throw', next: '*'},
            {blankLine: 'any', prev: '*', next: 'return'},
        ],
        'sort-imports': [
            'error',
            {
                ignoreCase: true,
                ignoreDeclarationSort: true, // Keep enabled to avoid conflict with import/order rule.
            },
        ],
    },
}
