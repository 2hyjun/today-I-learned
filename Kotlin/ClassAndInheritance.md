# Classes

```kotlin
class Invoice { ... }
```

`kotlin`에서 클래스는 위와 같이 정의된다.

클래스 정의는 `class name`, `class header`(type 인자 정의, primary constructor 등), `class body`(중괄호로 감싸진 부분)로 이루어져있다.

`class header`와 `class body`는 optional 하고, `body`가 없으면 중괄호도 없어도 된다.

```kotlin
class Empty
```

## Constructors

`kotlin class`에는 `primary constructor`와, 1개 이상의 `secondary constructors`를 가질 수 있다.  
`primary constructor`는 `class header`의 한 부분이다.

```kotlin
class Person constructor(first: String) {...}

// primary constructor가 annotation이나 modifier가 없다면, constructor 키워드는 생략가능.

class Persion(first: String) { ... }
```

`primary constructor`는 어떤 코드도 가질 수 없다. `initialization code`는 `init` keyword로 시작되는 **initializer blocks**에 위치된다.

`instance initialization`이 실행될때, `initializer blocks`는 `class body`에 선언된 순서대로 실행된다.

```kotlin
class InitOrderDemo(name: String) {
    val firstProperty = "First property: $name".also(::println)

    init {
        println("First initializer block that prints ${name}")
    }

    val secondProperty = "Second property: ${name.length}".also(::println)

    init {
        println("Second initializer block that prints ${name.length}")
    }
}

// First property: hello
// First initializer block that prints hello
// Second property: 5
// Second initializer block that prints 5
```

`primary constructor`의 parameter는 `initializer blocks`에서 사용될 수 있고, 또한 `class body`의 `property initializers`에도 사용될 수 있다.

```kotlin
class Customer(name: String) {
    val customerKey = name.toUpperCase()
}
```

`regular properties` 처럼, `primary constructor`에서 선언된 `properties`는 `val`로 `read-only`일 수도, `var`로 변경가능 할 수도 있다.

`constructor`가 `annotation`이 있거나, `visibility modifiers`가 있다면, `constructor` 키워드가 필요하고, modifier는 그 이전에 위치된다.

```kotlin
class Customer public @Inject constructor(name: String) { ... }
```

## Secondary Constructors

`class`는 `secondary constructors`를 선안할 수 있고, `constructor` 프리픽스를 가진다.

```kotlin
class Person {
    constructor(parent: Person) {
        parent.children.add(this)
    }
}
```

`primary constructor`가 있다면, `secondary constructor`는 `primary constructor`를 위임(delegate)해야한다. (`this` 키워드를 사용해서)

```kotlin
class Person(val name: String) {
    constructor(name: String, parent: Person) : this(name) {
        parent.children.add(this)
    }
}
```

`primary constructor`를 direct하게 `delegate`할 필요는 없다. 만약 다른 `secondary constructor`가 있다면, 그것을 위임해도 된다. 하지만 `delegate` 노선의 마지막은 항상 `primary constuctor`를 위임해야한다.

`initializer blocks`에 있는 코드는 `primary constructor`의 한 부분이 된다. `primary constructor`로 위임은 `secondary constructor`의 첫번째 `statement`로써 동작하므로, 모든 `initializer blocks`의 코드는 `secondary constructor`가 실행되기 이전에 실행된다.

만약 `primary constructor`가 없더라도, 위임(`delegation`)은 암시적으로 실행되고 `initialzier blocks`는 실행된다.

```kotlin
class Constructors {
    init {
        println("Init block")
    }

    constructor(i: Int) {
        println("Constructor")
    }
}

// Init block
// Constructor
```

`non-abstract` class에 어떠한 `constructor`도 선언되지 않았다면(`primary`, `secondary`), `kotlin`은 자동으로 `arguments`가 없는 `public primary constructor`를 생성한다.

## Class의 instance 생성

클래스의 인스턴스를 생성하려면, 평범한 함수를 호출하는 것 처럼 `constructor`를 호출한다.

```kotlin
val invoice = Invoice()

val customer = Customer("Joe Smith")
```

`kotlin`에서는 `new` keyword는 필요없다.

---

# Inheritance

`kotlin`의 모든 클래스는 공통의 `superclass` `Any`를 가지고, 그것은 `supertypes`가 선언되지 않은 기본 `superclass`이다.

```kotlin
class Example // Implicitly inherits from Any
```

명시적으로 `supertype`을 선언하고 싶다면, `class header` 뒤에 콜론 후에 `type`을 정의한다.

```kotlin
val invoice = Invoice()

val customer = Customer("Joe Smith")
```

만약 클래스에 `primary constructor`가 없다면, 각 `secondary constructor`는 `super`키워드를 통해 `base type`을 초기화 하거나, 다른 constuctor를 위임해야한다. 이 경우에, 여러가지 `secondary constructor`는 여러가지의 `base type`의 `constructor`를 호출 할 수 있다.

```kotlin
class MyView : View {
  constructor(ctx: Context) : super(ctx)

  constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
}
```

## Overiding Methods

