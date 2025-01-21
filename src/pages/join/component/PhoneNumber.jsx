import styled from "styled-components";
import PhonePrefix from "./PhonePrefix";

export default function PhoneNumber() {
  return (
    <PhoneNumberContainer>
      <PhonePrefix />
      <PhoneInput />
      <PhoneInput />
    </PhoneNumberContainer>
  );
}

const PhoneNumberContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const PhoneInput = styled.input`
  width: 152px;
  height: 54px;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  text-align: center;
  &:focus {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;
