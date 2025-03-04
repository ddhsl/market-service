import styled from "styled-components";
import OrdererForm from "./OrdererForm";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import FinalPaymentDetails from "./FinalPaymentDetails";

export default function ShippingInfo() {
  return (
    <section>
      <ShippingTitle>배송정보</ShippingTitle>
      <OrdererForm></OrdererForm>
      <ShippingForm></ShippingForm>
      <div style={{ marginTop: "70px", display: "flex", gap: "40px" }}>
        <div>
          <PaymentMethodTitle>결제수단</PaymentMethodTitle>
          <PaymentForm></PaymentForm>
        </div>
        <div style={{ flexGrow: "1" }}>
          <FinalPaymentTitle>최종결제 정보</FinalPaymentTitle>
          <FinalPaymentDetails></FinalPaymentDetails>
        </div>
      </div>
    </section>
  );
}

const ShippingTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
  border-bottom: 2px solid #c4c4c4;
`;
const PaymentMethodTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
`;

const FinalPaymentTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
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
