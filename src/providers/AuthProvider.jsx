"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import React, { createContext, useContext, useEffect, useState } from "react";

// NOTE: Context 생성 / 초기값 정의해 Context 구조/함수 명시
const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  updateUser: async () => {},
});

// NOTE: Context 용이성을 위한 커스텀 훅
// 여러 Context 관리 시 Hook을 따로 설정해 import 관리도 가능
export const useAuth = () => {
  const context = useContext(AuthContext); // useAuth에 전역인증상태(user), 함수 가져오기

  // AuthProvider 내부가 아닌 곳에서 호출 시 에러 발생
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context; // user 상태와 auth 관련 함수 반환 // 여기에 value가 들어있는거임!
};

const AuthProvider = ({ children }) => {
  // 현재 로그인된 사용자 상태
  const [user, setUser] = useState(null);

  // 서에서 현재 유저 정보 get
  const getUser = async () => {
    try {
      const data = await userService.getMe();
      setUser(data);
    } catch (err) {
      console.error("사용자 정보 가져오기 실패: ", err);
      setUser(null); // 실패 시 상태 초기화
    }
  };

  // 로그인
  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      getUser();
    } catch (err) {
      console.error("로그인 실패: ", err); // 실패 시 상태 초기화
    }
  };

  // 회원가입
  const register = async (email, name, password) => {
    try {
      await authService.register(email, name, password);
      await login(email, password); // 회원가입 후 바로 로그인
    } catch (err) {
      console.error("회원가입 실패: ", err);
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null); // 로그인 상태 초기화
      // NOTE: 토큰 제거가 그냥 auth delete 보내면 되나..?
    } catch (err) {
      console.error("로그아웃 실패: ", err);
    }
  };

  // 사용자 정보 업데이트
  const updateUser = async (user) => {
    const updatedUser = await userService.updateMe(user);
    setUser(updatedUser); // 전역 상태 갱신
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
  // 오답노트: AuthContext에 대한 provider를 가져와야댐~~
};

export default AuthProvider;
