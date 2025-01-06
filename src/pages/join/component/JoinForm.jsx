import styled from "styled-components";
import InputField from "../../../components/InputField";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import SellerJoin from "./SellerJoin";
import AlertMsg from "../../../components/AlertMsg";

export default function JoinForm() {
  return (
    <InputField>
      <InputTitle>아이디</InputTitle>
      <label htmlFor="id" className="sr-only">
        아이디를 입력하세요
      </label>
      <InputGroup>
        <Input id="id" name="id" width="346px" />
        <Button>중복확인</Button>
      </InputGroup>

      <InputTitle>비밀번호</InputTitle>
      <label htmlFor="pw" className="sr-only">
        비밀번호를 입력하세요
      </label>
      <Input id="pw" name="pw" />

      <InputTitle>비밀번호 재확인</InputTitle>
      <label htmlFor="pw" className="sr-only">
        비밀번호를 재입력하세요
      </label>
      <Input id="pw" name="pw" />

      <InputTitle style={{ marginTop: "40px" }}>이름</InputTitle>
      <label htmlFor="userName" className="sr-only">
        이름을 입력하세요
      </label>
      <Input id="userName" name="userName" />

      <InputTitle>휴대폰번호</InputTitle>
      <label htmlFor="mobile" className="sr-only">
        휴대폰 번호를 입력하세요
      </label>
      <Input id="mobile" name="mobile" />
      <SellerJoin />
    </InputField>
  );
}

export const InputTitle = styled.p`
  margin-bottom: 10px;
  color: var(--sub-color);
`;

export const InputGroup = styled.div`
  display: flex;
  & > Button {
    width: 122px;
    height: 54px;
    margin-left: 12px;
  }
`;
