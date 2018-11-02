# Build input file cannot be found: ... 

# Problem
Error when building with `react-native run-ios`

# Environment

| OS | node | React-Native| Xcode|
|---|---|---|---|
| OSX Mojave 10.14.1 | 8.12.0 | 0.57.4 |10.1 (10B61) |

# Solution

run
```bash
$ cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
$ cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```