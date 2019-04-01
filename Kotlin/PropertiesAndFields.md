# Properties and Fields

## Declaring Properties

코틀린의 클래스는 `properties`를 가질 수 있다. 변경가능하게 선언하려면 `var`, read-only하게 선언하려면 `val`로 선언한다.

## Getter and Setters

```kotlin
var <propertyName>[: <PropertyType>] [= <property_initializer>]
    [<getter>]
    [<setter>]
```

`getter and setter`는 선택적이다. 만약 property type이 optional하다면 `initializer`에서 리턴 타입을 추론한다.

```kotlin
var allByDefault: Int? // error: explicit initializer required, default getter and setter implied
var initialized = 1 // has type Int, default getter and setter
```
