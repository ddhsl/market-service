import styled from "styled-components";
import ShippingInput from "./ShippingInput";
import PhoneInput from "./PhoneInput";
import { ShippingTitle, ShippingInputWrap } from "./ShippingInfo";

export default function OrdererForm() {
  return (
    <section>
      <OrdererTitle>주문자 정보</OrdererTitle>
      <form action="">
        <ShippingInputWrap>
          <label htmlFor="orderer-name">이름</label>
          <ShippingInput id="orderer-name" name="ordererName" />
        </ShippingInputWrap>
        <ShippingInputWrap>
          <label htmlFor="orderer-phone">휴대폰</label>
          <PhoneInput idPrefix="orderer-phone" namePrefix="ordererPhone" />
        </ShippingInputWrap>
        <ShippingInputWrap>
          <label htmlFor="orderer-email">이메일</label>
          <ShippingInput id="orderer-email" name="ordererEmail" />
        </ShippingInputWrap>
      </form>
    </section>
  );
}

export const OrdererTitle = styled(ShippingTitle)`
  font-size: 18px;
  padding-bottom: 8px;
  margin-bottom: 0;
  margin-top: 40px;
`;
