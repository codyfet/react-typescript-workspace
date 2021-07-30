# react-workspace

Простой воркспейс для старта разработки реакт приложения.

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
'start': 'webpack serve --mode development --open --hot'
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

Меняем .babelrc, добавляем пресеты в настройки

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

UPDATE#2: Для того, чтобы в es6 классах можно было писать методы через стрелочные функции необходимо установить плагин для бабеля

```shell
npm install --save-dev babel-plugin-transform-class-properties
```

И обновить файл с настройками .babelrc

```js
{
    'presets': [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    'plugins': ['transform-class-properties']
}
```

После того, как эти шаги были выполнены, необходимо выполнить команду

```shell
npm run start
```

### Устанавливаем typescript

```shell
npm install --save-dev typescript
```

Устанавливаем тайпинги для react и react-dom

```shell
npm install --save-dev @types/react @types/react-dom
```

Создаем файл tsconfig.json, в котором будет лежать конфигурация typescript

```js
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src"]
}
```

Устанавливаем пресеты для бабеля для typescript

```shell
npm install --save-dev @babel/preset-typescript
```

Устанавливаем пресеты для бабеля для поддержки async/await синтаксиса

```shell
npm install --save-dev @babel/plugin-transform-runtime @babel/runtime
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

Меняем содержимое файла index.js на typescript код

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

Меняем расширение файла index.js на .tsx

Меняем содержимое webpack.config.js на

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
