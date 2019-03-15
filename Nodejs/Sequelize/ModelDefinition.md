# Model Definition

모델과 테이블 사이 관계를 정의하려면, `define` 메소드를 사용한다.

```js
// project라는 테이블,
// title, description이라는 field
const Project = sequelize.define("project", {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
});

const Task = sequelize.define("task", {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});
```

각 `column`에 옵션들을 줄 수 있다.

```js
const Foo = sequelize.define('foo', {
 // instantiating will automatically set the flag to true if not set
 flag: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },

 // default values for dates => current time
 myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

 // setting allowNull to false will add NOT NULL to the column, which means an error will be
 // thrown from the DB when the query is executed if the column is null. If you want to check that a value
 // is not null before querying the DB, look at the validations section below.
 title: { type: Sequelize.STRING, allowNull: false },

 // Creating two objects with the same value will throw an error. The unique property can be either a
 // boolean, or a string. If you provide the same string for multiple columns, they will form a
 // composite unique key.
 uniqueOne: { type: Sequelize.STRING,  unique: 'compositeIndex' },
 uniqueTwo: { type: Sequelize.INTEGER, unique: 'compositeIndex' },

 // The unique property is simply a shorthand to create a unique constraint.
 someUnique: { type: Sequelize.STRING, unique: true },

 // It's exactly the same as creating the index in the model's options.
 { someUnique: { type: Sequelize.STRING } },
 { indexes: [ { unique: true, fields: [ 'someUnique' ] } ] },

 // Go on reading for further information about primary keys
 identifier: { type: Sequelize.STRING, primaryKey: true },

 // autoIncrement can be used to create auto_incrementing integer columns
 incrementMe: { type: Sequelize.INTEGER, autoIncrement: true },

 // You can specify a custom field name via the 'field' attribute:
 fieldWithUnderscores: { type: Sequelize.STRING, field: 'field_with_underscores' },

 // It is possible to create foreign keys:
 bar_id: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Bar,

     // This is the column name of the referenced model
     key: 'id',

     // This declares when to check the foreign key constraint. PostgreSQL only.
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 }
})
```

| key           | value                       | description                            |
| ------------- | --------------------------- | -------------------------------------- |
| defaultValue  | `any`                       | 기본값                                    |
| allowNull     | `boolean`                   | Null 허용?                               |
| unique        | `string` or `boolean`       | uniquekey                              |
| primaryKey    | boolean                     | primaryKey 할당?                         |
| autoIncrement | boolean                     | 자동 증가?                                 |
| field         | string                      | custom field 이름                        |
| references    | `{ model, key, deferrable}` | create foreign key (위 예제의 `bar_id` 참고) |


### Timestamps

기본적으로, Sequelize는 `createdAt`, `updatedAt` 필드를 자동으로 추가해준다.

### Range types

range types는 boundary에서 inclusion/exclusion에 관한 정보가 필요하므로, 단순히 javascript tuple로 표현하기는 한계가 있다.

그럴땐, 다음의 API를 사용하면 된다.

tuple로 구성한다면,
lower bound에서는 inclusive가 기본
upper bound에서는 exclusive가 기본.

```js
// defaults to '["2016-01-01 00:00:00+00:00", "2016-02-01 00:00:00+00:00")'
// inclusive lower bound, exclusive upper bound
Timeline.create({ range: [new Date(Date.UTC(2016, 0, 1)), new Date(Date.UTC(2016, 1, 1))] });

// control inclusion
const range = [new Date(Date.UTC(2016, 0, 1)), new Date(Date.UTC(2016, 1, 1))];
range.inclusive = false; // '()'
range.inclusive = [false, true]; // '(]'
range.inclusive = true; // '[]'
range.inclusive = [true, false]; // '[)'

// or as a single expression
const range = [
  { value: new Date(Date.UTC(2016, 0, 1)), inclusive: false },
  { value: new Date(Date.UTC(2016, 1, 1)), inclusive: true },
];
// '("2016-01-01 00:00:00+00:00", "2016-02-01 00:00:00+00:00"]'

// composite form
const range = [
  { value: new Date(Date.UTC(2016, 0, 1)), inclusive: false },
  new Date(Date.UTC(2016, 1, 1)),
];
// '("2016-01-01 00:00:00+00:00", "2016-02-01 00:00:00+00:00")'

Timeline.create({ range });
```

