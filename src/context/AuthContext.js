import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../constants/api";

// AuthContext 생성
const AuthContext = createContext({
  isLoggedIn: false,
  isSeller: false,
  login: () => {},
  logout: () => {},
  loginError: "",
  setLoginError: () => {},
  loginFormData: {
    username: "",
    password: "",
  },
  setLoginFormData: () => {},
  refreshAccessToken: () => {}, // 리프레시 토큰 갱신 함수 추가
});

// AuthContextProvider 컴포넌트
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // 쿠키에서 토큰 가져오기
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    const userType = getCookie("userType");

    if (accessToken && refreshToken && userType) {
      setIsLoggedIn(true);
      setIsSeller(userType === "seller");
    }
  }, []);

  const login = (userType, accessToken, refreshToken) => {
    setIsLoggedIn(true);
    setIsSeller(userType === "seller");
    // 쿠키에 토큰 저장
    document.cookie = `accessToken=${accessToken}; Max-Age=86400; Path=/;`;
    document.cookie = `refreshToken=${refreshToken}; Max-Age=86400; Path=/;`;
    document.cookie = `userType=${userType}; Max-Age=86400; Path=/;`;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsSeller(false);
    // 쿠키에서 토큰 제거
    document.cookie = "accessToken=; Max-Age=0; Path=/;";
    document.cookie = "refreshToken=; Max-Age=0; Path=/;";
    document.cookie = "userType=; Max-Age=0; Path=/;";
    document.cookie = "csrftoken=; Max-Age=0; Path=/;";
    // 로컬스토리지 데이터 제거
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("user_type");
  };

  // 리프레시 토큰을 사용하여 엑세스 토큰 갱신 함수
  const refreshAccessToken = async () => {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
      setIsLoggedIn(false); // 리프레시 토큰 없으면 로그아웃 처리
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.access;

        // 새로운 액세스 토큰을 쿠키에 저장
        document.cookie = `accessToken=${newAccessToken}; Max-Age=86400; Path=/;`;

        return newAccessToken;
      } else {
        throw new Error("리프레시 토큰 갱신 실패");
      }
    } catch (error) {
      console.error("리프레시 토큰 갱신 오류:", error);
      setIsLoggedIn(false); // 토큰 갱신 실패 시 로그아웃 처리
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isSeller,
        login,
        logout,
        loginError,
        setLoginError,
        loginFormData,
        setLoginFormData,
        refreshAccessToken, // 리프레시 토큰 갱신 함수 제공
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

// 쿠키에서 특정 이름의 값을 가져오는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
