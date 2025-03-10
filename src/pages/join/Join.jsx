import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/Logo-hodu.png";
import { Link } from "react-router-dom";
import AccountTaps from "../../components/AccountTaps";
import JoinForm from "./component/JoinForm";

export default function Join() {
  const [selectedTab, setSelectedTab] = useState("buyer"); // selectedTab 상태 추가

  const handleTab = (tab) => {
    setSelectedTab(tab);
    console.log(tab);
  };

  return (
    <JoinWrap>
      <h1>
        <Link to="/">
          <LogoImg src={logo} alt="HODU" />
        </Link>
      </h1>
      <AccountTaps
        formType="join"
        handleTab={handleTab}
        selectedTab={selectedTab}
      />
      <JoinForm formType="join" selectedTab={selectedTab} />
    </JoinWrap>
  );
}

const JoinWrap = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 110px;

  & > p {
    color: var(--sub-color);
    margin-top: 10px;
    margin-bottom: 34px;
    margin-left: 20px;
    line-height: 1.3;
    width: 454px;
  }

  & > p > span {
    text-decoration: underline;
    font-weight: 700;
  }
`;

const LogoImg = styled.img`
  width: 238px;
  height: 74px;
  margin-top: 70px;
`;
