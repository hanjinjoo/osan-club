# 오산대학교 동아리 통합 포털

2026학년도 2학기 동아리 업무의 시작점이 되는 독립 정적 웹사이트입니다.

## 구현된 기능

- 기존 오산대학교 자료실(`osan/#rules`)과 동일한 디자인 언어(네이비 `#003876`, `#00234d`, Noto Sans KR·Playfair Display, 각진 카드)로 통일한 PC·모바일 반응형 메인 화면
- 공식 자료실, 지원금 사용 규정, 모니터링 일정 예약, 자주 묻는 질문(FAQ)으로 연결되는 주요 서비스 카드
- 2026-2학기 운영 안내, 단계별 업무 가이드, 문의처
- 추후 개발할 '정산해보기' 비활성 상태 표시 (링크 없음)
- 서비스/공지 목록의 데이터 모듈 관리
- 모바일 메뉴·키보드 접근성·Reduced Motion 지원
- 기능 분리와 Node 내장 테스트

## 폴더 구조

- `index.html` — 고정 HTML 레이아웃 (JS가 중단돼도 상단 주요 링크/기본 안내 표시)
- `assets/css/` — 토큰, 기본 스타일, 레이아웃, 컴포넌트 스타일
- `assets/js/main.js` — 초기화 진입점
- `assets/js/navigation.js` — 모바일 메뉴
- `assets/js/service-renderer.js` — 서비스와 공지 렌더링
- `data/services.js` — **서비스 URL/이름/준비 상태 관리의 기준 파일**
- `data/notices.js` — 공지 요약 관리
- `tests/` — 서비스 링크, 구조, 파일 존재 검증

## 디자인 수정 기록 (v1.1)

- 원본 자료실의 색상·서체·영문 세리프 헤딩·각진 서비스 카드·네이비 버튼·연한 회청색 안내 구역을 신규 포털 전반에 적용
- 인위적인 플로팅 카드, 그라디언트, 둥근 배지형 장식을 제거하고 단정한 대학 공식 홈페이지 분위기로 개편
- 스크롤 전에는 히어로와 조화되는 투명 헤더, 스크롤 후에는 흰색 고정 헤더 적용
- 서비스 연결 3종·준비 중 항목·모바일 메뉴 동작은 유지
- 원본 자료실이나 모니터링 예약 운영 사이트의 소스코드는 변경하지 않음

## 로컬 실행

```bash
python3 -m http.server 5173
# http://localhost:5173
```

> ES Modules를 사용하므로 `index.html`을 `file://`로 직접 열면 서비스 카드가 나오지 않을 수 있습니다. 로컬 서버로 열거나 GitHub Pages에 배포하세요.

## 테스트

```bash
npm test
```

## GitHub Pages 배포

1. GitHub에서 공개 저장소 `osan-club`을 생성합니다.
2. 이 폴더 안의 파일과 폴더를 `main` 브랜치 루트에 업로드합니다.
3. Repository Settings → Pages → Deploy from a branch → `main` / `/(root)`를 선택합니다.
4. 사이트 주소: `https://hanjinjoo.github.io/osan-club/`

현재 연결된 GitHub 앱은 신규 저장소 생성 기능을 제공하지 않으므로 이 배포 단계는 저장소 생성 후 진행해야 합니다.

## 새로운 서비스 추가

`data/services.js`에 `SERVICES` 항목을 추가합니다. 미완성 서비스라면 `status:'planned'` 및 `href:null`로 설정하세요. 운영 개시 전 기존 배포 URL을 확인해 `status:'active'`와 `href`를 지정해야 합니다.

> `service-renderer.js`의 안전 URL 허용 규칙은 `hanjinjoo.github.io`와 성과공유회 운영 학생 페이지의 정확한 출처·루트 경로만 허용합니다. 다른 Workers 호스트와 관리자 경로는 허용하지 않습니다.

## 기존 시스템 보존

- `https://hanjinjoo.github.io/osan/` (서류·정산 자료실)
- `https://hanjinjoo.github.io/osan-monitoring-2026/` (모니터링 예약 및 결과관리)

위 두 운영 저장소와 Supabase DB/Storage를 이 프로젝트에서 변경하지 않습니다.

## 이후 작업

- 2단계: 원본 자료실을 다운로드 중심으로 개편하고 상세 규정 페이지를 분리합니다.
- 3단계: `정산해보기` 시뮬레이션 A안(전공·취업용, 지출 판단부터 제출까지)을 구현합니다.
- 각 단계는 착수 전 프롬프트 형식의 상세 작업 보고 후 진행합니다.

## 2단계 페이지 분리 연동 (2026-10-21)

- 서류·정산 양식: `https://hanjinjoo.github.io/osan/`
- 지원금 사용 규정: `https://hanjinjoo.github.io/osan/rules/`
- 모니터링: 기존 URL 유지
- 포털의 다른 페이지로 이동하는 링크는 새 탭에서 열린다. 같은 페이지 내 목차는 현재 탭 유지.

## FAQ 연동 (2026-10-21)

- 학생용 자주 묻는 질문: `https://hanjinjoo.github.io/osan-club-faq/`
- 메인 화면의 서비스 카드 및 상단 메뉴에 연결, 새 탭 열기 적용.
- JavaScript 미지원 환경에서도 `noscript` 바로가기 제공.
- FAQ 관리자 기능은 FAQ 전용 저장소·Supabase에서 별도 관리; 통합 포털에는 인증정보를 저장하지 않음.
- 기존 모니터링 예약 및 자료실 저장소는 변경하지 않음.

## 성과공유회 연결 (2026-10-27)

- 서비스 카드, 상단·모바일 메뉴, JavaScript 미지원 바로가기에 운영 학생 페이지 연결: https://osan-showcase-2026.jspsil092045.workers.dev/
- 제출 마감 안내: 2026년 11월 20일. 서버 자동 마감 여부와는 별도입니다.
- 관리자 주소·비밀값·테스트 서버는 포털에 연결하지 않습니다.
