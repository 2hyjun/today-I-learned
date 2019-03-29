# Kotlin Basic Syntax

# Basic Types

코틀린에서 모든 것은 `object`라서 모든 변수에 `member function`, `member properites`를 호출 할 수 있다.
몇몇 타입은 특별한 내부의 표현이 있다. (`numbers`, `characters`, `booleans`는 `runtime`에서 `primitive value`로 표현된다.) 하지만, 유저(개발자)에게는 평범한 클래스 처럼 보여진다.

`Kotlin`에서 사용되는 몇가지 `Basic Types`들을 보겠다.

## Numbers

`Kotlin`은 `java`와 비슷하게 숫자를 표현하지만, 동일하지는 않다. 예를 들어, 암시적인 `widening conversion`이 없고, `literals`가 미묘하게 다르다.

### Built-in types representing numbers (`Java`와 비슷함.)

| Type   | Bit width |
| ------ | --------- |
| Double | 64        |
| Float  | 32        |
| Long   | 64        |
| Int    | 32        |
| Short  | 16        |
| Byte   | 8         |

- 참고: `kotlin`에서 `characters`는 `numbers`와 완전히 다르다.

### Literal Constants

- Decimals: `123`
  - Longs는 대문자 `L`이 붙는다. : `123L`
- 16진수: `0x0F`
- 2진수: `0b00001011`
- Doubles by Default: `123.5`, `123.5e10`
- FLoat: `123.5f` or `123.5F`

### Underscore in numeric literals

가독성을 위하여, 숫자에 `underscore _`을 추가할 수 있다.

```kotlin
val oneMillion = 1_000_000
val creditCardNumber = 1234_5678_9012_3456L
val socialSecurityNumber = 999_99_9999L
val hexBytes = 0xFF_EC_DE_5E
val bytes = 0b11010010_01101001_10010100_10010010
```

### Representation

`Java Platform`에서 `nullable number reference`나, `generic`이 포함되지 않으면 `number`는 물리적으로 `JVM primitive types`로 저장된다.

**`Boxing` of numbers는 identity가 보존되지 않는다.**

```kotlin
val a: Int = 10000
println(a === a) // Prints 'true'
val boxedA: Int? = a
val anotherBoxedA: Int? = a
println(boxedA === anotherBoxedA) // !!!Prints 'false'!!!
```

- `===`: `identity equality`
- `==`: `structural equality`

### Explicit Conversions

다른 representations으로 인해, 더 작은 type은 더 큰 type의 `subtype`이 아니다.

```kotlin
// 가상의 코드로, 실제는 컴파일 되지 않는다.
val a: Int? = 1 // A boxed Int (java.lang.Integer)
val b: Long? = a // implicit conversion yields a boxed Long (java.lang.Long)
print(b == a) // Surprise! This prints "false" as Long's equals() checks whether the other is Long as well
```

`Explicit Conversions`에서 `equality`는 상실된다.
결과적으로, `smaller types`는 `bigger types`로 암시적으로 변환될 수 없다. (`Byte` 변수를 `Int`에 넣을 순 없다.)

대신에, 명시적으로 변환해줘야 한다.

```kotlin
val i: Int = b.toInt()
```

```
toByte(): Byte
toShort(): Short
toInt(): Int
toLong(): Long
toFloat(): Float
toDouble(): Double
toChar(): Char
```

## Characters

`Characters`는 `Char`로 표현되며, 숫자와 완전히 다르게 다루어진다.

```kotlin
fun check(c: Char) {
  if (c == 1) // Error: 타입 불일치
}
```

`Character Literal`은 `single quotes`로 감싸져있고, `Special Characters`는 `backslash \`로 escaped된다.

- 지원되는 `escape sequence`: `\t`, `\b`, `\n`, `\r`, `\'`, `\"`, `\\` and `\$`.

`Char`를 명시적으로 `numbers`로 변환하면, `ascii code`가 반환된다.

```kotlin
fun main() {
    val c = '0'
    println(c.toInt()) // prints 48
}
```

## Boolean

널리 알려진 `Boolean`과 똑같.

## Arrays

배열은 `Array` class로 표현되고, `get`, `set` 함수(operator overloading, `[]`), `size` 프로퍼티, 몇몇 유용한 멤버 함수가 있다.

```kotlin
class Array<T> private constructor() {
    val size: Int
    operator fun get(index: Int): T
    operator fun set(index: Int, value: T): Unit

    operator fun iterator(): Iterator<T>
    // ...
}
```

`Array`를 생성하려면, `arrayOf()`함수를 이용한다.

```kotlin
fun main() {
    val a = arrayOf(1, 2, A(1), 4, 5)
    a.forEach { println(it) }
}

// prints:
// 1
// 2
// type: 1
// 4
// 5
```

- `arrayOfNulls()`는 주어진 사이즈의 빈 배열이 생성된다.

`Array`를 생성하는 다른 방법은, `Array` constructor를 이용한다.  
첫번째 인자로 `array`의 사이즈를 넣고, 두번째 인자로 초기값을 설정하는 `function`을 넣는다.

```kotlin
// Creates an Array<String> with values ["0", "1", "4", "9", "16"]
val asc = Array(5, { i -> (i * i).toString() })
asc.forEach { println(it) }
```

# String

`String`의 `elements`들은 `Char`이고, `[]`로 접근 할 수 있다. `String`은 `for loop`로 반복될 수 있다

```kotlin
for (c in str) {
    println(c)
}
```

operator `+`로 문자열을 이을수있다. (`concat`).
첫번째 element가 문자열인 한, 다른 타입도 이을 수 있다.
