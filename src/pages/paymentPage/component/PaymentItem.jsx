import styled from "styled-components";

export default function PaymentItem({
  selectedItems,
  totalPrice,
  totalShippingFee,
}) {
  return (
    <>
      {selectedItems.map((item, index) => (
        <PaymentItemContainer key={index}>
          <PaymentItemWrapper>
            <PaymentItemContent
              $flex={4}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "36px",
              }}
            >
              <img src={item.product?.image} alt={item.product?.name} />
              <div>
                <p>{item.product?.seller?.store_name}</p>
                <p>{item.product?.name}</p>
                <p>수량: {item.quantity}개</p>
              </div>
            </PaymentItemContent>
            <PaymentItemContent $flex={2} style={{ color: "var(--sub-color)" }}>
              -
            </PaymentItemContent>
            <PaymentItemContent $flex={2} style={{ color: "var(--sub-color)" }}>
              {totalShippingFee.toLocaleString()}원
            </PaymentItemContent>
            <PaymentItemContent $flex={2} style={{ fontWeight: "bold" }}>
              {(totalPrice + totalShippingFee).toLocaleString()}원
            </PaymentItemContent>
          </PaymentItemWrapper>
        </PaymentItemContainer>
      ))}
    </>
  );
}

const PaymentItemContainer = styled.article`
  width: 100%;
  padding-left: 10px;
  border-bottom: 1px solid #c4c4c4;
`;

const PaymentItemWrapper = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  height: 130px;
`;

const PaymentItemContent = styled.li`
  flex: ${({ $flex }) => $flex};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    & > p:nth-child(1) {
      font-size: 14px;
      color: var(--sub-color);
    }
    & > p:nth-child(2) {
      font-size: 18px;
    }
    & > p:nth-child(3) {
      font-size: 14px;
      color: var(--sub-color);
    }
  }
  & > img {
    width: 104px;
    height: 104px;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
  }
`;
