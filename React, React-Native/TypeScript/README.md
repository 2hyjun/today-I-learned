# Adding TypeScript To React-Native

1. **Typescript** 모듈 설치
2. **[React Native Typescript Transformer](https://github.com/ds300/react-native-typescript-transformer)** 추가
3. Empty **TypeScript Config** 작성
4. Empty **React Native TypsScript Transformer config file** 작성
5. **[Types](https://github.com/DefinitelyTyped/DefinitelyTyped)** 추가

---

# React Native Typescript Template

> `react-native init RNTypescript --template typescript` > `cd RNTypescript && node setup.js` > `yarn add --dev react-native-typescript-transformer`
> 이러면 기본 typescript dependency 설치해주고, tsconfig.json 까지 잡아줌.

`touch rn-cli.config.js` 하고,

```javascript
module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
  },
};
```

작성하여 tsconfig.json 추가.

# Babel Setup

```bash
yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-runtime
```

실행 한 후

`.babelrc` 수정

```json
{
  "presets": ["module:metro-react-native-babel-preset"],
  "sourceMaps": "inline",
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        "regenerator": false
      }
    ],
    "@babel/proposal-object-rest-spread"
  ]
}
```

# TSLint && prettier on vscode

### TSLint

https://medium.com/@sgroff04/configure-typescript-tslint-and-prettier-in-vs-code-for-react-native-development-7f31f0068d2

> `yarn add --dev tslint tslint-config-prettier tslint-config-standard tslint-react prettier`

`tslint-config-prettier`는 `tslint`와 `prettier`가 싸우지 않게함.

> `npx tslint --init`

`tslint.json` 파일 생성 후 **extends, rules** 설정

```json
{
    ...
    "extends": [
        "tslint:recommended",
        "tslint-config-standard",
        "tslint-react",
        "tslint-config-prettier"
    ],
    "rules": {
        "object-literal-sort-keys": false,
        "ordered-imports": false,
        "jsx-no-lambda": false,
        "jsx-no-multiline-js": false,
        "jsx-wrap-multiline": false,
        "jsx-alignment": false,
        "jsx-curly-spacing": false
    },
    ...
}
```

### Prettier

**VSCode**에 두 가지 설정.

```json
"editor.formatOnSave": true,
"javascript.format.enable": false
```
