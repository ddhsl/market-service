import styled from "styled-components";
import { css } from "styled-components";

export default function AccountTabs({ formType, handleTab, selectedTab }) {
  const isJoin = formType === "join";

  return (
    <TabContainer>
      <h3 className="sr-only">
        {isJoin ? "회원가입 유형 선택하기" : "로그인 유형 선택하기"}
      </h3>
      <BuyerTab
        onClick={() => handleTab("buyer")}
        isSelected={selectedTab === "buyer"}
      >
        <span>{isJoin ? "구매회원가입" : "구매회원 로그인"}</span>
      </BuyerTab>
      <SellerTab
        onClick={() => handleTab("seller")}
        isSelected={selectedTab === "seller"}
      >
        <span>{isJoin ? "판매회원가입" : "판매회원 로그인"}</span>
      </SellerTab>
    </TabContainer>
  );
}

const TabContainer = styled.section`
  display: flex;
  position: relative;
  margin-top: 70px;
`;

const AccountTabStyle = styled.button`
  background-color: ${(props) => (props.isSelected ? "#fff" : "#f2f2f2")};
  position: relative;

  z-index: ${(props) => (props.isSelected ? "100" : "70")};
  width: 277px;
  height: 70px;
  border: 1px solid #c4c4c4;
  border-bottom: ${(props) =>
    props.isSelected ? "none" : "1px solid #c4c4c4"};
  border-radius: 10px 10px 0 0;
  cursor: pointer;
`;

const tabSpanStyle = css`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: center;
`;

const BuyerTab = styled(AccountTabStyle)`
  span {
    ${tabSpanStyle}
  }
`;

const SellerTab = styled(AccountTabStyle)`
  span {
    ${tabSpanStyle}
  }
`;
