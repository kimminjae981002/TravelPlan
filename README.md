# 🌐 LLM을 활용한 여행 일정 생성 프로젝트

![화면 캡처 2024-10-04 020708](https://github.com/user-attachments/assets/d7fe73c5-87ad-4d05-b08b-80057389b5e5)

---

- 🏠 배포 주소: https://main--kimminjae98.netlify.app

## 프로젝트 소개

---

- **프로젝트명**: TravelPlan
- **주제**: AI를 이용하여 자동으로 여행을 계획해주는 서비스

- **프로젝트 개요**: TravelPlan은 사용자 지정 여행 일정을 자동으로 생성하도록 설계된 AI 기반 서비스입니다. 여정 생성을 위해 OpenAI의 힘을 활용하여 사용자의 선호도에 따라 맞춤형 여행 계획을 제공합니다.

## ✨ 주요 특징

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

## 🚀 배포 세부 정보

- 백엔드 : AWS EC2에서 NestJS, Docker, CI/CD로 배포되었습니다.
  - 안전한 통신을 위해 Nginx를 사용하여 HTTPS를 활성화합니다 .
- 프런트엔드 : 빠르고 확장 가능한 전송을 위해 Netlify를 사용하여 서버리스로 배포되었습니다.

### 🛠️ 기술 스택

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
