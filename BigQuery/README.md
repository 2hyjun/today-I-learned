# Big Query Overview

1. [Dataset & Schema](./1.Dataset%20%26%20Schema.md)
2. [Table](./2.Table.md)
3. [Views](./3.Views.md)
4. [Queries](./4.Queries.md)


# BigQuery ? 

BigQuery는 데이터를 `denormalized`하여 저장하여 장점을 발휘한다.  

여러 테이블 사이에서 각 테이블의 특정 값을 통해 테이블끼리 관계를 만드는 기존의 Relational DB와 다르게, 모든 데이터를 하나의 테이블에 저장하고 BigQuery의 `nested and repeated` 컬럼 기능을 활용하여 강력한 성능을 발휘할 수 있다. 

`Client Library (JAVA, GO, PYTHON, NODEJS)`, `BigQuery WEB UI`, `GCP Console`, `CLI tool`의 다양한 인터페이스를 지원한다.

BigQuery는 `JSON`, `Avro`, `Coud Firestore export files`, `Cloud Datastore export files`와 같은 `object-based schemas`를 지원하는 소스포맷으로부터 `nested and repeated data`를 불러올 수 있다.

`CSV` or `NEW_DELIMITED_JSON` 등 형식의 파일로 업로드 / 다운로드가 가능하고,   
파일, Google Sheet, Google Drive, 특정 테이블에 쿼리 결과물을 저장할 수 있다.
