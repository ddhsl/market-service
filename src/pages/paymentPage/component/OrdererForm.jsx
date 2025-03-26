import styled from "styled-components";
import ShippingInput from "./ShippingInput";
import PhoneInput from "./PhoneInput";
import { ShippingInputWrap } from "./ShippingInfo";
import { useOrder } from "../../../context/OrderContext"; // OrderContext에서 useOrder 가져오기

export default function OrdererForm({ onSubmit }) {
  const { orderData, updateOrderData } = useOrder();

  return (
    <section>
      <OrdererSubTitle>주문자 정보</OrdererSubTitle>
      <form onSubmit={onSubmit}>
        <ShippingInputWrap>
          <label htmlFor="orderer-name">이름</label>
          <ShippingInput
            id="orderer-name"
            name="ordererName"
            value={orderData.ordererName}
            onChange={(e) => updateOrderData({ ordererName: e.target.value })}
          />
        </ShippingInputWrap>

        <ShippingInputWrap>
          <label htmlFor="orderer-phone">휴대폰</label>
          <PhoneInput
            idPrefix="orderer-phone"
            namePrefix="ordererPhone"
            value={orderData.ordererPhoneNumber}
            onChange={(e) =>
              updateOrderData({ ordererPhoneNumber: e.target.value })
            }
            isOrderer={true}
          />
        </ShippingInputWrap>

        <ShippingInputWrap>
          <label htmlFor="orderer-email">이메일</label>
          <ShippingInput
            id="orderer-email"
            name="ordererEmail"
            value={orderData.ordererEmail}
            onChange={(e) => updateOrderData({ ordererEmail: e.target.value })}
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
