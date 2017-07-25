module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'extends': ['plugin:vue-libs/recommended'],
    'parserOptions': {
        'ecmaVersion': 7,
        'ecmaFeatures': {
            'impliedStrict': true,
            'experimentalObjectRestSpread': true,
            'jsx': true // just in case?
        },
        'sourceType': 'module'
    },
    'globals': {
        'Tether': true,
        'Promise': true
    },
    'plugins': [
        'html', 'vue'
    ],
    'settings': {
        'html/html-extensions': [
            '.html',
            '.vue'
        ]
    },
    'rules': {
        'accessor-pairs': 'error',
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'array-callback-return': 'off',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'arrow-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'block-scoped-var': 'error',
        'block-spacing': [
            'error',
            'never'
        ],
        'brace-style': 'off',
        'callback-return': 'error',
        'class-methods-use-this': 'error',
        'comma-dangle': 'off',
        'comma-spacing': 'off',
        'comma-style': [
            'error',
            'last'
        ],
        'complexity': 'error',
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'consistent-return': 'off',
        'consistent-this': 'off',
        'curly': 'off',
        'default-case': 'off',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': 'error',
        'eol-last': 'off',
        'eqeqeq': 'off',
        'func-call-spacing': 'error',
        'func-name-matching': 'error',
        'func-names': [
            'error',
            'never'
        ],
        'func-style': 'error',
        'generator-star-spacing': 'error',
        'global-require': 'off',
        'guard-for-in': 'error',
        'handle-callback-err': 'error',
        'id-blacklist': 'error',
        'id-length': 'off',
        'id-match': 'error',
        'indent': 'off',
        'init-declarations': 'off',
        'jsx-quotes': 'off',
        'key-spacing': 'off',
        'keyword-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'line-comment-position': 'error',
        'linebreak-style': [
            'warn',
            'unix'
        ],
        'lines-around-comment': 'error',
        'lines-around-directive': 'error',
        'max-depth': 'error',
        'max-len': 'off',
        'max-nested-callbacks': 'error',
        'max-params': ['error', 4],
        'max-statements': 'off',
        'max-statements-per-line': 'off',
        'multiline-ternary': 'off',
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-after-var': 'off',
        'newline-before-return': 'off',
        'newline-per-chained-call': 'error',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-catch-shadow': 'error',
        'no-confusing-arrow': ['error', {'allowParens': true}],
        'no-continue': 'error',
        'no-div-regex': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'off',
        'no-extra-label': 'error',
        'no-extra-parens': 'off',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'error',
        'no-inner-declarations': [
            'error',
            'functions'
        ],
        'no-invalid-this': 'off',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-mixed-operators': [
            'error',
            {
                'allowSamePrecedence': true
            }
        ],
        'no-mixed-requires': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': 'off',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': 'error',
        'no-native-reassign': 'error',
        'no-negated-condition': 'error',
        'no-negated-in-lhs': 'error',
        'no-nested-ternary': 'off',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-require': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        'no-path-concat': 'error',
        'no-plusplus': 'off',
        'no-process-env': 'off',
        'no-process-exit': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-restricted-globals': 'error',
        'no-restricted-imports': 'error',
        'no-restricted-modules': 'error',
        'no-restricted-properties': 'error',
        'no-restricted-syntax': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow-restricted-names': 'error',
        'no-spaced-func': 'error',
        'no-sync': 'error',
        'no-tabs': 'off',
        'no-template-curly-in-string': 'error',
        'no-ternary': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'off',
        'no-undef-init': 'error',
        'no-undefined': 'warn',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unused-expressions': ['error', {'allowShortCircuit': true, 'allowTernary': true}],
        'no-use-before-define': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'off',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'off',
        'no-void': 'error',
        'no-warning-comments': 'error',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'object-curly-newline': 'off',
        'object-curly-spacing': 'off',
        'object-property-newline': [
            'error',
            {
                'allowMultiplePropertiesPerLine': true
            }
        ],
        'object-shorthand': 'error',
        'one-var': 'off',
        'one-var-declaration-per-line': 'error',
        'operator-assignment': 'error',
        'operator-linebreak': [
            'error',
            'after'
        ],
        'padded-blocks': 'off',
        'prefer-arrow-callback': 'off',
        'prefer-const': 'off',
        'prefer-numeric-literals': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-reflect': 'off',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'off',
        'quote-props': 'off',
        'quotes': 'off',
        'radix': [
            'error',
            'as-needed'
        ],
        'require-await': 'error',
        'rest-spread-spacing': 'error',
        'semi': [2, 'always'],
        'semi-spacing': 'off',
        'sort-imports': 'off',
        'sort-keys': 'off',
        'sort-vars': 'error',
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off',
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': 'off',
        'space-unary-ops': 'error',
        'spaced-comment': 'off',
        'strict': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'template-tag-spacing': 'error',
        'unicode-bom': [
            'error',
            'never'
        ],
        'valid-jsdoc': 'error',
        'vars-on-top': 'off',
        'wrap-iife': 'error',
        'wrap-regex': 'error',
        'yield-star-spacing': 'error',
        'yoda': [
            'error',
            'never'
        ]
    }
};
