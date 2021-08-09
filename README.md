# react-typescript-workspace

Простой воркспейс для старта разработки клиентского реакт приложения с использованием тайпскрипт.

Чтобы воспользоваться готовым workspace необходимо склонировать проект и выполнить

```shell
npm install

npm run start
```

## Поэтапная настройка workspace с нуля

Если вы хотите построить воркспейс самостоятельно, проделав руками все шаги, следуйте инструкциям:

Создать пустую папку и в ней инициализировать npm проект

```shell
npm init -y
```

### Устанавливаем webpack

Установить webpack, webpack-cli

```shell
npm install --save-dev webpack webpack-cli
```

Создать пустой js файл, который будет служить точкой входа для webpack

```shell
mkdir src
cd src
touch index.js
```

Настроить в package.json скрипты для выполнения сборки (production, development)

```js
'scripts': {
  'dev': 'webpack --mode development',
  'build': 'webpack --mode production'
}
```

### Устанавливаем babel

Установить babel и пресеты

```shell
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

Создать .babelrc для настройки babel

```js
{
    'presets': [
        '@babel/preset-env'
    ]
}
```

### Настраиваем webpack

Создать webpack.config.js и добавить babel-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

Создать корневой index.html файл в папке src

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React Application</title>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

Установить html-webpack-plugin

```shell
npm install --save-dev html-webpack-plugin
```

Установить webpack-dev-server

```shell
npm install --save-dev webpack-dev-server
```

Изменить скрипт в package.json

```js
'dev': 'webpack --mode development',
'build': 'webpack --mode production',
'start': 'webpack serve --mode development --open'
```

### Настраиваем работу со стилями

Установить less и лоадеры для работы с css и less

```shell
npm install --save-dev style-loader css-loader less-loader less
```

Создать файл src/styles.less с содержимым

```css
body {
  background: white;
  text-align: center;

  span {
    font-size: 50px;
  }
}
```

Поменять webpack.config.js (настроить плагины и лоадеры)

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  /**
   * Секции entry и output в данном случае можно было бы опустить,
   * т.к. по умолчанию заданы именно такие настройки.
   */
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".less"],
  },
  plugins: [htmlPlugin],
};
```

### Устанавливаем react

Установить библиотеки react, react-dom

```shell
npm install --save react react-dom
```

Установить пресеты для babel для реакта

```shell
npm install --save-dev @babel/preset-react
```

Изменить .babelrc, добавить пресеты в настройки

```js
{
    'presets': [
        '@babel/preset-env',
        '@babel/preset-react'
    ]
}
```

Пример Hello world приложения на реакт. Содержимое файла src/index.js

```js
import React from "react";
import ReactDOM from "react-dom";

import "./styles";

class HelloWorld extends React.Component {
  render() {
    return <span>Hello, world!</span>;
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById("root"));
```

UPDATE#1: При написании реакт компонентов принято использовать расширение для файлов .jsx

- Переименуйте файл `index.js` --> `index.jsx`
- Измените в настройках entry в файле webpack.config.js значение `'./src/index.js'` --> `'./src/index.jsx'`
- Измените правило для babel-loader `test: /\.(js)$/` --> `test: /\.(js|jsx)$/`
- Добавьте в секцию resolve значение `['.js', '.css', '.less']` --> `['.js', '.jsx', '.css', '.less']`

После того, как эти шаги были выполнены, необходимо выполнить команду

```shell
npm run start
```

### Устанавливаем typescript

```shell
npm install --save-dev typescript
```

Установить тайпинги для react и react-dom

```shell
npm install --save-dev @types/react @types/react-dom
```

Создать файл tsconfig.json, в котором будет лежать конфигурация typescript. Для этого выполнить

```
npx tsc --init
```

В созданном файле `tsconfig.json` и переопределить опции:

```js
{
    "compilerOptions": {
...
        "jsx": "react",
        "outDir": "./dist",
        "rootDir": "./src"
...
    }
}
```

Установить пресеты для бабеля для typescript

```shell
npm install --save-dev @babel/preset-typescript
```

Установить пресеты для бабеля для поддержки es6 синтаксиса (в частности async/await)

```shell
npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime
```

Актуализируем файл с настройками бабеля

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}
```

Изменить содержимое файла index.jsx на typescript код

```js
import React from "react";
import ReactDOM from "react-dom";

const App = () => <h1>My React and TypeScript App!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Изменить расширение файла index.jsx на .tsx

Изменить содержимое webpack.config.js (entry, правило для babel-loader и extension)

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  /**
   * Секции entry и output в данном случае можно было бы опустить,
   * т.к. по умолчанию заданы именно такие настройки.
   */
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".less", ".ts", ".tsx"],
  },
  plugins: [htmlPlugin],
};
```

Установить ForkTsCheckerWebpackPlugin чтобы научить webpack отслеживать ошибки типизации

```
npm install --save-dev fork-ts-checker-webpack-plugin @types/fork-ts-checker-webpack-plugin
```

Обновить webpack.config.js, добавить плагин

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin();

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".less", ".ts", ".tsx"],
  },
  plugins: [htmlPlugin, forkTsCheckerWebpackPlugin],
};

```

### Устанавливаем eslint

```
npm install --save-dev eslint
```

Устанавливаем плагины с правилами для eslint для react и react-hooks

```
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks

```

Устанавливаем eslint парсер для typescript и плагин с парвилами для typescript

```
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin

```

Создаем файл с настройками для eslint и называем его .eslintrc

```js
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "rules": {
    "no-console": 2
  }
}
```

Добавляем в package.json новый скрипт для запуска eslint

```
    "eslint": "eslint src"
```

Устанавливаем eslint-webpack-plugin, который будет оповещать об ошибка eslint во время сборки webpack

```
npm install --save-dev eslint-webpack-plugin
```

Подключаем его в webpack.config.js

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const forkTsCheckerPlugin = new ForkTsCheckerWebpackPlugin({
  async: false,
});

const esLintPlugin = new ESLintPlugin({
  extensions: ["js", "jsx", "ts", "tsx"],
});

module.exports = {
  /**
   * Секции entry и output в данном случае можно было бы опустить,
   * т.к. по умолчанию заданы именно такие настройки.
   */
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".less", ".tsx"],
  },
  plugins: [htmlPlugin, forkTsCheckerPlugin, esLintPlugin],
};
```

Устанавливаем Prettier

```
npm install --save-dev prettier
```

Устанавливаем пакет eslint-config-prettier, который нужен чтобы избежать конфликты между eslint и prettier

```
npm install --save-dev eslint-config-prettier
```

Устанавливаем плагин с prettier-правилами для eslint (чтобы eslint воспринимал prettier правила как eslint правила)

```
npm install --save-dev eslint-plugin-prettier

```

Создаем файл с настройками prettier и называем его .prettierrc.json

```
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "arrowParens": "always",
  "max-len": ["error", 140, 2],
  "tabWidth": 4,
  "useTabs": false
}
```

Добавляем скрипт в package.json

```
"eslint:fix": "eslint src --fix"
```

Источники:
https://www.carlrippon.com/creating-react-app-with-typescript-eslint-with-webpack5/

https://blog.johnnyreilly.com/2019/07/13/typescript-and-eslint-meet-fork-ts-checker-webpack-plugin/
https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
