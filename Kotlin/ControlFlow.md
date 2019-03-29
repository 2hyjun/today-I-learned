# ControlFlow: if, when, for, while

# IF expression

`Kotlin`에서는 `if`는 expression이다. 즉, 값을 리턴한다. 그래서 `ternary operator`

```
condition ? expression1 : expression2
```

는 없고, if로 대체할 수 있다.

```kotlin
// Traditional usage
var max = a
if (a < b) max = b

// With else
var max: Int
if (a > b) {
    max = a
} else {
    max = b
}

// As expression
val max = if (a > b) a else b

fun max(a: Int, b: Int) =  if (a > b) {
        print("Choose A");
        a
    } else {
        print("choose B")
        b
    }
}

val max = if (a > b) {
    print("Choose a")
    a
} else {
    print("Choose b")
    b
}

```

`if`를 `statement`대신에 `expression`으로 사용하려면, `else` 블럭이 필요하다.

# When Expression

`When` 은 `Switch`를 대신한다.

```kotlin
when (x) {
    1 -> print("x == 1")
    2 -> print("x == 2")
    else -> { // Note the block
        print("x is neither 1 nor 2")
    }
}
```

`when`은 `if`처럼, `expression`, `statement`로 사용될 수 있다.  
`expression`으로 사용될때는, 만족된 branch의 값은 전체 expression(`when`)의 값이 된다.  
`statement`로 사용될때는, branch의 값은 무시된다.

```kotlin
fun switch(a: Int) = when (a) {
    in 0..1 -> 1000
    !in 0..1 -> 2000
    else -> throw IllegalStateException("FUCK")
}
```

```kotlin
// We can use arbitrary expressions (not only constants) as branch conditions
when (x) {
    parseInt(s) -> print("s encodes x")
    else -> print("s does not encode x")
}
```

```kotlin
// `is` or !`is`로 특정 타입인지 확인할 수도 있다.
fun hasPrefix(x: Any) = when(x) {
    is String -> x.startsWith("prefix")
    else -> false
}
```

인자가 전달되지 않으면, `if-elseif`를 대신할 수도 있다.

```kotlin
when {
    x.isOdd() -> print("x is odd")
    x.isEven() -> print("x is even")
    else -> print("x is funny")
}
```

# For Loops

```kotlin
for (item in collection) print(item)

for (item in collection) {
  print(item)
}
```

`for`은 `iterator`를 다음 방식으로 제공하는 모든 것에 사용가능하다.

- `member` 혹은 extension-function `iterator()`를 가지고, 리턴타입은
  - `member`혹은 extenion-function `next()`를 가지고,
  - `member`혹은 extenion-function `hasNext()`를 가져야 한다.

`range expression`을 사용할 수 있다.

```kotlin
for (i in 1..3) {
    println(i)
}
for (i in 6 downTo 0 step 2) {
    println(i)
}
```

`array`에 `for` loop를 돌고싶으면, `array.indicies`를 활용한다.

```kotlin
for (i in array.indices) {
    println(array[i])
}
```

혹은, `withIndex` 라이브러리 함수를 사용할 수도 있다.

```kotlin
for ((index, value) in array.withIndex()) {
    println("the element at $index is $value")
}
```

# 나머지

`while`, `do..while`, `break`, `continue`는 모두 traditional 하게 동작한다.
