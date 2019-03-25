# `Kubernetes`

> source from [IBM developerWorks Meetup](https://www.youtube.com/watch?v=l42GttmnnZ4)

`Kubernetes(k8s)`: `Container Orchestration` tool.

### 1. `Container Orchestration`이 왜 필요한가?

컨테이너를 하나하나 돌리는 것은 간단하다. 하지만, 컨테이너 수가 기하급수 적으로 늘어나고 한 호스트에 올릴 수 없는 상황이 되면 컨테이너 간의 서비스 디스커버리, 네트워킹을 고려해야한다.

> `Container Orchestration`: 여러개의 컨테이너, 여러개의 호스트를 하나로 묶어서 관리할 수 있도록 하는 것.

하는 일:

- 스케쥴링
- Cluster 관리
- 서비스 discovery (클러스터 안의 수많은 워커노드 중에 A 서비스는 어디서 돌아가는가?)
- 모니터링
- 설정
- ... 등등

### 2. `Kubernetes` 란?

> Kubernetes: 구글이 오픈소스로 공개한 `Container Orchestration` tool.  
> 다양한 클라우드, 베어메탈 환경을 지원한다. AWS, Azure, IBM 모두 `Kubernetes`를 지원한다.

#### 주요 장점

- `Automatic binpacking`  
  가용성에 대한 희생 없이, 리소스 사용과 제약 사항을 기준으로 자동으로 컨테이너를 스케쥴

  - `k8s`는 클러스터안에 여러개의 워커노드를 돌리는 것을 기본으로.
  - 클러스터에 어떤 워커노드에 컨테이너를 올릴것인가?

- `Self-healing`  
  자동으로 문제가 발생한 노드의 컨테이너를 대채 (룰/정책에 따른 헬스 체킹)
  - 노드가 죽었을 때, 다른 노드에다가 기존 노드에 있던 컨테이너를 옮겨주고.. 등등
- `Horizontal scaling`  
  CPU와 메모리와 같은 리소스 사요에 따라 자동으로 애플리케이션을 확장  
  경우에 따라서, 사용자 정의 측정 값을 기준으로 한 동적 확장 가능
  - 확장!
- `Service discovery and load balancing`  
  container에 고유한 ip부여
  여러 개의 Container를 묶어 단일 service로 부여하는 경우 단일 DNS name으로 접근하도록 로드 밸런싱 제공.
  - 수 많은 노드들에서 특정 노드를 찾고, load balancing하는 것은 어려운 일.
  - 네이밍 서비스를 제공해서 처리할 수 있도록 함.
- `Automatic rollouts and rollbacks`  
  다운타움 없이 application의 새로운 버전 및 설정에 대한 롤아웃/롤백 가능
  - 롤 아웃되는 버전만 선택해주면 자동으로 롤아웃/롤백.
- `Secret and configuration management`
  애플리케이션의 secret과 configuration 정보를 이미지와 독립 적으로 구분하여 별도의 이미지 재생성 없이 관리.
  - 기존의 암호, secret key등은 file로 저장했음.
  - stateless 방식에도 맞지 않고, 관리하기도 불편했음.
  - 이런 정보들을 저장하고 관리하는 시스템도 제공해줌.
- `Storage orchestration`  
  소프트웨어 정의 저장장치 (software defined storage)를 기반으로 로컬, 외부 저장소를 동일한 방법으로 컨테이너에 마운트 가능.
  - 생성된 데이터 들을 어디에 저장할 것인가? 사용자 자료를 어디에 저장할 것인가?
  - 쿠버네티스에서 관리 가능
  - 로컬 저장소, 외부 저장소(s3, sds 등)에 저장 가능
  - 자동 용량 할당, IOPS 지정 등등..
- Batch execution
  CI 워크로드와 같은 Batch성 작업 지원  
  crontab 형식으로 스케쥴링 가능
  - `batch`: **대량의 데이터**를 **특정 시간**에 **일괄적으로** 처리

### 3. Kubernetes 아키텍쳐

![아키텍쳐](./img/1.architecture.png)

- `Node`: 일하는 곳. 워크로드가 올라감.
- `Registry`: `Docker hub`같은 역할. 컨테이너에 돌릴 이미지를 저장하는 곳.
- `Kubernetes Cluster Control Plane`(**`master`**): 워커노드를 관리.
  - `API 서버`: 사용자 UI 제공, 사용자 명령을 받을 수 있도록 제공.
  - `Controller Manager Server`
  - `Scheduler Server`: 스케쥴링, 워커노드 추가, 제거, 셀프 힐링 등등..
  - `etcd`: 사용자들이 입력한 정보들('내가 이런 서버들을 올릴거야') 저장

#### `Kubernetes Cluster Control Plane (master)`

- `kube-apiserver`  
  클러스터와 상호작용을 위한 API 서버
- `kube-scheduler`  
  workder node에 있는 pod를 스케쥴한다.
- `kube-controller-manager`  
  Deployment, Replication Controller.
- `kube-cloud-manager`  
  Public Cloud provider 연동 관리
- `etcd`  
  저장소. 설정 및 데이터를 저장.

#### `Kubernetes Node (Worker or Minion)`

- `Container runtime`  
  컨테이너 실행을 위한 Engine (`Docker Engine`)
- `kubelet`  
  Master의 명령을 전달하는 k8s 에이전트
- `kube-proxy`
  인바운드 혹은 아웃바운드 트래픽에 대한 네트워크 프록시 담당.
- `cAdvisor`  
  cAdvisor: `Container Advisor`  
  리소스 사용/성능 통계 제공 (우리 한가해요!, 바빠죽겠어요 뒤질래요?)

### 4. Kubernetes Object Model

- k8s object에 대한 설정, manifest를 `YAML` 형식으로 작성.
- Master 노드의 API Server를 통해 클러스터에 k8s object를 생성.

> `Kubernetes`에서 관리하는 모든 것은 `object`로 관리한다.

#### Kubernetes Object API Version

- `Alpha` -> `Beta` -> `Stable`
  - apps/v1alpha
  - apps/v1alpha2
  - apps/v1beta
  - ...
  - apps/v1

ex)

```yaml
apiVersion: apps/v1beta2
kind: Deployment
metadata: ...
```

#### Kubernetes Objects

- Basic Objects

  - `Pod`
  - `Service`
  - `Volume`
  - `Namespace`

- Controllers
  - `ReplicaSet`
  - `ReplicationController`
  - `Deployment`
  - `StatefulSets`
  - `DaemonSet`
  - `Garbage Collection`
  - `Jobs`
  - `CronJob`

#### Pod

- Worker 노드에서 실행되는 컨테이너의 집합
- 하나의 pod에는 한 개 이상의 서비스로 지정 될 수 있음.
- 각각의 pod은 고유한 IP가 할당됨. (내부 IP)
- 하나의 pod내에는 PID namespace, network와 hostname을 공유

컨테이너를 돌리는 단위(?)  
일반적으로 한개의 컨테이너에 한개
