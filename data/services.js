/** 공개 사이트 연결 정보의 단일 관리 지점. 새 업무가 생기면 이 배열에 추가한다. */
export const SERVICES = Object.freeze([
  Object.freeze({id:'documents',category:'DOCUMENTS',title:'서류 · 정산 양식',description:'동아리 활동과 정산에 필요한 최신 공식 서식을 내려받으세요.',icon:'documents',tone:'blue',status:'active',href:'https://hanjinjoo.github.io/osan/',cta:'서류 확인하기'}),
  Object.freeze({id:'rules',category:'GUIDELINES',title:'지원금 사용 규정',description:'지원금 사용 기준과 법인카드·증빙 관련 안내를 확인하세요.',icon:'rules',tone:'teal',status:'active',href:'https://hanjinjoo.github.io/osan/rules/',cta:'규정 확인하기'}),
  Object.freeze({id:'monitoring',category:'MONITORING',title:'모니터링 일정 예약',description:'동아리 활동 현장 방문 일정을 신청하고 예약 내역을 확인하세요.',icon:'calendar',tone:'violet',status:'active',href:'https://hanjinjoo.github.io/osan-monitoring-2026/',cta:'예약하러 가기'}),
  Object.freeze({id:'faq',category:'FAQ',title:'자주 묻는 질문',description:'동아리 운영, 지원금, 정산 및 모니터링 관련 질문과 답변을 찾아보세요.',icon:'faq',tone:'blue',status:'active',href:'https://hanjinjoo.github.io/osan-club-faq/',cta:'FAQ 확인하기'}),
  Object.freeze({id:'showcase',category:'CLUB SHOWCASE',title:'2026 동아리 성과공유회',description:'동아리 발표자료와 발표영상을 ZIP 파일로 제출하세요. 제출 마감: 11월 20일.',icon:'calendar',tone:'blue',status:'active',href:'https://osan-showcase-2026.jspsil092045.workers.dev/',cta:'발표자료 제출하기'}),
  Object.freeze({id:'settlement-lab',category:'LEARNING LAB',title:'정산해보기',description:'가상 결제와 서류 작성으로 정산 전 과정을 직접 연습해 보세요.',icon:'game',tone:'amber',status:'planned',href:null,cta:'서비스 준비 중'})
]);
