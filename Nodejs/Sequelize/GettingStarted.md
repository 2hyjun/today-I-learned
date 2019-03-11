# 1. Getting Started

initialization에서 connection pool을 설정하기 때문에, 하나의 database당 하나의 instance를 설정해야한다. (single process에서)

만약 multi processes에서 DB에 연결한다면, 프로세스 하나당 하나의 인스턴스만 만들어야한다. 하지만, 각 인스턴스는 `maximum connection pool size`("max connection pool size divided by number of instances") 옵션이 있어야 한다. 따라서, 3개의 process에서 90 pool size의 커넥션을 원한다면, 각 프로세스의 인스턴스는 30의 max connection pool size를 가져야 한다.

```javascript
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql" | "sqlite" | "postgres" | "mssql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Or you can simply use a connection uri
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");
```

# Test the connection

```javascript
sequelize.authenticate().
  then(() => {
    console.log("Connection has been established successfully.");
  }).catch(err => {
    console.error("Unable to connect to the database:", err);
  });
```

# Your first model

Models are defined with

> `sequelize.define('name', {attributes}, {options}).`

```javascript
const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
  // Table created
  return User.create({
    firstName: "John",
    lastName: "Hancock"
  });
});
```

# Your First query

```javascript
User.findAll().then(users => {
  console.log(users);
});
```

# Application Wide Model Options

Sequelize constructor는 `define` 옵션을 가진다. 해당 옵션은 모든 정의된 모델의 `default options`이 된다.
