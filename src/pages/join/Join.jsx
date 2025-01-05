import styled from "styled-components";
import logo from "../../assets/Logo-hodu.png";
import { Link } from "react-router-dom";
import AccountTaps from "../../components/AccountTaps";

export default function Join() {
  return (
    <article>
      <h1>
        <Link to="/">
          <LogoImg src={logo} alt="HODU" />
        </Link>
        <AccountTaps formType="join" />
      </h1>
    </article>
  );
}

const LogoImg = styled.img`
  width: 238px;
  height: 74px;
`;
