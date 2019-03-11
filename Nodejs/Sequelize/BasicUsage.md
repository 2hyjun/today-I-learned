# Basic Usage

먼저, `Sequelize` 인스턴스를 만들어야 한다.

```javascript
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "mysql"
});
```

데이터베이서 인증정보를 저장하고, 추가적인 메소드를 제공한다.

1. non-default host/port

```javascript
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "mysql",
  host: "my.server.tld",
  port: 9821
});
```

2. password가 없을 때 => `password: null`

```js
const sequelize = new Sequelize({
  database: "db_name",
  username: "username",
  password: null,
  dialect: "mysql"
});
```

3. 추가 옵션
   host, port 이외에도 마아않은 옵션들이 있다.

```js
{
  // the sql dialect of the database
  // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
  dialect: 'mysql',

  // custom host; default: localhost
  host: 'my.server.tld',

  // custom port; default: dialect default
  port: 12345,

  // custom protocol; default: 'tcp'
  // postgres only, useful for Heroku
  protocol: null,

  // disable logging; default: console.log
  logging: false,

  // you can also pass any dialect options to the underlying dialect library
  // - default is empty
  // - currently supported: 'mysql', 'postgres', 'mssql'
  dialectOptions: {
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    supportBigNumbers: true,
    bigNumberStrings: true
  },

  // the storage engine for sqlite
  // - default ':memory:'
  storage: 'path/to/database.sqlite',

  // disable inserting undefined values as NULL
  // - default: false
  omitNull: true,

  // a flag for using a native library or not.
  // in the case of 'pg' -- set this to true will allow SSL support
  // - default: false
  native: true,

  // Specify options, which are used when sequelize.define is called.
  // The following example:
  //   define: { timestamps: false }
  // is basically the same as:
  //   sequelize.define(name, attributes, { timestamps: false })
  // so defining the timestamps for each model will be not necessary
  define: {
    underscored: false
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },

  // similar for sync: you can define this to always force sync for models
  sync: { force: true },

  // pool configuration used to pool database connections
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },

  // isolation level of each transaction
  // defaults to dialect default
  isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
}
```

# Read replication

Sequelize는 `read replication`을 지원한다.

> `read replication`: `having multiple servers that you can connect to when you want to do a SELECT query`

```js
const sequelize = new Sequelize('database', null, null, {
  dialect: 'mysql',
  port: 3306
  replication: {
    read: [
      { host: '8.8.8.8', username: 'read-username', password: 'some-password' },
      { host: '9.9.9.9', username: 'another-username', password: null }
    ],
    write: { host: '1.1.1.1', username: 'write-username', password: 'any-password' }
  },
  pool: { // If you want to override the options used for the read/write pool you can do so here
    max: 20,
    idle: 30000
  },
})
```

# Executing raw SQL queries

`sequelize.query`를 활용해서 `raw query`를 실행 할 수 있다.

```js
// Arguments for raw queries
sequelize.query("your query", [, options]);

// Quick example
sequelize.query("SELECT * FROM myTable").then(myTableRows => {
  console.log(myTableRows);
});

// If you want to return sequelize instances use the model options.
// This allows you to easily map a query to a predefined model for sequelize e.g:
sequelize
  .query("SELECT * FROM projects", { model: Projects })
  .then(projects => {
    // Each record will now be mapped to the project's model.
    console.log(projects);
  });

// Options is an object with the following keys:
sequelize.query("SELECT 1", {
  // A function (or false) for logging your queries
  // Will get called for every SQL query that gets send
  // to the server.
  logging: console.log,

  // If plain is true, then sequelize will only return the first
  // record of the result set. In case of false it will all records.
  plain: false,

  // Set this to true if you don't have a model definition for your query.
  raw: false,

  // The type of query you are executing. The query type affects how results are formatted before they are passed back.
  type: Sequelize.QueryTypes.SELECT
});

// Note the second argument being null!
// Even if we declared a callee here, the raw: true would
// supersede and return a raw object.
sequelize.query("SELECT * FROM projects", { raw: true }).then(projects => {
  console.log(projects);
});
```

Query의 Replacement (`where id = ?`)는 두가지 방식으로 된다.

1. using named paremeters (starting with `:`)

```js
sequelize
  .query("SELECT * FROM projects WHERE status = :status ", {
    raw: true,
    replacements: { status: "active" }
  })
  .then(projects => {
    console.log(projects);
  });
```

`:key`가 `replacements` object의 key값에 대응.

2. using unnamed

```js
sequelize
  .query(
    'SELECT * FROM projects WHERE status = ?',
    { raw: true, replacements: ['active']
  )
  .then(projects => {
    console.log(projects)
  })
```

array가 제공되고, `?`가 나타나는 순서에 따라 순차적으로 대응된다.
