FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# 헬스 체크 추가
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD curl -f https://www.xn--9r2b17b.shop || exit 1

# 앱 시작 명령
CMD ["npm", "run", "start:dev"]
