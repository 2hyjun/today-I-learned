# Scope Functions

`Kotlin Standard Library`는 한 오브젝트의 `context`를 가지고 block을 실행하는 목적의 몇몇 함수가 있다.  
특정 object에 이 함수를 `lambda expression`로 실행할때 일시적인 scope를 형성한다. 이 스코프에서, 이름없이 그 object에 접근할 수 있다.  
이 함수를 `scope function`이라 부르고, `let`, `run`, `with`, `apply`, `also`가 있다.

기본적으로 이 함수들은 같은 일을 한다.

> 특정 객체에서 block의 코드를 실행한다.

다른점은 **어떻게 이 객체들이 block에서 접근 가능해지는지**, **전체 expression의 결과물이 무엇인지** 이다.

아래는 `scope funtion`의 사용예 이다.

```kotlin
data class Person(var name: String, var age: Int, var city: String) {
    fun moveTo(newCity: String) { city = newCity }
    fun incrementAge() { age++ }
}

Person("Alice", 20, "Amsterdam").let {
    println(it)
    it.moveTo("London")
    it.incrementAge()
    println(it)
}

// Person(name=Alice, age=20, city=Amsterdam)
// Person(name=Alice, age=21, city=London)
```

`let`으로 같은 동작의 코드를 작성하면, 새로운 변수를 생성하고, 그 이름을 반복해야한다.

```kotlin
val alice = Person("Alice", 20, "Amsterdam")
println(alice)
alice.moveTo("London")
alice.incrementAge()
println(alice)
```

`scope function`은 새로운 기술적인 능력을 가지고 있는 것이 아니라, 그저 code를 더 간결하고 가독성있게 만들어 준다.

# Distinctions

기본적으로 `scope functions`는 모두 비슷하기 때문에, 그것들의 차이점을 이해하는 것은 중요하다. 다음은 각 `scope functions` 사이의 가장 주된 두가지 차이점이다.

- `context object`를 가리키는 방법
- 리턴 값

# Context object: `this` or `it`

`scope functions`의 `lambda`에서, `context object`는 그것의 실제 이름 대신에 짧은 reference로 접근가능하다. 각 `scope functions`는 `context object`에 접근하는 두가지 방식을 가진다.

- `lambda receiver` (`this`)
- `lambda argument` (`it`)

둘은 같은 기능을 가지고 있지만, 각각의 장/단점을 소개하고 사용처에 맞는 추천사항을 소개하겠다.

```kotlin
fun main() {
    val str = "Hello"
    // this
    str.run {
        println("The receiver string length: $length")
        //println("The receiver string length: ${this.length}") // does the same
    }

    // it
    str.let {
        println("The receiver string's length is ${it.length}")
    }
}
```

## this

`run`, `with`, `apply`는 `context object`를 `lambda receiver - this`로 받는다.  
`lambda expression`에서 `object`는 `ordinary class functions`이기 때문에, 대부분의 경우에서 `this`를 생략할 수 있다.

`this`를 생략 할 수 있기 때문에, `receiver members`와 `external object or function`을 구분하기 어려울 수 있다.

따라서 `receiver(this)`로 `context object`를 받는 `scope funtion`은 `object members`에서 사용되는 것이 권장된다.

```kotlin
val adam = Person("Adam").apply {
    age = 20  // same as this.age = 20 or adam.age = 20
    city = "London"
}
```

## it

`let`, `also`는 `lambda argument(it)`으로 `context object`를 가진다.  
인자의 이름이 명시되지 않는다면, 기본값 (`it`)를 가진다.  
`it`은 `this`보다 짧고, `it`을 통한 expression은 보통 더 읽기 쉽다.  
하지만 객체의 함수나 properties를 호출할 때, `this`와 같은 접근 가능한 `object`가 없다. 따라서, `context object`를 `it`으로 가지는 것은 함수 호출에서 인자로써 사용되는 것이 권장된다.  
또한 `it`은 code block에서 여러개의 변수를 사용할때 좋다

```kotlin
import kotlin.random.Random

fun writeToLog(message: String) {
    println("INFO: $message")
}

fun main() {
    fun getRandomInt(): Int {
        return Random.nextInt(100).also {
            writeToLog("getRandomInt() generated value $it")
        }
    }

    val i = getRandomInt()
}
```

추가적으로 `context object`를 인자로써 넘길 때, custom argument name을 정할 수 있다.

```kotlin
fun getRandomInt(): Int {
    return Random.nextInt(100).also { value ->
            writeToLog("getRandomInt() generated value $value")
    }
}

val i = getRandomInt()
```

# Return Value

`scope funtions`는 리턴하는 결과값에 따라 나뉘어진다.

- `apply`, `also`는 `context object`를 리턴한다.
- `let`, `run`, `with`는 `lambda result`를 리턴한다.

## Context Object

`apply`, `also`는 `context object` 자신을 리턴한다. 그래서, `call chain`으로 연결될 수 있다.

```kotlin
val numberList = mutableListOf<Double>()
numberList.also { println("Populating the list") } // also return numberList
    .apply {
        add(2.71) // === this.add(2.71) === numberList.add(2.71)
        add(3.14)
        add(1.0)
    }
    .also { println("Sorting the list") }
    .sort()
```

또한, `context object`를 리턴하는 함수의 `return statement`에서 사용될 수 있다.

```kotlin
fun getRandomInt(): Int {
    return Random.nextInt(100).also {
        // it === Random.nextInt(100)의 리턴 값.
        writeToLog("getRandomInt() generated value $it")
    }
}

val i = getRandomInt()
```

## Lambda result

