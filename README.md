# Blog API와 Docker와 CI/CD 이용한 프로젝트

- 배포 주소: http://52.78.138.193:3000/api-docs

## 주요 기능

- **CRUD 기능**: 블로그 포스트에 대한 생성(Create), 읽기(Read), 수정(Update), 삭제(Delete) 기능 제공.
- **인증**: JWT(JSON Web Token)를 사용한 인증 시스템으로 보안 강화.
- **데이터베이스**: AWS RDS에 MySQL을 연동하여 데이터 저장.
- **Docker 환경**: Docker를 통해 손쉽게 애플리케이션을 실행 가능.
- **CI/CD**: GitHub Actions을 이용한 자동화 배포가 가능.
- **Swagger API**: Swagger를 이용하여 개발자 간의 협업을 돕습니다.

## 프로젝트 사용 방법

1. 프로젝트를 클론합니다.
2. docker-compose up --build를 이용해 도커 컨테이너와 이미지를 생성하여 서버를 실행합니다.
3. env 파일
   SERVER_PORT =
   JWT_SECRET_KEY =
   HASH_ROUNDS =

   DB_HOST =
   DB_PORT =
   DB_USERNAME =
   DB_PASSWORD =
   DB_NAME =
   DB_SYNC =

   MYSQL_ROOT_PASSWORD = 도커 MySQL 컨테이너 패스워드
   MYSQL_DATABASE = 도커 MySQL 컨테이너 데이터베이스

### 배포 과정

이 프로젝트는 Docker와 CI/CD를 이용해 AWS EC2에 배포되었습니다.

### 기술 스택

백엔드: Nest.js
데이터베이스: MySQL (AWS RDS)
배포: Docker, AWS EC2, GitHub Actions

#### Docker란?

- 컨테이너를 사용하여 각각의 프로그램을 분리된 환경에서 실행 및 관리할 수 있는 툴

#### Docker의 특징

- 가벼운 가상화: 도커 컨테이너는 호스트 운영체제의 커널을 공유하고 애플리케이션 실행에 필요한 최소한의 파일만을 포함. 이를 통해 메모리와 CPU 자원을 적게 사용하면서 빠르게 실행할 수 있다.
- 이식성: 도커 이미지를 사용하면 개발 환경, 테스트 환경, 배포 환경 등 서로 다른 환경에서 애플리케이션을 동일하게 실행이 가능하다. 이식성이 높아 어디서나 실행할 수 있다.
- 독립성: 각 컨테이너는 독립된 환경을 제공하므로, 서로 다른 애플리케이션이 동일한 호스트에서 실행되어도 서로 간섭하지 않는다.
- 이미지: 도커 컨테이너는 도커 이미지를 기반으로 생성됩니다. 이미지는 애플리케이션의 실행에 필요한 모든 것을 포함한 정적인 파일이며, 이 이미지를 기반으로 여러 개의 컨테이너를 만들어 낸다.

#### CI/CD란?

- Continuous Integration, Continuous Deployment라는 의미를 가지고 있다. 테스트, 통합, 배포의 과정을 자동화하는 걸 의미한다.

#### CI/CD의 특징

- 새로운 기능을 추가하는 일이 많으면 Commit을 하고, Merge를 하고 서버에서 다시 pull을 받아야 한다. 이 과정이 많아지면 귀찮기 때문에 CI/CD를 사용하여 귀찮은 일을 줄인다.
