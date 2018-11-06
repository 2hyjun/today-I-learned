# TypeScript and Mobx Boliler Plate

### 1. Install React-Native Project TypeScript Template

```bash
react-native init <ProjectName> --template typescript
cd <ProjectName>
node <ProjectName>/setup.js
```

---

### 2. Configure Typescript Compiler

**tsconfig.json**

```json
{
    "compilerOptions": {
        "allowJs": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "isolatedModules": true,
        "jsx": "react-native",
        "lib": ["es6"],
        "moduleResolution": "node",
        "noEmit": true,
        "strict": true,
        "target": "esnext",
        "experimentalDecorators": true
    },
    "include": ["src/**/*.ts", "src/**/*.tsx"],
    "exclude": ["node_modules"]
}
```

---

### 3. Configure `react-native-typescript-transformer`

```bash
yarn add --dev react-native-typescript-transformer
touch rn-cli.config.js
```

and add this to **rn-cli.config.js**

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

---

### 4. Install other dependencies

```bash
yarn add mobx mobx-react
yarn add --dev jsc-android @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-runtime
```

and add configurations on `android/build.gradle`

```groovy
maven {
    // ADDED THIS - Local Maven repo containing AARs with JSC library built for Android
    url "$rootDir/../node_modules/jsc-android/dist"
}
```

and add configurations on `android/app/build.gradle` on the **bottom**

```groovy
// mobx fix
configurations.all {
    resolutionStrategy {
        force 'org.webkit:android-jsc:r225067'
    }
}
```

### 5. Configure `Babel`

**.babelrc**

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

### 6. Configure TSLint

```bash
yarn add --dev tslint tslint-config-prettier tslint-config-standard tslint-react
```

and create **tslint.json** file

```json
{
    "defaultSeverity": "error",
    "extends": ["tslint:recommended", "tslint-config-standard", "tslint-react", "tslint-config-prettier"],
    "jsRules": {},
    "rules": {
        "object-literal-sort-keys": false,
        "ordered-imports": false,
        "jsx-no-lambda": false,
        "jsx-no-multiline-js": false,
        "jsx-wrap-multiline": false,
        "jsx-alignment": false,
        "jsx-curly-spacing": false,
        "member-ordering": false
    },
    "rulesDirectory": []
}
```
