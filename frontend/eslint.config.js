import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Настройка для JavaScript-файлов, чтобы ESLint не пропускал их
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
  },
  // Базовая конфигурация TypeScript
  ...tseslint.configs.recommended,
  // Конфигурация для React, включает правила для хуков
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      // Отключение проверки 'React in scope' для React 17+ (новый JSX Transform)
      'react/react-in-jsx-scope': 'off',
      // Рекомендуемые правила для хуков
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Правило для быстрой перезагрузки (Hot Module Replacement)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        globals: globals.browser,
      },
    },
  },
  // Настройка для всех файлов, чтобы ESLint использовал TypeScript для разрешения импортов
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          // Укажите путь к файлу tsconfig.json, если он не находится в корне
          project: './tsconfig.json',
        },
      },
    },
  },
  // Интеграция Prettier
  // eslint-plugin-prettier включает правило, которое запускает Prettier как часть ESLint
  // eslint-config-prettier отключает все правила, которые конфликтуют с Prettier.
  // Плагин `eslint-plugin-prettier/recommended` делает это в один шаг.
  pluginPrettierRecommended,
);
