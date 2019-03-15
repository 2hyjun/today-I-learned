FROM mysql:5.7

RUN mkdir -p /usr/db

WORKDIR /usr/db

COPY ./test_db/load_salaries1.dump /docker-entrypoint-initdb.d/
COPY ./test_db/load_salaries2.dump /docker-entrypoint-initdb.d/
COPY ./test_db/load_salaries3.dump /docker-entrypoint-initdb.d/
COPY ./test_db/load_titles.dump /docker-entrypoint-initdb.d/
COPY ./test_db/load_departments.dump /docker-entrypoint-initdb.d/
COPY ./test_db/load_dept_emp.dump /docker-entrypoint-initdb.d/
COPY ./test_db/load_dept_manager.dump /docker-entrypoint-initdb.d/
COPY ./test_db/load_employees.dump /docker-entrypoint-initdb.d/

COPY ./test_db/employees.sql /docker-entrypoint-initdb.d/
COPY ./test_db/show_elapsed.sql /docker-entrypoint-initdb.d/


EXPOSE 3306
