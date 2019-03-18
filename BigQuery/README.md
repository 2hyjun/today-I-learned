# BigQuery 개념 & CLI 사용법
### bq 명령줄 도구 사용

`bq`는 python 기반의 Big Query 용 명령줄 도구.

`bq --global_flag [ARGUMENT] --global_flag [ARGUMENT] bq_command --command-specific_flag [ARGUMENT]`

> ex) `bq --location=asia-southeast1 load --source_format=NEWLINE_DELIMITED_JSON --time_partitioning_field=created_at mvlchain-20703:tada_statistics.reviews bq-reviews.txt schema_reviews.json` 

여기서 global flag: `location`  
command-specific_flag: `source_format, time_partitioning_field`

##### cli arguments 넣는 법.
> `--flag=[ARGUMENT]`  
> `--flag='[ARGUMENT]'`    
> `--flag=[ARGUMENT]"`   
> `--flag ARGUMENT]`  
> `--flag [ARGUMENT]'`  
> `--flag [ARGUMENT]"`  

# Big Query 작업 소개

Jobs는 사용자 대신에, 데이터를 load, export, query, copy 하는 작업.  
console, web, CLI를 사용해서 load, export, query, copy를 실행하면, job resource는 자동으로 생성, 예약, 실행된다.

Job은 오래걸릴 수 있기 때문에, 비동기적으로 실행되고, 상태가 폴링될 수 있다.

### Running Job(작업) programmatically 

REST API 나, Client libraries 를 활용해서  
BigQuery 작업을 프로그래매틱 방식으로 실행할 수 있고, 방법은:  
1. client code로 자동 생성되는 job ID를 통해서, `jobs.insert`메소드 실행  
2. 주기적으로 작업 리소스를 요청하고, 상태 property를 활용하여 작업 완료시기를 확인  
3. job이 성공적으로 완료되었는지 체크

