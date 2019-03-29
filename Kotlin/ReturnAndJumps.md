# Return and Jumps

`Kotlin`은 3가지 `jump` expression이 있다.

- `return`: 가장 가까운 둘러싸고있는 함수 혹은 익명함수에서 리턴
- `break`: 가장 가까운 둘라싸고있는 `loop`을 끝내기.
- `continue`: 가장 가까운 `loop`에서 다음 단계로 진행하기.

이 3가지 expression은 더 큰 expression(?)으로 사용될 수 있다.

```kotlin
val s = person.name ?: return
// ps. ?: => elvis operator, 그 앞 값이 null이면 실행됨.
```

# Break and Continue Labels

`Kotlin`에서 모든 expression은 `label`로 표시될 수 있다. `Label`은 식별자 뒤에 `@`을 붙이는 형태이다. (`abc@`)  
expression에 `label`을 붙이려면, expression 앞에 붙이면 된다.

```kotlin
loop@ for (in 1..100) {
  // ...
}
```

```kotlin
loop@ for (i in 1..100) {
    for (j in 1..100) {
        if (...) break@loop
    }
}
```

# Return at Labels

`kotlin`에서 함수들은 중첩될 수 있다. `Qualified` return은 바깥 함수에서 `return`된다.

```kotlin
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return // non-local return directly to the caller of foo()
        print(it)
    }
    println("this point is unreachable")
}
```

`lambda` expression을 labeling하고, `return@label`하면, 그 `lambda expression`에서 리턴한다.

```kotlin
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach lit@{
        if (it == 3) return@lit // local return to the caller of the lambda, i.e. the forEach loop
        print(it)
    }
    print(" done with explicit label")
}

// or

fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return@forEach // local return to the caller of the lambda, i.e. the forEach loop
        print(it)
    }
    print(" done with implicit label")
}
```

`Anonymous Function`에서 `return`은, 그 익명함수에서 리턴한다.

```kotlin
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach(fun(value: Int) {
        if (value == 3) return  // local return to the caller of the anonymous fun, i.e. the forEach loop
        print(value)
    })
    print(" done with anonymous function")
}
```
