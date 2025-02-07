import styled from "styled-components";

export default function PaymentItem() {
  return (
    <PaymentItemField>
      <PaymentItemField>
        <PaymentItemWrap>
          <PaymentItemContent flex={4}>아이템</PaymentItemContent>
          <PaymentItemContent flex={2} style={{ color: "var(--sub-color)" }}>
            -
          </PaymentItemContent>
          <PaymentItemContent flex={2} style={{ color: "var(--sub-color)" }}>
            무료배송
          </PaymentItemContent>
          <PaymentItemContent flex={2} style={{ fontWeight: "bold" }}>
            17,500원
          </PaymentItemContent>
        </PaymentItemWrap>
      </PaymentItemField>
    </PaymentItemField>
  );
}

const PaymentItemField = styled.article`
  width: 100%;
  height: 130px;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  align-items: center;
`;

const PaymentItemWrap = styled.ul`
  display: flex;
  align-items: center;
  width: 100%; /* 자식 항목들이 100% 너비를 차지하도록 */
`;

const PaymentItemContent = styled.li`
  flex: ${({ flex }) => flex};
  display: flex;
  justify-content: center;
  font-size: 18px;
`;
