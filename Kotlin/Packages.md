# Packages

```kotlin
package foo.bar

fun baz() { ... }
class Goo { ... }

// ...
```

소스 파일의 모든 content(class, function...)는 선언된 package에 저장된다.
`baz()`의 fullname은 `foo.bar.baz`이다.

package가 선언되지 않으면, content는 이름이 없는 `default package`에 저장된다.

# Imports

`default imports`외에는 각 파일은 고유의 `import directives`를 갖는다.

```kotlin
import foo.Bar // Bar is now accessible without qualification
import foo.* // everything in 'foo' becomes accessible

// 중복되는 이름이 있을 경우 이름을 변경할 수 있다.
import foo.bar
import bar.Bar as bBar // bBar stands for 'bar.Bar'
```
