import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/Logo-hodu.png";
import { Link } from "react-router-dom";
import AccountTaps from "../../components/AccountTaps";
import JoinForm from "./component/JoinForm";
import Button from "../../components/Button";
import checkImg from "../../assets/check-box.svg";

export default function Join() {
  const [selectedTab, setSelectedTab] = useState("buyer"); // selectedTab 상태 추가

  const handleTab = (tab) => {
    //(tab) 함수의 매개변수
    setSelectedTab(tab); // Tab 클릭 시 selectedTab 업데이트할 수 있도록 함수를 생성함
  }; //클릭이벤트에서 setSelectedTab="buyer"과 같이 직접 상태 변경하는 것보다 함수 생성이 유지보수 & 가독성 향상

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
      <JoinForm formType="join" selectedTab={selectedTab} />{" "}
      {/* selectedTab 전달 */}
      <CheckImg src={checkImg} alt="동의하기" />
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

const CheckImg = styled.img`
  margin-right: 10px;
  position: relative;
  top: 28px;
  right: 228px;
`;
