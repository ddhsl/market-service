import styled from "styled-components";

export default function EmptyCartMessage() {
  return (
    <EmptyCartMessageWrap>
      <h3>장바구니에 담긴 상품이 없습니다.</h3>
      <p>원하는 상품을 장바구니에 담아보세요!</p>
    </EmptyCartMessageWrap>
  );
}

const EmptyCartMessageWrap = styled.div`
  & > h3 {
    font-size: 18px;
    font-weight: bold;
    margin-top: 200px;
    margin-bottom: 17px;
  }

  & > p {
    font-size: 14px;
    color: var(--sub-color);
    text-align: center;
  }
`;
