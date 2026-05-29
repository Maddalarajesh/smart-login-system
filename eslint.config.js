export default [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      eqeqeq: "error",
      semi: ["error", "always"],
      "no-var": "error",
      prefer-const: "error",
      "no-unused-vars": "error",
      "no-console": "warn",
    },
  },
];
