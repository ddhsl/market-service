import styled from "styled-components";
import InputField from "../../../components/InputField";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import pwCheckImg from "../../../assets/icon-check-off.svg";
import SellerJoin from "./SellerJoin";
import PhoneNumber from "./PhoneNumber";

export default function JoinForm({ formType, selectedTab }) {
  const isJoin = formType === "join"; // formType이 join인 경우에만 SellerJoin을 표시

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
      <PwInput id="pw" name="pw" />

      <InputTitle>비밀번호 재확인</InputTitle>
      <label htmlFor="pw" className="sr-only">
        비밀번호를 재입력하세요
      </label>
      <PwInput id="pw" name="pw" />

      <InputTitle style={{ marginTop: "40px" }}>이름</InputTitle>
      <label htmlFor="userName" className="sr-only">
        이름을 입력하세요
      </label>
      <Input id="userName" name="userName" />

      <InputTitle>휴대폰번호</InputTitle>
      <PhoneNumber />
      {/* formType이 'join'이고, seller 탭이 선택됐을 때만 SellerJoin 컴포넌트를 표시 */}
      {isJoin && selectedTab === "seller" && <SellerJoin />}
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

const PwInput = styled(Input)`
  background-image: url(${pwCheckImg});
  background-repeat: no-repeat;
  background-position: right 13px center;
`;
