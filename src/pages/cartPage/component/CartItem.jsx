import styled from "styled-components";
import closeIcon from "../../../assets/icon-delete.svg";
import QuantityControl from "../../productDetails/component/QuantityControl";
import Button from "../../../components/Button";
import circleCheck from "../../../assets/circle-check-box-.png";

export default function CartItem() {
  return (
    <CartItemField>
      <CartItemWrap>
        <CartItemContent flex={5}>장바구니 아이템</CartItemContent>
        <CartItemContent flex={2.5}>
          <QuantityControl />
        </CartItemContent>
        <CartItemContent flex={2.5}>
          <PriceAndOrder>
            <span>가격</span>
            <Button>주문하기</Button>
          </PriceAndOrder>
        </CartItemContent>
      </CartItemWrap>
    </CartItemField>
  );
}

const CartItemField = styled.article`
  width: 100%;
  height: 200px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background-image: url(${closeIcon});
  background-repeat: no-repeat;
  background-position: right 10px top 15px;
  display: flex;
  align-items: center;
`;

const CartItemWrap = styled.ul`
  display: flex;
  align-items: center;
  width: 100%; /* 자식 항목들이 100% 너비를 차지하도록 */
  background-image: url(${circleCheck});
  background-repeat: no-repeat;
  background-position: left 30px center;
`;

const CartItemContent = styled.li`
  flex: ${({ flex }) => flex};
  display: flex;
  justify-content: center;
`;

const PriceAndOrder = styled.li`
  display: flex;
  flex-direction: column;
  width: 130px;
  align-items: center;
  gap: 25px;
  color: #eb5757;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  & > button {
    width: 130px;
    height: 40px;
  }
`;
