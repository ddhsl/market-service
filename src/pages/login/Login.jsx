import styled from "styled-components";
import logo from "../../assets/Logo-hodu.png";
import AccountTaps from "../../components/AccountTaps";
import LoginForm from "./component/LoginForm";
import AccountLinks from "./component/AccountLinks";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <LoginWrap>
      <h1>
        <Link to="/">
          <LogoImg src={logo} alt="HODU" />
        </Link>
      </h1>
      <AccountTaps formType="login" />
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
