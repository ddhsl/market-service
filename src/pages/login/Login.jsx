import styled from "styled-components";
import logo from "../../assets/Logo-hodu.png";
import AccountTaps from "../../components/AccountTaps";
import LoginForm from "./component/LoginForm";
import AccountLinks from "./component/AccountLinks";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [selectedTab, setSelectedTab] = useState("buyer"); // selectedTab 상태 추가

  const handleTab = (tab) => {
    setSelectedTab(tab); // Tab 클릭 시 selectedTab 업데이트
  };

  return (
    <LoginWrap>
      <h1>
        <Link to="/">
          <LogoImg src={logo} alt="HODU" />
        </Link>
      </h1>
      <AccountTaps
        formType="login"
        handleTab={handleTab}
        selectedTab={selectedTab}
      />
      <LoginForm />
      <AccountLinks />
    </LoginWrap>
  );
}

const LoginWrap = styled.article`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 238px;
  height: 74px;
`;
