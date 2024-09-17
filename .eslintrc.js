/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/index.js'],
  overrides: [
    {
      files: ['./src/**/*.{test,spec}.{ts,js,tsx,jsx}'],
      env: {
        jest: true,
      }
    }
  ]
}
