import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import dropdownImg from "../../../assets/icon-down-arrow.svg";
import dropdownImg2 from "../../../assets/icon-up-arrow.svg";

export default function PhonePrefix({ selectedTab }) {
  const [selectedPrefix, setSelectedPrefix] = useState("010");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (prefix) => {
    setSelectedPrefix(prefix);
    setIsDropdownOpen(false);
  };

  // selectedTab이 바뀌면 드롭다운을 닫음
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [selectedTab]);

  return (
    <>
      <PhonePrefixButton onClick={toggleDropdown}>
        <span>{selectedPrefix}</span>
        <img
          src={isDropdownOpen ? dropdownImg2 : dropdownImg}
          alt="dropdown icon"
        />
      </PhonePrefixButton>
      {isDropdownOpen && (
        <PrefixDropdown selectedTab={selectedTab}>
          {phonePrefixes.map((prefix) => (
            <PrefixOption key={prefix} onClick={() => handleSelect(prefix)}>
              {prefix}
            </PrefixOption>
          ))}
        </PrefixDropdown>
      )}
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

const PhonePrefixButton = styled.div`
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
  z-index: 10;
  height: 150px;
  overflow-y: auto;

  ${({ selectedTab }) =>
    selectedTab === "buyer" &&
    css`
      bottom: -120px;
    `}

  ${({ selectedTab }) =>
    selectedTab === "seller" &&
    css`
      bottom: 115px;
    `}
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
