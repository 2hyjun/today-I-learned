# Model Usage

### Data retrieval / Finders

"Finder" 메소드들은 db에서 데이터를 query한다.  
그 메소드들은, **`plain object`를 리턴하지 않고, `model instance`를 리턴한다.**

따라서, query를 실행한 후 추가적인 액션을 실행할 수 있다.

#### 1. find - DB에서 특정한 하나의 element 검색

조건에 맞는 element가 여러 개 일 경우, 첫번째 element가 반환된다.

```js
// search for known ids
Project.findById(123).then(project => {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
});

// search for attributes
Project.findOne({ where: { title: "aProject" } }).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
});

Project.findOne({
  where: { title: "aProject" },
  attributes: ["id", ["name", "title"]]
}).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
  // project.title will contain the name of the project
});
```

#### 2. findOrCreate - 특정 element 검색, 없을 경우 생성

````js
User
  .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
  .spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
    ```
````

`findOrCreate`는 `Object`와 `boolean`이 담긴 arry를 리턴.
`Object`는 생성되거나, 검색한 object를 리턴, `boolean`은 새롭게 생성되었을 경우 `true` 리턴.

#### 3. findAndCountAll - 여러 elements 검색, 검색 데이터와 총 갯수 리턴

`findAll`과 `count`를 합친 메소드.  
`limit`, `offset` 옵션을 통하여 `pagination`을 효과적으로 구현할 수 있다.

```js
Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: "foo%"
    }
  },
  offset: 10,
  limit: 2
}).then(result => {
  console.log(result.count);
  console.log(result.rows);
});
```

`include` 옵션을 지원한다. `required`로 지정된 필드가 포함된 객체들만 `count`에 추가된다.

```js
User.findAndCountAll({
  include: [{ model: Profile, required: true }],
  limit: 3
});
```

=> `profile` 정보가 있는 모든 유저를 검색하고 싶을때

```js
User.findAndCountAll({
  include: [{ model: Profile, where: { active: true } }],
  limit: 3
});
```

`where` clause가 할당되면, 암시적으로 `required` 속성이 할당된다.
위의 query는 `User Left Join Profile`에서, `Profile.active === true`를 만족하는 컬럼만 `3개` 가져온다.

#### 4. findAll - 여러개 element 검색

```js
// 여러 elements 검색
Project.findAll().then(projects => {
  // 결과 값은 Project instance의 array.
});

// Project.findAll()과 동일.
Project.all().then(projects => {
  // ...
});

// 특정 column 조건 으로 검색.
Project.findAll({ where: { name: "A Project" } }).then(projects => {
  // 결과 값은 조건을 만족하는 Project instance의 array.
});

// 특정 column 조건 (Range)로 검색
Project.findAll({ where: { id: [1, 2, 3] } }).then(projects => {
  // ...
});

Project.findAll({
  where: {
    id: {
      [Op.and]: { a: 5 }, // AND (a = 5)
      [Op.or]: [{ a: 5 }, { a: 6 }], // (a = 5 OR a = 6)
      [Op.gt]: 6, // id > 6
      [Op.gte]: 6, // id >= 6
      [Op.lt]: 10, // id < 10
      [Op.lte]: 10, // id <= 10
      [Op.ne]: 20, // id != 20
      [Op.between]: [6, 10], // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
      [Op.in]: [1, 2], // IN [1, 2]
      [Op.notIn]: [1, 2], // NOT IN [1, 2]
      [Op.like]: "%hat", // LIKE '%hat'
      [Op.notLike]: "%hat", // NOT LIKE '%hat'
      [Op.iLike]: "%hat", // ILIKE '%hat' (case insensitive)  (PG only)
      [Op.notILike]: "%hat", // NOT ILIKE '%hat'  (PG only)
      [Op.overlap]: [1, 2], // && [1, 2] (PG array overlap operator)
      [Op.contains]: [1, 2], // @> [1, 2] (PG array contains operator)
      [Op.contained]: [1, 2], // <@ [1, 2] (PG array contained by operator)
      [Op.any]: [2, 3] // ANY ARRAY[2, 3]::INTEGER (PG only)
    },
    status: {
      [Op.not]: false // status NOT FALSE
    }
  }
});
```

#### 5. Manipulating the dataset with limit, offset, order and group

적절한 데이터를 얻기위해, `limit`, `offset`, `order`, `group`을 사용할 수 있다.

```js
// 검색 갯수 제한
Project.findAll({ limit: 10 });

// 첫 10개 element 제외 후 검색
Project.findAll({ offset: 10 });

// 첫 10개 element 제외 후 2개 검색
Project.findAll({ offset: 10, limit: 2 });

// title 내림차순으로 검색
Project.findAll({ order: "title DESC" });
Proejct.findAll({ order: [["username", "DESC"]] });
// "name"으로 GROUP화 하여 검색
Project.findAll({ group: "name" });
```

> Order, Group의 argument 사용법

```js
something.findOne({
  order: [
    // will return `name`
    ["name"],
    // will return `username` DESC
    ["username", "DESC"],
    // will return max(`age`)
    sequelize.fn("max", sequelize.col("age")),
    // will return max(`age`) DESC
    [sequelize.fn("max", sequelize.col("age")), "DESC"],
    // will return otherfunction(`col1`, 12, 'lalala') DESC
    [
      sequelize.fn("otherfunction", sequelize.col("col1"), 12, "lalala"),
      "DESC"
    ],
    // will return otherfunction(awesomefunction(`col`)) DESC, This nesting is potentially infinite!
    [
      sequelize.fn(
        "otherfunction",
        sequelize.fn("awesomefunction", sequelize.col("col"))
      ),
      "DESC"
    ]
  ]
});
```

- String - will be quoted
- Array - first element will be quoted, second will be appended verbatim
- Object -
  - Raw will be added verbatim without quoting
  - Everything else is ignored, and if raw is not set, the query will fail
- Sequelize.fn and Sequelize.col returns functions and quoted column names

#### 6. Raw Queries

DB에서 방대한 양의 데이터를 가져오고, 추가적인 데이터 조작이 필요하지 않을 때  
결과값 그대로 (Raw Query) 가져 올 수 있다.

```js

Project.findAll({ where: { ... }, raw: true })
```

#### 7. Count - element의 갯수

```js
Project.count().then(c => {
  console.log("There are " + c + " projects!");
});

Project.count({ where: { id: { [Op.gt]: 25 } } }).then(c => {
  // id가 25 이상인 Project의 갯수
  console.log("There are " + c + " projects with an id greater than 25.");
});
```

#### 8. max, min - 특정 table의 특정 column의 최대값, 최소값

```js
Project.max("age").then(max => {
  // this will return 40
});

Project.min("age", { where: { age: { [Op.lt]: 20 } } }).then(max => {
  // where clause 등 condition 추가 가능
});
```

#### 9. sum - 합계!

```js
Project.sum("age").then(sum => {
  // this will return 55
});

Project.sum("age", { where: { age: { [Op.gt]: 5 } } }).then(sum => {
  // will be 50
});
```

#### 7.Count - element의 갯수

#### 7.Count - element의 갯수
