# JVM Minimal survival guide

source from [hadihariri](https://hadihariri.com/2013/12/29/jvm-minimal-survival-guide-for-the-dotnet-developer/)

# Why this Guide

새로운 플랫폼에 오게되면, 개념/프레임워크를 익히기 위해 노력하지만 쉽지않다. 그것들은 다른 이름을 가지고 있고, 다른 접근을 가지기 때문. 새로운 것을 배우는 것은 시간을 매우 잡아먹고, 때로는 매우 절망적이다. 이 가이드에서, 초보자들에게 도움을 주려고 한다.

# Target Audience

이 가이드는 .NET 개발자들에게 초점이 잡혀있지만, 다른 개발자들에게도 도움이 되었으면 좋겠다.

# The Basics

## Java the language. Java the ecyosystem. Java the JVM.

이 3가지는 모두 다르다. `Java the Language`는 언어, `Java the echosystem`은 말 그대로 echosystem, `JVM`은 플랫폼이다. 불행하게도, 3가지는 모두 `Java`라고 불린다. 3중 하나때문에 다른 것들을 미루지 마라.

## Multi-language platform

`JVM`은 다양한 언어를 지원하는 플랫폼을 제공하는 `virtual machine`이다. `JVM`을 구성하는 언어는 `Java`, `Scala`, `Clojure`, `Ceylon`, `Groovy`, `JRuby`, `Kotlin`등이 있다.

## JVM ByteCode

`JVM bytecode`은 `JVM`기반 언어가 컴파일 하여 `JVM`에서 실행될수 있도록 한 것이다.

## Cross Platform

`JVM`은 100% 크로스 플랫폼이다. OS에 제한받지않고 실행가능하며 많은 종류의 device에서 실행 가능하다.

# JVM Implementations, Editions and Versions

`JVM`은 여러가지 [implementations](https://en.wikipedia.org/wiki/List_of_Java_virtual_machines)들이 있다. 가장 흔히 사용되는 것은 `Oracle's JVM`과 `OpenJDK`이다.

## Editions and Versions

이 가이드에서 가장 복잡한 부분 일것이다.

**Editions**

- `JRE` - Java Runtime Environment. This is for running JVM applications. You can’t develop applications running on the JVM with just this.
- `Java SE (JDK)` - Java Standard Edition. Also known as the JDK. This is the minimum you need to develop applications on the JVM.
- `Java EE` - Java Enterprise Edition. Well, name says it all. It’s where you get all the Enterprisey stuff like distributed, large-scale applications. Yes, couldn’t be more ambiguous. It includes Java SE.
- `Java ME` - Java Micro Edition. This is a smaller subset focused for mobile phones and smaller devices. It’s like the .NET Micro Framework.
- `JavaFX` - Replacement for Swing, which was/is the main GUI toolkit in Java. Also (albeit somewhat controversial topic) is also targeted at RIA’s. As if HTML/JS/CSS isn’t good enough?).

**Versions**  
설치된 자바의 버전을 보려면,

> `java -version`

을 실행한다.

```
java version "1.8.0"
Java(TM) SE Runtime Environment (build 1.8.0-b132)
Java HotSpot(TM) 64-Bit Server VM (build 25.0-b70, mixed mode)
```

`Java 8`이다. 버전에서 1을 빼서 버전 명을 본다. 8.0이다.
1.5는 `Java 5`, 1.6은 `Java 6`, 1.7은 `Java 7` ...

이 버전 명명 규칙이 근거가 없다고 판단되어, `Java 10`부터는 다음과 같이 명명한다.

```
java version "10.0.1" 2018-04-17
Java(TM) SE Runtime Environment 18.3 (build 10.0.1+10)
Java HotSpot(TM) 64-Bit Server VM 18.3 (build 10.0.1+10, mixed mode)
```

# Aplication Output a.k.a Artifacts

`.NET`에서, 컴파일이 끝나면 `executable`파일과 여러개의 `DLLs`파일들이 생성된다.  
`java`에서는, 수많은 `.class`파일을 얻게된다.

각 `class`파일은 `Java class`에 대응된다. (`Java language` 혹은 `bytecode`로 컴파일되는 언어들을 컴파일 할때)  
이 `class`들은 `JVM Bytecode`이다.

## JAR files

수백개의 `class`파일을 가지고 다니는 것 대신에, `JAR`(`.class` 파일의 압축)파일을 생성할 수 있다.

> `jar cf jar-file input-file(s)`

`jar`는 기본적으로 `JDK`를 내장하고 있다.

## WAR files

`WAR` 파일은 `Web application`을 위한 `JAR` 파일이다. 수백개의 `.class`파일과 몇몇 `metadata`, `Tomcat`같은 웹서버들을 위한 정보를 담은 폴더를 가지고있다.

# Running Java Applications

모든 `Java` applications는 `main class`를 가지고 있어야 하고, `CLI`로 실행가능하다.

> `java <class_containing_main_method>`

## Classpath

Application을 실행할 때, `JVM`은 현재 폴더에서 모든 필요한 의존체들을 찾고 그 후에 `.class`파일이나, `JAR/ZIP`파일을 가리키고 있는 `CLASSPATH` 환경변수에서 의존체를 찾는다.

전역적으로 `CLASSPATH` 환경변수를 설정할 수 있고, application을 실행 할 때 `command line`에서 `argument`로 넣어줄 수 있다.

> `java <class_containing_main_method> -cp <class_path>`
> 각 엔트리는 콜론으로 분리된다.

# Build Tools

`JVM`은 많은 build tool을 가지고 있다. 몇몇 언어들은 그 언어 전용 build tools를 가진다. (`Leigningen for Clojure, SBT for Scala`) 대부분 언어들은 더 보편적인 build tools를 사용할 수 있다.

## Ant

It’s XML. It’s what NAnt is based on. It’s like MS-Build. I did mention though it’s XML.

## Maven

`Maven`은 꽤 유명하다. `pom.xml`파일이 있는 프로젝트가 있으면, 그건 `Maven`이다.  
`Maven`은 단순 build tool 이 아니라, `packaging system`이다. `Node.js`의 `npm` 같은.

## Gradle

`Gradle`은 `Maven`의 향상된 버전이다. `Groovy`를 기반으로 하고있기 때문에 **엿같은** XML을 사용하지 않아도 되고, `dependencies`를 관리하는 더 나은 방법을 제공한다.

# Framework and Libraries

정말 많은 라이브러리와 프레임워크가 있지만, 저자의 수요에 기반하여 추천하는 몇가지 라이브러리 / 프레임워크를 추천해주겠다.

## JSON Serialization

- **Jackson**

## Unit Testing

- JUnit - As standard as it gets. Works well. Supported by pretty much all tools.
- Spek - Disclaimer. It’s my own framework, but since I’m using it, it’s worth a mention. Offers a better DSL. At least I think so.
- JBehave - Dan North’s original JBehave framework.
- TestNG - An alternative to JUnit. Not used it myself so can’t comment much.

## Mocking Frameworks

- Mockito

## Logging

- SLF4J - This is the common facade for logging on the JVM platform. Sticking to this allows you to (in theory) swap out logging and allows applications to choose which library they want.

## IoC Containers

- Guice - From Google. It’s the one I’m using. It’s pretty decent.
- Spring - From Spring Framework. Apparently you can now use it without XML. Not sure. I don’t use it.

## HTTP Clients

Using the standard Apache Commons one. Open to better alternatives.

- Apache HTTP Client - Using this one. Sorely lacking a wrapper.

## Web Frameworks

A lot of the web frameworks are based off of a common interface which is the Java Servlet API. Think of it as kind of like OWIN.

Applications can then be hosted on GlassFish, Jetty, Apache TomCat.

Oh btw, Oracle announced it will discontinue GlassFish commercial support and its main Evangelist, Arun Gupta, recently left Oracle for RedHat. He now offers as alternative WildFly

A very modern and lightweight option for web development is Vert.x. Built on Netty, you can even use different languages such as Java, JavaScript, Ruby.

## Networking

- Netty - Awesome asynchronous event-driven framework for writing high-performance web applications. It abstracts the communication layer so you can use HTTP, Sockets, et al.

## Other Libraries and Utilities

- JodaTime - Date and Time management in Java are horrendously broken. Worse than in .NET. Use JodaTime for sanity. This is where NodaTime from Jon Skeet originates.
- Reflections - Making Reflection nicer.
- Apache Commons - A bunch of small libraries for everyday use.

# Conventions 관례

## Namespaces

top-level 도메인 명의 역순.

> `org.hadihariri.spek.runners`

각 `.`으로 구분되는 부분들은 폴더가 된다.
