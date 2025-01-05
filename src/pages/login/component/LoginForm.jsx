import styled from "styled-components";
import Input from "../../../components/Input";
import InputField from "../../../components/InputField";

export default function LoginForm() {
  return (
    <InputField action="">
      <label htmlFor="id" className="sr-only">
        아이디를 입력하세요
      </label>
      <Input
        type="text"
        name="id"
        placeholder="아이디"
        border="none"
        borderBottom="1px solid #c4c4c4"
      />
      <label htmlFor="pw" className="sr-only">
        비밀번호를 입력하세요
      </label>
      <Input
        type="password"
        name="pw"
        placeholder="비밀번호"
        border="none"
        borderBottom="1px solid #c4c4c4"
      />
      <AlertMsg>아이디를 입력해 주세요.</AlertMsg>
      <LoginBtn>로그인</LoginBtn>
    </InputField>
  );
}

const AlertMsg = styled.p`
  color: #eb5757;
  font-weight: 500;
  margin-top: 26px;
  margin-left: 36px;
  display: none;
`;

const LoginBtn = styled.button`
  width: 480px;
  height: 60px;
  background-color: var(--main-color);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  margin: 36px 35px;
  text-align: center;
`;
