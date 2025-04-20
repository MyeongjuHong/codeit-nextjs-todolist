// 토큰 갱신 함수
export async function refreshAccessToken() {
  try {
    const response = await fetch(
      "https://learn.codeit.kr/api/link-service/auth/refresh",
      {
        method: "POST",
        credentials: "include", // 중요: 쿠키를 포함해서 요청
      },
    );

    if (!response.ok) {
      throw new Error("토큰 갱신 실패");
    }

    return true; // 갱신 성공
  } catch (error) {
    console.error("토큰 갱신 오류:", error);
    return false; // 갱신 실패
  }
}

// API 요청 함수 (토큰 만료 시 자동 갱신 시도)
export async function fetchWithTokenRefresh(url, options = {}) {
  // 기본 옵션 설정
  const fetchOptions = {
    ...options,
    credentials: "include", // 항상 쿠키 포함
  };

  // 첫 번째 요청 시도
  let response = await fetch(url, fetchOptions);

  // 401 Unauthorized 오류 발생 시 토큰 갱신 시도
  if (response.status === 401) {
    const refreshSuccess = await refreshAccessToken();

    // 토큰 갱신 성공 시 원래 요청 재시도
    if (refreshSuccess) {
      response = await fetch(url, fetchOptions);
    }
  }

  return response;
}

// 로그아웃 함수
export async function logout() {
  try {
    const response = await fetch(
      "https://learn.codeit.kr/api/link-service/auth/logout",
      {
        method: "POST",
        credentials: "include",
      },
    );

    return response.ok;
  } catch (error) {
    console.error("로그아웃 오류:", error);
    return false;
  }
}
