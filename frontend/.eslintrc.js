module.exports = {
  globals: {
    server: true
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  plugins: ['ember', 'prettier'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  overrides: [
    // node files
    {
      files: [
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
}