자세한 작업 생성 및 실행 사용법: [Big Query Docs#Running and managing jobs](https://cloud.google.com/bigquery/docs/running-jobs)

# Datasets

데이터 세트는 **특정 프로젝트 안에 위치**한다. 테이블과 뷰에 대한 엑세스를 구성하고 제어하는데 사용하는 최상위 컨테이너.  
테이블이나 뷰는 반드시 데이터세트 내에 존재해야하므로, BigQuery를 사용하기 위해서는 프로젝트에는 반드시 하나 이상의 데이터세트가 필요하다.

### Dataset Limitation

데이터 세트에는 몇가지 제한 사항이 있다.
1. 지리적 위치(geographic location)은 데이터세트를 생성할 때만 정할 수 있다. 추후에 변경이 부가능하다.
2. 쿼리에서 참조하는 테이블은 같은 위치(geographic location) 내에 있어야 한다.
3. 테이블을 복사할 때, 소스와 결과물은 같은 위치에 있어야 한다.
4. 데이터세트는 프로젝트 내에서 유니크한 이름을 가져야한다.
5. 데이터세트 수가 많아지면, class UI 성능은 느려진다. 


### Dataset locations

- key concepts
BigQuery 데이터가 저장될 위치를 정할 수 있다. 데이터세트를 만든 후에는, 위치는 변경할 수 없다. 

두가지 타입의 위치가 있다.
1. regional Location: 지리학적 특정 위치 (도쿄, 싱가폴, ....)
2. multi-region location: 지리학적 위치를 두개이상 포함하는 넓은 지역 (United states)

### Creating datasets

다음을 활용하여 dataset을 생성할 수 있다.
##### `bq mk` CLI command,

> `bq --location=[LOCATION] mk --dataset --default_table_expiration [INTEGER] --default_partition_expiration [INTEGER2] --description [DESCRIPTION] [PROJECT_ID]:[DATASET]`

`--location` flag와 함께 `bq mk` 커맨드를 실행하여 데이터 세트를 만든다.

[LOCATION]은 데이터세트의 위치입니다. 데이터세트가 생성된 후에는 위치를 변경할 수 없습니다.  
.bigqueryrc 파일을 사용하여 위치 기본값을 설정할 수 있습니다.


#### Listing datasets

다음을 활용하여 dataset 목록을 확인할 수 있다.
`bg ls` CLI command.

> `bq ls --format=prettyjson --project_id [PROJECT_ID]`

1. 기본 프로젝트 이외의 다른 프로젝트를 보고 싶으면, `--project_id [PROJECT_ID]`를 추가하면 된다.
2. [`anonymous datasets`](https://cloud.google.com/bigquery/docs/cached-results#how_cached_results_are_stored) 포함하여 한 프로젝트 안의 모든 데이터 세트를 보고싶다면,  `--all` or `-a`를 추가하면 된다.
3. `anonymous datasets`를 제외한 데이터셋을 보고싶으면, `--datasets` or `-d`를 추가하면 된다.
4. 포맷을 정의 할 수 있다. ` <none|json|prettyjson|csv|sparse|pretty>`  
  `--format=[FORMAT]`

#### Get information about datasets

데이터셋의 정보를 출력할 수 있다.  
`bg show` CLI command.  

`bq show --format=prettyjson [PROJECT_ID]:[DATASET]`

#### Updating dataset properties

다음의 데이터 셋 속성을 업데이트 할 수 있다.
- Description  
`bq update --description "[DESCRIPTION]" [PROJECT_ID]:[DATASET]`

- Default expiration time for new tables  
`bq update --default_table_expiration [INTEGER] [PROJECT_ID]:[DATASET]`
- Default partition expiration for new partitioned tables  
`bq update --default_partition_expiration [INTEGER] [PROJECT_ID]:[DATASET]`

- Access controls
- Labels  
[참고](https://cloud.google.com/bigquery/docs/updating-datasets)

# Table Schema

빈 테이블을 생성하거나, 테이블에 데이터를 넣을 때 테이블의 스키마를 정할 수 있다. 혹은, 스키마 auto-detection을 사용할 수 도 있다.   

Avro, Parquet, ORC Cloud Firestore export files, or Cloud Datastore export files을 로드할때는 자동으로 스키마가 생성된다.

다음 방법을 활용해서 테이블의 스키마를 지정할 수 있다.

1. Mannualy sepctify the schema: inline using the CLI
2. create a schema file in JSON format [참고](https://github.com/easi6dev/tada-driver-server/blob/master/stats/bq/customers/schema_customers.json)

#### Column names
컬럼 네임은 오직 문자, 숫자, 언더바(_)만 포함할 수 있고,  `_TABLE_`, `_FILE_`, `_PARTITION_`을 접두어로 포함할 수 없다.  
**또한, 대소문자가 다르더라도 중복된 컬럼명은 허용되지 않는다.**

#### Column description
각 컬럼은 description을 가질 수 있고, 최대 1024자 까지 지원된다.

### Standard SQL data types

|Data type |Description |
| --- | --- |
| Integer |	Numeric values without fractional components |
| Floating | point	Approximate numeric values with fractional components |
| Numeric |	Exact numeric values with fractional components |
| Boolean |	TRUE or FALSE (case insensitive) |
| String |	Variable-length character (Unicode) data |
| Bytes |	Variable-length binary data |
| Date |	A logical calendar date |
| Datetime |	A year, month, day, hour, minute, second, and subsecond |
| Time |	A time, independent of a specific date |
| Timestamp |	An absolute point in time, with microsecond precision |
| Struct | (Record)	Container of ordered fields each with a type (required) and field name (optional) |
| Geography |	A pointset on the Earth's surface (a set of points, lines and polygons on the WGS84 reference spheroid, with geodesic edges) |


### Mode
| Mode | Description |
| --- | ---  |
| Nullable | Column allows NULL avlues(default) |
| Required | Null values are not allowed |
| Repeated | Column contains an array of values of the specified type |

## Spectifying schemas

`bq load`, `bq mk` 명령어에서 스키마를 지정

`bq --location=[LOCATION] load --source_format=[FORMAT] [PROJECT_ID]:[DATASET].[TABLE_NAME] [PATH_TO_SOURCE] **[SCHEMA]**`

[SCHEMA]: schema file path 혹은 inline schema.
1. inline schema example  
`bq mk --table mydataset.mytable qtr:STRING,sales:FLOAT,year:STRING`
2. JSON schema file  
`bq --location=US load --source_format=CSV mydataset.mytable ./myfile.csv ./myschema.json`

# Spectifying nested and repeated columns

BigQuery는 데이터가 `denormalized`되었을 때 최고의 성능을 발휘할 수 있다.

`star schema`, `snowflake schema`와 같은 관계형 스키마를 유지하는 것 보다, 데이터를 `denormalized`하는 것이 `nested and repeated` 컬럼의 장점을 발휘 할 수 있다.

BigQuery는 `JSON`, `Avro`, `Coud Firestore export files`, `Cloud Datastore export files`와 같은 `object-based schemas`를 지원하는 소스포맷으로부터 `nested and repeated data`를 불러올 수 있다.

예를 들면, 관계형 데이터베이스는 분리된 테이블에서 모든 데이터를 관리하려 한다.
도서관의 책을 관리하는 관계형데이터베이스에는  `author_id` 같은 키가 `author` 를 `book` 에 연결해주는 데 사용된다.

`BigQuery` 에서는 `author` table 을 분리하지 않고, `book` 과 `author` 사이의 관계를 유지할 수 있다.

`author` 컬럼을 만들고, `nest field로` 작가의 이름, 생일 등등 정보를 생성한다. 

만약 `book` 이 여러개의 `author` 를 가진다면, `nested author culumn repeated를` 활용하면 된다.

### Limitations

`Nested and repeated` 스키마는 15레벨 이상의 데이터를 가질 수 없다.


#### Example 

`Nested and repeated` 예제.  
다음 테이블은 사람에 관한 정보를 담고, 다음과 같은 필드가 있다.

 - `id`
 - `first_name`
 - `last_name`
 - `dob` (date of birth)
 - `addresses` (a nested and repeated field)
    - `addresses`.`status` (current or previous)
    - `addresses`.`address`
    - `addresses`.`city`
    - `addresses`.`state`
    - `addresses`.`zip`
    - `addresses`.`numberOfYears` (years at the address)

`JSON` 데이터는 다음과 같을 것이다.

```JSON
{
  "id":"1",
  "first_name":"John",
  "last_name":"Doe",
  "dob":"1968-01-22",
  "addresses": [
    {
      "status":"current",
      "address":"123 First Avenue",
      "city":"Seattle",
      "state":"WA",
      "zip":"11111",
      "numberOfYears":"1"
    },
    {
      "status":"previous",
      "address":"456 Main Street",
      "city":"Portland",
      "state":"OR",
      "zip":"22222",
      "numberOfYears":"5"
    }
  ]
}

```

`SCHEMA` 파일을 다음과 같을 것이다.
```json
[
    {
        "name": "id",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "first_name",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "last_name",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "dob",
        "type": "DATE",
        "mode": "NULLABLE"
    },
    {
        "name": "addresses",
        "type": "RECORD",
        "mode": "REPEATED",
        "fields": [
            {
                "name": "status",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "address",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "city",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "state",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "zip",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "numberOfYears",
                "type": "STRING",
                "mode": "NULLABLE"
            }
        ]
    }
]
```

# Schema Auto-detection















