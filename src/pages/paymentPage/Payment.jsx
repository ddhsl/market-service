import styled from "styled-components";
import Header from "../../components/Header";
import { CartField } from "../cartPage/Cart";
import { CartTitle } from "../cartPage/Cart";
import { CartLabel } from "../cartPage/Cart";
import PaymentItem from "./component/PaymentItem";
import ShippingInfo from "./component/ShippingInfo";

const paymentLabels = [
  {
    text: "상품정보",
    flex: 4,
  },
  {
    text: "할인",
    flex: 2,
  },
  {
    text: "배송비",
    flex: 2,
  },
  {
    text: "주문금액",
    flex: 2,
  },
];
export default function Payment() {
  return (
    <>
      <Header />
      <PaymentMain>
        <PaymentTitle>주문/결제하기</PaymentTitle>
        <PaymentField>
          {paymentLabels.map(({ text, flex }) => (
            <PaymentLabel key={text} $flex={flex}>
              {text}
            </PaymentLabel>
          ))}
        </PaymentField>
        <PaymentItem />
        <TotalPrice>
          <span>총 주문금액</span>
          <span>46500원</span>
        </TotalPrice>
        <ShippingInfo />
      </PaymentMain>
    </>
  );
}

const PaymentMain = styled.main`
  padding: 0 6%;
`;

const PaymentTitle = styled(CartTitle)``;

const PaymentField = styled(CartField)`
  background-image: none;
  margin-bottom: 16px;
`;

const PaymentLabel = styled(CartLabel)``;

const TotalPrice = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 96px;
  gap: 10px;
  & > span:nth-child(2) {
    color: #eb5757;
    font-weight: bold;
    font-size: 24px;
  }
`;
