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
      "no-unused-vars": "error",
      prefer-const: "error",
      "no-console": "warn",
    },
  },
];
