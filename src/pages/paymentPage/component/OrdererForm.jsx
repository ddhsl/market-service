import styled from "styled-components";
import ShippingInput from "./ShippingInput";
import PhoneInput from "./PhoneInput";
import { ShippingInputWrap } from "./ShippingInfo";

export default function OrdererForm({
  ordererName,
  setOrdererName,
  ordererPhone,
  setOrdererPhone,
  ordererEmail,
  setOrdererEmail,
  onSubmit,
}) {
  return (
    <section>
      <OrdererSubTitle>주문자 정보</OrdererSubTitle>
      <form onSubmit={onSubmit}>
        <ShippingInputWrap>
          <label htmlFor="orderer-name">이름</label>
          <ShippingInput
            id="orderer-name"
            name="ordererName"
            value={ordererName}
            onChange={(e) => setOrdererName(e.target.value)}
          />
        </ShippingInputWrap>
        <ShippingInputWrap>
          <label htmlFor="orderer-phone">휴대폰</label>
          <PhoneInput
            idPrefix="orderer-phone"
            namePrefix="ordererPhone"
            value={ordererPhone}
            onChange={setOrdererPhone}
          />
        </ShippingInputWrap>
        <ShippingInputWrap>
          <label htmlFor="orderer-email">이메일</label>
          <ShippingInput
            id="orderer-email"
            name="ordererEmail"
            value={ordererEmail}
            onChange={(e) => setOrdererEmail(e.target.value)}
          />
        </ShippingInputWrap>
      </form>
    </section>
  );
}

const OrdererSubTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 8px;
  margin-top: 40px;
  border-bottom: 2px solid #c4c4c4;
`;
