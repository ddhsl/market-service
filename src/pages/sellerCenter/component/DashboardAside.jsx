import styled from "styled-components";
export default function DashboardAside() {
  return (
    <aside>
      <AsideWrap>
        <li>판매중인 상품(3)</li>
        <li>주문/배송</li>
        <li>문의/리뷰</li>
        <li>통계</li>
        <li>스토어 설정</li>
      </AsideWrap>
    </aside>
  );
}

const AsideWrap = styled.ul`
  display: flex;
  flex-direction: column;
  width: 250px;
  & > li {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    padding-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 700;
  }

  & > li:hover {
    background-color: #effff3;
  }
  & > li:active {
    background-color: var(--main-color);
    color: #fff;
  }
`;
