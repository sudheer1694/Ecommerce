import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// ESLint flat config for the project, tuned for React + Vite.
export default defineConfig([
  // Ignore build output.
  globalIgnores(['dist']),
  {
    // Lint JS/JSX files across the project.
    files: ['**/*.{js,jsx}'],
    // Base recommendations plus React Hooks and React Refresh rules.
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // Target modern JS but allow parsing of latest syntax.
      ecmaVersion: 2020,
      // Browser globals (window, document, etc.).
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Allow unused variables that are intentionally prefixed (common in React).
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