위에서 언급한것 처럼, `kotlin`에서는 무언가를 만드는것을 명시적으로 한다. `java`와 다르게, `kotlin`은 `overidable members`에 `open`이라는 modifier가 필요하고, `overiding members`에는 `overide` modifier가 필요하다.

```kotlin
open class Base {
    open fun v() { ... }
    fun nv() { ... }
}
class Derived() : Base() {
    override fun v() { ... }
}
```

`Derived.v()`에는 `overide` modifier가 필요하다.

`Base.v()`에 `open`이 없었거나, `Derived.v()`에 `overide`가 없었다면 에러.

만약 `re-overiding`을 금하고 싶으면, `final`을 사용하면 된다.

```kotlin
open class AnotherDerived() : Base() {
    final override fun v() { ... }
}
```

## Overiding Properties

`Overiding Methods`처럼 overide 될 property는 `open`, overiding propertiy는 `overide`가 있어야한다. 또한, 둘은 호환되는 타입을 가지고 있어야한다.

선언된 `property`는 `initializer`를 가진 `property`로 overide되거나, `getter method`를 가진 `property`로 overide 될 수 있다.

```kotlin
open class Foo {
    open val x: Int get() { ... }
}

class Bar1 : Foo() {
    override val x: Int = ...
}
```

`val`(read-only) `property`를 `var`(mutable)로 overide할 수 있지만, 반대로는 안된다.  
(`val` 프로퍼티는 근본적으로 `getter` 메소드만을 선언하기 때문. `var`은 `setter` 메소드도 필요하다.)

`primary constructor`에서 프로퍼티를 정의할 때 `overide`키워드를 사용할 수 있다.

```kotlin
interface Foo {
    val count: Int
}

class Bar1(override val count: Int) : Foo

class Bar2 : Foo {
    override var count: Int = 0
}
```

## Derived class initialization order

derived class의 instance 생성 중에, base class의 initialization이 첫번째로 실행되고, 그 후에 derived class의 initialzation logic이 실행된다.

```kotlin
open class Base(val name: String) {

    init { println("Initializing Base") }

    open val size: Int =
        name.length.also { println("Initializing size in Base: $it") }
}

class Derived(
    name: String,
    val lastName: String
) : Base(name.capitalize().also { println("Argument for Base: $it") }) {

    init { println("Initializing Derived") }

    override val size: Int =
        (super.size + lastName.length).also { println("Initializing size in Derived: $it") }
}

val a = Derived("Hyuckjun", "Lee")

// Argument for Base: Hyuckjun
// Initializing Base
// Initializing size in Base: 8
// Initializing Derived
// Initializing size in Derived: 11
```

`base class constructor`가 실행될 때 까지, `derived class`에서 선언되거나 overide된 properties는 `initialzed 되지 않는다.`

## Calling the superclass implementation

derived class에서 superclass의 함수나 property에 접근하려면, `super` 키워드를 이용하면 된다.

```kotlin
open class Foo {
    open fun f() { println("Foo.f()") }
    open val x: Int get() = 1
}

class Bar : Foo() {
    override fun f() {
        super.f()
        println("Bar.f()")
    }

    override val x: Int get() = super.x + 1
}
```

`inner class`에서, `outer class`의 `superclass`에 접근하려면 `super`키워드에 `outer class`이름을 붙여 사용하면된다. `super@outer`

```kotlin
class Bar : Foo() {
    override fun f() { /* ... */ }
    override val x: Int get() = 0

    inner class Baz {
        fun g() {
            super@Bar.f() // Calls Foo's implementation of f()
            println(super@Bar.x) // Uses Foo's implementation of x's getter
        }
    }
}
```

## Overiding Rules

`kotlin`에서, inheritance의 구현은 다음 규칙을 따른다.

> 클래스가 여러 superclass들을 상속하고 있고 그 superclass간의 공통인 member가 있다면, 반드시 그 member들을 overide 해야하고, 자신 고유의 implementation을 제공해야한다 (`ambiguity`를 제거하기 위해.).

어느 상속된 implementation의 supertype을 사용하는지 명시하려면, `super<class>`를 이용하면 된다.

```kotlin
open class A {
    open fun f() { print("A") }
    fun a() { print("a") }
}

interface B {
    fun f() { print("B") } // interface members are 'open' by default
    fun b() { print("b") }
}

class C() : A(), B {
    // The compiler requires f() to be overridden:
    override fun f() {
        super<A>.f() // call to A.f()
        super<B>.f() // call to B.f()
    }
}
```

## Abstract Classes

클래스와, 클래스의 멤버는 `abstract`로 선언될 수 있다. `abstract` member는 클래스 내부에 `implementation`을 가질 수 없다.  
`abstract` class나 function에는 `open`을 붙일 필요 없다. (기본값.)

## Companion Objects

`java, C#`과 다르게, `kotlin`은 `static methods`가 없다. 대부분은 `package-level` 함수를 사용하는 것이 권장된다.

class instance를 생성하지 않고 접근해야할 property가 있다면, `companion object`를 이용해야한다.
