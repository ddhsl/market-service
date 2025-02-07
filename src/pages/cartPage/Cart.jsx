import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CartItem from "./component/CartItem";
import circleCheckImg from "../../assets/circle-check-box-.png";
import PaymentOverview from "./component/PaymentOverview";
// import EmptyCartMessage from "./component/EmptyCartMessage";

const cartLabels = [
  {
    text: "상품정보",
    flex: 5,
  },
  {
    text: "수량",
    flex: 2.5,
  },
  {
    text: "상품금액",
    flex: 2.5,
  },
];
export default function Cart() {
  return (
    <>
      <Header />
      <CartMain>
        <CartTitle>장바구니</CartTitle>
        <CartField>
          {cartLabels.map(({ text, flex }) => (
            <CartLabel key={text} $flex={flex}>
              {text}
            </CartLabel>
          ))}
        </CartField>
        {/* <EmptyCartMessage /> */}
        <CartItem />
        <PaymentOverview />
        <Button>주문하기</Button>
      </CartMain>
    </>
  );
}

const CartMain = styled.main`
  padding: 0 6%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > button {
    width: 220px;
    height: 68px;
    font-size: 24px;
    margin: 40px auto 160px;
  }
`;

export const CartField = styled.div`
  width: 100%;
  height: 60px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-bottom: 35px;
  font-size: 18px;
  display: flex;
  align-items: center;
  background-image: url(${circleCheckImg});
  background-repeat: no-repeat;
  background-position: left 30px center;
`;

export const CartTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin: 54px auto;
  margin-bottom: 52px;
`;

export const CartLabel = styled.p`
  flex: ${({ $flex }) => $flex};
  text-align: center;
`;
