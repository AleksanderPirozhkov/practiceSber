import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  ...compat.extends({
    lintOnSave: false,
  })
  // ...compat.config({
  //   extends: ['airbnb', 'airbnb/hooks'],
  //   rules: {
  //     'react/jsx-filename-extension': 0,
  //     'react/react-in-jsx-scope': 0,
  //     'react/jsx-uses-react': 0,
  //     'import/no-named-as-default': 0,
  //     'import/no-named-as-default-member': 0,
  //     'linebreak-style': ['error', 'windows'],
  //   },
  //   env: {
  //     browser: true,
  //     node: true,
  //   },
  // }),
  // {
  //   files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //       },
  //     },
  //   },
  // },
];
