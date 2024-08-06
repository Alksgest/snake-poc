const bemClassnameRegex =
  /[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?/

module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  plugins: ['stylelint-order'],
  rules: {
    // SCSS specific
    // Consider refactoring, ex.
    // @extend .y-typography--regular;
    // becomes
    // @extend %y-typography--regular;
    'scss/at-extend-no-missing-placeholder': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/no-global-function-names': null,

    // Order plugin specific
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      {
        type: 'at-rule',
        name: 'include',
      },
      'rules',
      {
        type: 'at-rule',
        name: 'include',
        parameter: /mq-\w/,
      },
    ],

    // Stylelint built-in
    'alpha-value-notation': 'number',
    'color-function-notation': ['legacy', { ignore: ['with-var-inside'] }],
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-empty-line-before': null,
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
        ignoreFunctions: ['border-bottom'],
      },
    ],
    'no-descending-specificity': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'after-same-name',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless',
          'first-nested',
        ],
        ignoreAtRules: [
          'font-face',
          'mixin',
        ],
      },
    ],
    'selector-class-pattern': [
      bemClassnameRegex,
      {
        resolveNestedSelectors: true,
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['vertical', 'horizontal', 'global'],
      },
    ],
  },
}
