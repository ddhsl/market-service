import styled from "styled-components";

export default function ShippingInfo() {
  return (
    <ShippingSection>
      <ShippingTitle>배송정보</ShippingTitle>
      <OrdererInfo>
        <OrdererTitle>주문자 정보</OrdererTitle>
      </OrdererInfo>
      <ShippingDetails>
        <ShippingDetailsTitle>배송지 정보</ShippingDetailsTitle>
      </ShippingDetails>
    </ShippingSection>
  );
}

const ShippingSection = styled.section``;

const ShippingTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
  margin-bottom: 40px;
  border-bottom: 2px solid #c4c4c4;
`;

const OrdererInfo = styled.section``;

const OrdererTitle = styled(ShippingTitle)`
  font-size: 18px;
  padding-bottom: 8px;
  margin-bottom: 0;
`;

const ShippingDetailsTitle = styled(OrdererTitle)``;

const ShippingDetails = styled.section``;
