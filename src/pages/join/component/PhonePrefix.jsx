import styled, { css } from "styled-components";
import dropdownImg from "../../../assets/icon-down-arrow.svg";

export default function PhonePrefix() {
  return (
    <>
      <PhonePrefixButton>
        <span>010</span>
        <img src={dropdownImg} alt="dropdown icon" />
      </PhonePrefixButton>
      <PrefixDropdown>
        {phonePrefixes.map((prefix) => (
          <PrefixOption key={prefix}>{prefix}</PrefixOption>
        ))}
      </PrefixDropdown>
    </>
  );
}

const phonePrefixes = ["010", "011", "016", "017", "018", "019"];

export const mobileStyle = css`
  width: 152px;
  height: 54px;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
`;

const PhonePrefixButton = styled.button`
  ${mobileStyle}
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 53px;
  }

  img {
    margin-left: 37px;
  }
  &:hover {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;

const PrefixDropdown = styled.div`
  ${mobileStyle}
  background-color: #fff;
  position: absolute;
  bottom: -120px;
  z-index: 10;
  height: 150px;
  overflow-y: auto;
`;

const PrefixOption = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
