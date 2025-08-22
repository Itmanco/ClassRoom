// .eslintrc.cjs (or .eslintrc.js)
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    // This parser is crucial for handling Vue SFCs and modern JS syntax
    parser: '@babel/eslint-parser'
  },
  // Add this 'globals' section to tell ESLint about Canvas-injected variables
  globals: {
    __firebase_config: 'readonly',
    __initial_auth_token: 'readonly',
    __app_id: 'readonly'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Change 'no-unused-vars' to 'warn' to avoid compilation errors for unused imports
    'no-unused-vars': 'warn',
    // Keep this if you want single-word component names
    'vue/multi-word-component-names': 'off'
  }
};
