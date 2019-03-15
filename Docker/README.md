# 컨테이너 실행하기

### 도커 실행 명령어
> `docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]`

자주 사용되는 옵션들
| 옵션      | 설명                         |
| ------- | -------------------------- |
| `-d`    | `dtached mode`, 백그라운드 모드   |
| `-p`    | 호스트와 컨테이너의 포트를 연결(포워딩)     |
| `-v`    | 호스트와 컨테이너의 디렉토리를 연결(마운트)   |
| `-e`    | 컨테이너 내에서 사용할 환경변수 설정       |
| `-name` | 컨테이너 이름 설정                 |
| `-rm`   | 프로세스 종료시 컨테이너 자동 제거        |
| `-it`   | `-t` + `-i`, 터미널 입력을 위한 옵션 |
| `-link` | 컨테이너 연결                    |


--------------

### Ubuntu 16.04 Container

> `docker run ubuntu:16.04`

`run` 명령어를 사용하면
1. 사용할 이미지가 저장되어있는지 확인
2. 없다면 다운로드 `pull`
3. 컨테이너 생성 `create`
4. 시작 `start`

위 예제는 `ubuntu:16.04`를 다운로드 한 후 컨테이너가 실행된다.  컨테이너는 정상적으로 실행됐지만 명령어를 전달하지 않았기 때문에 컨테이너는 생성되자마자 종료된다. **컨테이너는 프로세스 이기 때문에 실행중인 프로세스가 없으면 컨테이너는 종료된다.**

이번에는 `/bin/bash` 명령어를 입력하여 컨테이너를 실행해보자.

> `docker run --rm -it ubuntu:16.04 /bin/bash`

1. 컨테이너 내부에 들어가기 위해 `/bin/bash` bash 쉘을 실행시키고
2. 키보드 입력을 위해 `-it` 옵션을 준다.
3. 추가적으로 프로세스가 종료되면 컨테이너가 자동으로 삭제되도록 `--rm` 옵션도 추가.
4. `exit`으로 bash 쉘을 종료하면 컨테이너도 같이 종료된다.

```bash
root@09ec29829e5c:/# cat /etc/issue
Ubuntu 16.04.5 LTS \n \l

root@09ec29829e5c:/#
```

----------

### redis container

`redis`는 메모리 기반의 다양한 기능을 가진 스토리지이다.  
6379 포트로 통신하며 telnet 명령어로 테스트해 볼 수 있다.  
`redis` 컨테이너는 백그라운드 모드로 실행하기 위해 `-d` 옵션을 추가하고   
`-p`옵션을 추가하여 컨테이너의 포트를 호스트의 포트로 연결해보겠다.


> ```
> docker run -d -p 1234:6379 redis
>
>
> ec50bca89b7995a4e835901d297c9169ad8db6a079975e07fcf5251fb86e87cf
> ```

`-d` 옵션을 주었기 때문에 컨테이너를 실행하자마자 컨테이너의 ID(ec50bca89b799...)를 보여주고 다시 쉘로 돌아온다. 백그라운드 모드에서 동작하고 있고, 컨테이너 ID를 이용하여 컨테이너를 제어할 수 있다.

`-p` 옵션을 이용하여 호스트의 `1234포트`를 컨테이너의 `6379포트`로 연결하였고, localhost의 1234번 포트로 접속하면 redis를 사용할 수 있다.

> ```
> telnet localhost 1234
>
> Trying ::1...
> Connected to localhost.
> Escape character is '^]'.
> set mykey hello
> +OK
> get mykey
> $5
> hello

--------------

### MySQL 5.7 Container

`MySQL` 컨테이너를 실행하자.  
`-e` 옵션을 이용하여 환경변수를 설정하고 `--name` 옵션을 이용하여 컨테이너에 읽기 어려운 ID대신 이름을 부여하자.

환경변수를 통해 컨테이너에 옵션을 부여한다.  
1. `MYSQL_ALLOW_EMPTY_PASSWORD`를 true로 설정하여 패스워드 없이 root계정을 만들고,
2. 컨테이너의 이름을 `mysql`로 할당하고
3. 백그라운드 모드로 띄우고
4. `3306`포트를 사용하자.

> ```
> docker run -d -p 3306:3306 \
>   -e MYSQL_ALLOW_EMPTY_PASSWORD=true \
>   --name mysql \
>   mysql:5.7
> ```

-----------------

### WorkdPress Container

워드프레스는 데이터베이스가 필요하기 때문에 조금 복잡한 형태를 띈다.

바로 전에 생성했던 MySQL 컨테이너에 워드프레스 데이터베이스를 만들고 WordPress 컨테이너를 실행할 때 `--link` 옵션을 이용하여 MySQL 컨테이너를 연결하자.

`--link` 옵션은 환경변수와 IP정보를 공유하는데 링크한 컨테이너의 IP정보를 `/etc/hosts`에 자동으로 입력하므로 워드프레스 컨테이너가 MySQL 데이터베이스의 정보를 알 수 있게 된다.

먼저, 워드프레스용 데이터베이스를 생성하고 워드프레스 컨테이너를 실행한다. 호스트의 `8080포트`를 컨테이너의 `80포트`로 연결하고 MySQL 컨테이너와 연결한 후 각종 데이터베이스 설정 정보를 환경변수로 입력한다.

> ```bash
> #create mysql database
> $ mysql -h127.0.0.1 -uroot
> create database wp CHARACTER SET utf8;
> grant all privileges on wp.* to wp@'%' identified by 'wp';
> flush privileges;
> quit
> ```

> ```bash
> # run wordpress container
> docker run -d -p 8080:80 \
>   --link mysql:mysql \
>   -e WORDPRESS_DB_HOST=mysql \
>   -e WOrDPRESS_DB_NAME=wp \
>   -e WORDPRESS_DB_USER=wp \
>   -e WORDPRESS_DB_PASSWORD=wp \
>   wordpress
> ```