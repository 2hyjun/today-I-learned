# Cannot find a variable: Symbol..

# Problem
Error when building on `react native 0.57` and `mobx` in **Android**

# Environment

| OS                 | node   | React-Native | Xcode        |
| ------------------ | ------ | ------------ | ------------ |
| OSX Mojave 10.14.1 | 8.12.0 | 0.57.4       | 10.1 (10B61) |

# Solution

**run** `yarn add --dev jsc-android`
 
and add configurations on `android/app/build.gradle`
```gradle
// mobx fix
configurations.all {
    resolutionStrategy {
        force 'org.webkit:android-jsc:r225067'
    }
}
```

and add configurations on `android/build.gradle`
```gradle
maven {
    // ADDED THIS - Local Maven repo containing AARs with JSC library built for Android
    url "$rootDir/../node_modules/jsc-android/dist" 
}
```

