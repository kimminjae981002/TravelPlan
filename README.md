# 🌐 AI를 이용한 여행 계획 생성 프로젝트

---

그림

- 🏠 배포 주소: https://main--kimminjae98.netlify.app

## 프로젝트 소개

---

- **프로젝트명**: TravelPlan
- **주제**: AI를 이용하여 자동으로 여행을 계획해주는 서비스

## 주요 기능

---

- **CRUD 기능**: 블로그 게시글에 대한 생성(Create), 읽기(Read), 수정(Update), 삭제(Delete) 기능 제공
- **Kakao API**: Kakao API를 이용하여 지역에 대한 관광지/맛집 목록 기능
- **OpenAI API**: OpenAi API를 이용하여 여행 일정 생성 기능
- **인증**: JWT(JSON Web Token)를 사용한 인증 시스템으로 보안 강화
- **데이터베이스**: AWS RDS에 MySQL을 연동하여 데이터 저장
- **Docker 환경**: Docker를 통해 손쉽게 애플리케이션을 실행 가능
- **CI/CD**: GitHub Actions을 이용한 자동화 배포가 가능
- **AWS S3**: AWS S3 버킷에 이미지 저장 기능

---

### 배포 과정

---

백엔드는 Nest.js를 통해 Docker와 CI/CD를 이용해 AWS EC2에 배포되었고,
프론트엔드 Netlify와 연동하기 위해 nginx를 이용해 HTTPS를 적용하였습니다.
프론트엔드는 서버리스 아키텍처인 Netlify를 통해 배포되었습니다.

### 기술 스택

---

**Front-end**
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>

**Back-end**
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white">
<img src="https://img.shields.io/badge/Typeorm-262627?style=for-the-badge&logo=Typeorm&logoColor=white">

**CI/CD**
<img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white">

**Database**
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

**DevOps**
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/AWS%20EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/AWS%20RDS-527FFF?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/AWS%20IAM-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white">
