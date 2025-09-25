import { defaultFetch, cookieFetch } from "@/lib/fetchClient";

export const authService = {
  // 쿠키 인증을 사용하는 로그인
  login: (email, password) =>
    cookieFetch("auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // 쿠키를 사용하는 로그아웃
  logout: () =>
    cookieFetch("auth/logout", {
      method: "POST",
    }),

  // 회원가입
};