### Special Case
```js
// empty range:
Timeline.create({ range: [] }); // range = 'empty'

// Unbounded range:
Timeline.create({ range: [null, null] }); // range = '[,)'
// range = '[,"2016-01-01 00:00:00+00:00")'
Timeline.create({ range: [null, new Date(Date.UTC(2016, 0, 1))] });

// Infinite range:
// range = '[-infinity,"2016-01-01 00:00:00+00:00")'
Timeline.create({ range: [-Infinity, new Date(Date.UTC(2016, 0, 1))] });
```

# Getters & setters

모델에 `getter`, `setter`를 정의하는 것이 가능하다. 
1. single property definition으로 (특정 field에 한해) 정의  
(Defining as part of a property)
1. model option으로 (전역으로) 정의  
(Defining as part of the model options)

### Defining as part of a property

```js
const Employee = sequelize.define('employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      const title = this.getDataValue('title');
      // 'this' allows you to access attributes of the instance
      return this.getDataValue('name') + ' (' + title + ')';
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('title', val.toUpperCase());
    }
  }
});

Employee
  .create({ name: 'John Doe', title: 'senior engineer' })
  .then(employee => {
    console.log(employee.get('name')); // John Doe (SENIOR ENGINEER)
    console.log(employee.get('title')); // SENIOR ENGINEER
  })
```

### Defining as part of the model options

```js
const Foo = sequelize.define('foo', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, {
  getterMethods: {
    fullName() {
      return this.firstname + ' ' + this.lastname
    }
  },

  setterMethods: {
    fullName(value) {
      const names = value.split(' ');

      this.setDataValue('firstname', names.slice(0, -1).join(' '));
      this.setDataValue('lastname', names.slice(-1).join(' '));
    },
  }
});

```

### Helper functions for use inside getter and settier definitions

- 특정 Field 값 검색 - always use `this.getDataValue('...')`

```js
/* a geeter for 'title' property */
get() {
  return this.getDataValue('title');
}
```

- 특정 field 값 할당 - always use `this.setDataValue()`

```js
/* a setter for 'title' property */
set(title) {
  this.setDataValue('title', title.toString().toLowerCase());
}
```
> `getDataValue()`를 사용하지 않고,
> `this.firstname`을 사용하면, 해당하는 getter functions를 트리거 한다.
> 그러지 않고 `raw value`에 접근하려면 `getDataValue()`를 사용.

# Validation

`create`. `update`, `save`가 실행되거나, 수동으로 `validate()`를 실행하면, 자동으로 제공된 `validation` 검사가 이루어진다.

```js
const ValidateMe = sequelize.define('foo', {
  foo: {
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],     // will only allow letters
      is: /^[a-z]+$/i,          // same as the previous example using real RegExp
      not: ["[a-z]",'i'],       // will not allow letters
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isCreditCard: true,       // check for valid credit card numbers

      // custom validations are also possible:
      isEven(value) {
        if (parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!')
          // we also are in the model's context here, so this.otherField
          // would get the value of otherField if it existed
        }
      }
    }
  }
});
```

`built-in validation functions`에 여러개의 `arguments`가 필요 할 때도 있다. 그럴때는 array로 감싸서 보내자.

하지만, `array` 하나를 인자로 사용해야 하는 경우 `['foo', 'bar']`,  
이런 경우는 하나의 array가 아닌, 여러개의 string 으로 인식된다. `['f', 'o', 'o', 'b', 'a', 'r']`  

그럴때는 `[['foo'], ['bar']]` 처럼 한번더 감싸서 보내자.

`validator.js`에서 제공하는 에러메세지 대신에, custom error message를 사용하려면 `isIn`등 key에 `plain Value` 대신, `msg` 정보가 담긴 객체를 보내면 된다.

```js
isInt: {
  msg: "Must be an integer number of pennies"
}

isIn: {
  // msg with arguments
  args: [['en', 'zh']],
  msg: "Must be English or Chinese"
}
```

### Validators and `allowNull`

특정 field에 `allowNull` 옵션이 할당되고, 실제로 `null`값이 할당되면, `validators`는 실행되지 않는다. 