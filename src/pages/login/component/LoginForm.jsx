import styled from "styled-components";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import InputForm from "../../../components/InputForm";
import Button from "../../../components/Button";
import AlertMsg from "../../../components/AlertMsg";
import { useAuth } from "../../../context/AuthContext";
import { API_BASE_URL } from "../../../constants/api";
export default function LoginForm({ selectedTab }) {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const defaultFormData = { username: "", password: "" };
    setLoginFormData(defaultFormData);
    setLoginError("");
  }, [selectedTab]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  async function handleLoginSubmit(e) {
    e.preventDefault();

    if (!loginFormData.username.trim()) {
      setLoginError("아이디를 입력해 주세요.");
      return;
    }
    if (!loginFormData.password.trim()) {
      setLoginError("비밀번호를 입력해 주세요.");
      return;
    }
    setLoginError("");

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const data = await response.json();

      if (response.ok && data.access) {
        // user_type 확인
        const expectedType =
          selectedTab.toUpperCase() === "BUYER" ? "BUYER" : "SELLER";
        if (data.user.user_type !== expectedType) {
          setLoginError(
            `해당 계정은 ${
              selectedTab === "buyer" ? "구매" : "판매"
            } 회원이 아닙니다.`
          );
          return;
        }

        // 전역 상태 업데이트
        login(data.user.user_type.toLowerCase(), data.access, data.refresh);

        localStorage.setItem("name", data.user.name);
        localStorage.setItem("username", data.user.username);

        alert("로그인에 성공했습니다!");
        window.location.href = "/";
      } else {
        setLoginError(data.error || "로그인에 실패했습니다.");
      }
    } catch (error) {
      setLoginError("서버 오류가 발생했습니다.");
    }
  }

  return (
    <InputForm onSubmit={handleLoginSubmit}>
      <label htmlFor="id" className="sr-only">
        아이디를 입력하세요
      </label>
      <LoginInput
        type="text"
        name="username"
        placeholder="아이디"
        value={loginFormData.username}
        onChange={handleLoginChange}
      />
      <label htmlFor="pw" className="sr-only">
        비밀번호를 입력하세요
      </label>
      <LoginInput
        type="password"
        name="password"
        placeholder="비밀번호"
        value={loginFormData.password}
        onChange={handleLoginChange}
      />
      {loginError && <AlertMsg>{loginError}</AlertMsg>}
      <Button
        type="submit"
        width="480px"
        height="60px"
        fontSize="18px"
        marginTop="28px"
      >
        로그인
      </Button>
    </InputForm>
  );
}

const LoginInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #c4c4c4;
  border-radius: 0;
  height: 60px;
  padding-left: 0;
`;
