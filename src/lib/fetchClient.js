/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */
export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // NOTE: fetch 기본 옵션
  // 1. 모든 요청에 JSON 타입 헤더 기본으로 추가
  // 2. Next.js 기본 캐싱 전략을 정적 캐싱으로 설정
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    // Next.js 기본 캐싱 활성화
    cache: "force-cache",
  };

  // NOTE: 사용자 정의 options와 기본 옵션 병합 (왜..?)
  // defaultOptions를 먼저 적용 후 사용자가 전달한 options가 있으면 덮어씀
  // headers 같은 중첩 객체는 spread 후 병합 (아니면 전체가 덮어써짐)
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  // 응답 본문이 있는지 확인
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: response.status, ok: response.ok };
};

/**
 * 쿠키 인증 fetch 클라이언트
 */
export const cookieFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json', // Content-Type 헤더 설정
    },
    credentials: 'include', // 쿠키 전송을 위한 설정
    cache: 'no-store', // 서버 컴포넌트에서도 매번 재검증을 캐싱하는 옵션
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  // 응답 본문이 있는지 확인
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: response.status, ok: response.ok };
};
