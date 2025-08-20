# 🎬 YouTube Clone (youtube_clone)

React + Vite + TailwindCSS 기반으로 구현한 **YouTube 클론 프로젝트**입니다.  
YouTube Data API를 활용하여 영상 검색, 채널 정보, 채널 영상 표시 등을 지원합니다.

---

## 🚀 배포 링크
👉 [Demo 사이트](https://wonderful-gelato-b5bd9e.netlify.app/) (예시)

---

## ⚒️ 기술 스택

### 프론트엔드
- [React 19](https://react.dev/)
- [React DOM](https://react.dev/)
- [React Router DOM 7](https://reactrouter.com/)
- [React Query (TanStack Query)](https://tanstack.com/query/latest)
- [TailwindCSS 4](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://axios-http.com/)
- [date-fns](https://date-fns.org/)
- [timeago.js](https://github.com/hustcc/timeago.js)

### 개발 도구
- [Vite 6](https://vite.dev/)
- [ESLint 9](https://eslint.org/) (React Hooks 플러그인 포함)

---

## ✨ 주요 기능
- 🔍 **영상 검색** : YouTube API를 통한 키워드 검색
- 📺 **영상 상세 보기** : 조회수, 업로드일, 채널 영상 목록 표시
- 👤 **채널 정보** : 채널 썸네일
- 🕒 **시간 표시** : `timeago.js`와 `date-fns`로 상대/절대 시간 변환
- 📱 **반응형 UI** : TailwindCSS로 모바일/데스크탑 대응

---

## 📚 실행 방법

```bash
# 저장소 클론
git clone https://github.com/songsong8040/youtube_clone.git
cd youtube_clone

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview