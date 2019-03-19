# Introduction

Mongoose는 Node.js와 MongoDB를 위한 ODM(Object Data Mapping) library이다. Java 기반의 Hibernate. iBatis 등의 ORM(Object Relational Mapping)과 유사한 개념이다.

ODM의 사용은 코드 구성이나 개발 편의성 측면에서 장점이 많다. 호환성이 없는 프로그래밍언어(JavaScript) Object와 MongoDB의 데이터를 Mapping하여 간편한 CRUD를 가능하게 한다.

필요에 따라 확장 및 변경이 가능한 자체 검증(Validation)과 타입 변환(Casting)이 가능하며 Express와 함께 사용하면 MVC Concept 구현이 용이하다.

# SCHEMA

RDBMS의 Schema는 데이터베이스를 구성하는 레코드의 크기, 키(key)의 정의, 레코드와 레코드의 관계, 검색 방법 등을 정의한 것이다.

Mongoose의 Schema는 MongoDB에 저장되는 document의 Data 구조 즉 필드 타입에 관한 정보를 JSON 형태로 정의한 것으로 RDBMS의 테이블 정의와 유사한 개념이다.

MongoDB는 Schema-less하다. 이는 RDMS처럼 고정 Schema가 존재하지 않는다는 뜻으로 같은 Collection 내에 있더라도 document level의 다른 Schema를 가질 수 있다는 의미이다.

이는 자유도가 높아서 유연한 사용이 가능하다는 장점이 있지만 명시적인 구조가 없기 때문에 어떤 필드가 어떤 데이터 타입인지 알기 어려운 단점이 있다. 이러한 문제를 보완하기 위해서 Mongoose는 Schema를 사용한다.

