# Adding TypeScript To React-Native

1. **Typescript** 모듈 설치
2. **[React Native Typescript Transformer](https://github.com/ds300/react-native-typescript-transformer)** 추가
3. Empty **TypeScript Config** 작성
4. Empty **React Native TypsScript Transformer config file** 작성
5. **[Types](https://github.com/DefinitelyTyped/DefinitelyTyped)** 추가

---------------
1. `yarn add --dev typescript`
2. `yarn add --dev react-native-typescript-transformer`
3. `yarn tsc --init --pretty --jsx react`
4. `touch rn-cli.config.js`
5. `yarn add --dev @types/react @types/react-native`

---

`tsconfig.json` 파일은 Typescript 컴파일러의 세팅을 관리.
3번 초기화 세팅에 추가로, 아래 세팅을 uncomment 해야함.

```javascript
{
  /* Search the config file for the following line and uncomment it. */
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
}
```

---

`rn-cli.config.js` 파일은 `React Native TypeScript Transformer`의 세팅을 관리.
아래 코드 추가 해야함.
```javascript
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
```
