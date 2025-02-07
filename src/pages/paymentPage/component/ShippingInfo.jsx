import styled from "styled-components";
import OrdererForm from "./OrdererForm";
import ShippingForm from "./ShippingForm";

export default function ShippingInfo() {
  return (
    <section>
      <ShippingTitle>배송정보</ShippingTitle>
      <OrdererForm></OrdererForm>
      <ShippingForm></ShippingForm>
    </section>
  );
}

export const ShippingTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
  margin-bottom: 40px;
  border-bottom: 2px solid #c4c4c4;
`;

export const ShippingInputWrap = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  align-items: center;

  label {
    width: 170px;
  }
`;