`let`, `run`, `with`는 `lambda result`를 리턴한다.  
변수에 값을 할당할 때, 결과에 추가적인 operation을 chaining할 때, 등등에 사용된다.

```kotlin
val numbers = mutableListOf("one", "two", "three")
val countEndsWithE = numbers.run {
    add("four") // add() === numbers.add() === this.add()
    add("five")
    count { it.endsWith("e") }
}
println("There are $countEndsWithE elements that end with e.")
```

추가적으로, 리턴값을 무시하고 `scope funtion`을 사용하여 변수의 일시적인 scope를 만들 수 있다.

```kotlin
val numbers = mutableListOf("one", "two", "three")
with(numbers) {
    val firstItem = first() // first() === numbers.first(), this.first()
    val lastItem = last()
    println("First item: $firstItem, last item: $lastItem")
}
```

# Functions

`scope function`를 선택하는 것을 돕기위해, 많은 경우에서 예를 들어 적절한 `scope funtion`을 고르는 예시를 소개하겠다.

## let

`context object`가 argument(`it`)로 접근 가능하고, `return value`는 `lambda result`이다.  
`let`은 `call chain`에서 하나 이상의 함수를 추가적으로 호출하기 위해 사용된다.  
다음 예에서, collection의 두 가지 operation의 결과를 출력한다.

```kotlin
val numbers = mutableListOf("one", "two", "three", "four", "five")
val resultList = numbers.map { it.length }.filter { it > 3 }.let {
  println(resultList)
}
```

만약 colde block이 `it`를 인자로 가지는 단 하나의 함수만있다면, `method reference (::)`를 사용할 수 있다.

```kotlin
val numbers = mutableListOf("one", "two", "three", "four", "five")
numbers.map { it.length }.filter { it > 3 }.let(::println)
```

`let`은 주로 `safe call operator` (`?.`)을 통해서 `non-null` value를 가지고 code block을 실행할 때 사용된다.

```kotlin
fun processNonNullString(str: String) {}

val str: String? = "Hello"
//processNonNullString(str)       // compilation error: str can be null
val length = str?.let {
    println("let() called on $it")
    processNonNullString(it)      // OK: 'it' is not null inside '?.let { }'
    it.length
}
```

`let`은 코드 가독성 향상을 위해, 지역변수만을 위한 scope를 생성할 때 사용된다.

```kotlin
val numbers = listOf("one", "two", "three", "four")
val modifiedFirstItem = numbers.first().let { firstItem ->
        println("The first item of the list is '$firstItem'")
    if (firstItem.length >= 5) firstItem else "!" + firstItem + "!"
}.toUpperCase()
println("First item after modifications: '$modifiedFirstItem'")
```

## with

`non-extension function`이고, `context object`가 `argument`로 전달되고, `lambda`내에서 `receiver(this)`로 접근가능하다.  
`return value`는 `lambda`의 결과 값이다.

`lambda result`를 사용하지 않는 `context object`에서 함수를 호출할 때 `with`를 사용하는 것을 추천한다.  
code에서, `with`는 *"with this object, do the following"*으로 이해할 수 있다.

```kotlin
val numbers = mutableListOf("one", "two", "three")
with(numbers) {
    println("'with' is called with argument $this")
    println("It contains $size elements")
}
```

객체의 property나 function이 값을 계산하는 용도로 사용되는 `helper object`로 사용할 수 있다.

```kotlin
val numbers = mutableListOf("one", "two", "three")
val firstAndLast = with(numbers) {
    "The first element is ${first()}," +
        " the last element is ${last()}"
}
println(firstAndLast)
```

## run

`context object`가 `receiver(this)`로 전달되고, 리턴 값은 `lambda result`이다. (`with`와 동일.)

with와 동일하게 동작하지만, `let`처럼 `context object`의 `extension function`처럼 호출된다.

`run`은 `lambda`가 `object initialization`과 결과값 연산을 모두 수행할 때 효과적이다.

```kotlin
val service = MultiportService("https://example.kotlinlang.org", 80)

val result = service.run {
    port = 8080
    query(prepareRequest() + " to port $port") // === service.query(...)
}

// the same code written with let() function:
val letResult = service.let {
    it.port = 8080
    it.query(it.prepareRequest() + " to port ${it.port}")
}
```

`receiver object`에서 `run`을 실행하는것 이외에도, `non-extension function`으로 사용할 수도 있다.

```kotlin
val hexNumberRegex = run {
    val digits = "0-9"
    val hexDigits = "A-Fa-f"
    val sign = "+-"

    Regex("[$sign]?[$digits$hexDigits]+")
}

for (match in hexNumberRegex.findAll("+1234 -FFFF not-a-number")) {
    println(match.value)
}
```

## apply

`context object`를 `receiver(this)`로 받고, `object`자신을 리턴한다.

`apply`는 값을 리턴하지 않고, `receiver object`의 member를 연산할때 주로 사용된다. `apply`의 주 사용처는 `object configuration`이다. _"apply the following assignments to the object"_

```kotlin
val adam = Person("Adam").apply {
    age = 32 // this.age = 32, adam.age = 32 대신에 간단히 age = 32로 사용할 수 있다.
    city = "London"
}
```

## also

`context object`를 `argument(it)`로 받고, `object`자신을 리턴한다.  
`also`는 `context object`를 인자로 받는 또다른 액션을 취할 때 유용하다. `object`를 변형하지 않고, 로그를 찍거나 debug 정보를 출력하는 용도로 사용된다.

_"and also do the following"_

```kotlin
val numbers = mutableListOf("one", "two", "three")
numbers
    .also { println("The list elements before adding new one: $it") }
    .add("four")
```
