import styled from "styled-components";
import Input from "../../../components/Input";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import AlertMsg from "../../../components/AlertMsg";

export default function LoginForm() {
  return (
    <InputField action="">
      <label htmlFor="id" className="sr-only">
        아이디를 입력하세요
      </label>
      <LoginInput type="text" name="id" placeholder="아이디" />
      <label htmlFor="pw" className="sr-only">
        비밀번호를 입력하세요
      </label>
      <LoginInput type="password" name="pw" placeholder="비밀번호" />
      <AlertMsg>아이디를 입력해 주세요.</AlertMsg>
      <Button width="480px" height="60px" fontSize="18px" marginTop="28px">
        로그인
      </Button>
    </InputField>
  );
}

const LoginInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #c4c4c4;
  border-radius: 0;
  height: 60px;
  padding-left: 0;
`;
