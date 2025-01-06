import styled from "styled-components";
import logo from "../../assets/Logo-hodu.png";
import { Link } from "react-router-dom";
import AccountTaps from "../../components/AccountTaps";
import JoinForm from "./component/JoinForm";
import Button from "../../components/Button";
import checkImg from "../../assets/check-box.svg";

export default function Join() {
  return (
    <JoinWrap>
      <h1>
        <Link to="/">
          <LogoImg src={logo} alt="HODU" />
        </Link>
      </h1>
      <AccountTaps formType="join" />
      <JoinForm />
      <p>
        호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 대한
        내용을 확인하였고 동의합니다.
      </p>
      <Button width="480px" height="60px" fontSize="18px">
        가입하기
      </Button>
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
  }

  & > p::before {
    content: url(${checkImg});
    margin-right: 8px;
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
