import styled from "styled-components";
import { css } from "styled-components";

export default function AccountTaps({ formType }) {
  const isJoin = formType === "join";

  return (
    <section>
      <h3 className="sr-only">
        {isJoin ? "회원가입 유형 선택하기" : "로그인 유형 선택하기"}
      </h3>
      <BuyerTab>
        <span>{isJoin ? "구매회원가입" : "구매회원 로그인"}</span>
      </BuyerTab>
      <SellerTab>
        <span>{isJoin ? "판매회원가입" : "판매회원 로그인"}</span>
      </SellerTab>
    </section>
  );
}

const AccountTabStyle = styled.button`
  width: 275px;
  height: 80px;
  border: 1px solid #c4c4c4;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  margin-top: 70px;
`;

const tabSpanStyle = css`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: center;
`;

const BuyerTab = styled(AccountTabStyle)`
  background-color: #fff;
  position: relative;
  z-index: 100;
  height: 60px;
  top: -10px;
  border-bottom: 2px solid #fff;
  span {
    ${tabSpanStyle}
  }
`;

const SellerTab = styled(AccountTabStyle)`
  background-color: #f2f2f2;
  span {
    ${tabSpanStyle}
    position: relative;
    top: -9px;
  }
`;
