import styled from "styled-components";
import { useState } from "react";
import Input from "../../../components/Input";
import InputForm from "../../../components/InputField";
import Button from "../../../components/Button";
import AlertMsg from "../../../components/AlertMsg";

export default function LoginForm() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      setLoginError("아이디를 입력해 주세요.");
      return;
    }
    if (!userPw.trim()) {
      setLoginError("비밀번호를 입력해 주세요.");
      return;
    }

    setLoginError(""); // 에러 초기화
    console.log("로그인 요청:", { userId, userPw });
  };

  return (
    <InputForm onSubmit={handleLogin}>
      <label htmlFor="id" className="sr-only">
        아이디를 입력하세요
      </label>
      <LoginInput
        type="text"
        name="id"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <label htmlFor="pw" className="sr-only">
        비밀번호를 입력하세요
      </label>
      <LoginInput
        type="password"
        name="pw"
        placeholder="비밀번호"
        value={userPw}
        onChange={(e) => setUserPw(e.target.value)}
      />
      {loginError && <AlertMsg>{loginError}</AlertMsg>}
      <Button width="480px" height="60px" fontSize="18px" marginTop="28px">
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
