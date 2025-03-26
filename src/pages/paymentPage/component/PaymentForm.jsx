import styled from "styled-components";
import { useOrder } from "../../../context/OrderContext";

export default function PaymentForm() {
  const { orderData, updateOrderData } = useOrder();

  return (
    <PaymentMethodWrap>
      <PaymentMethodItem>
        <StyledLabel>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={orderData.paymentMethod === "card"}
            onChange={() => updateOrderData({ paymentMethod: "card" })}
          />
          신용/체크카드
        </StyledLabel>
      </PaymentMethodItem>
      <PaymentMethodItem>
        <StyledLabel>
          <input
            type="radio"
            name="payment"
            value="deposit"
            checked={orderData.paymentMethod === "deposit"}
            onChange={() => updateOrderData({ paymentMethod: "deposit" })}
          />
          무통장 입금
        </StyledLabel>
      </PaymentMethodItem>
      <PaymentMethodItem>
        <StyledLabel>
          <input
            type="radio"
            name="payment"
            value="phone"
            checked={orderData.paymentMethod === "phone"}
            onChange={() => updateOrderData({ paymentMethod: "phone" })}
          />
          휴대폰 결제
        </StyledLabel>
      </PaymentMethodItem>
      <PaymentMethodItem>
        <StyledLabel>
          <input
            type="radio"
            name="payment"
            value="naverpay"
            checked={orderData.paymentMethod === "naverpay"}
            onChange={() => updateOrderData({ paymentMethod: "naverpay" })}
          />
          네이버페이
        </StyledLabel>
      </PaymentMethodItem>
      <PaymentMethodItem>
        <StyledLabel>
          <input
            type="radio"
            name="payment"
            value="kakaopay"
            checked={orderData.paymentMethod === "kakaopay"}
            onChange={() => updateOrderData({ paymentMethod: "kakaopay" })}
          />
          카카오페이
        </StyledLabel>
      </PaymentMethodItem>
    </PaymentMethodWrap>
  );
}

const PaymentMethodWrap = styled.ul`
  display: flex;
  gap: 20px;
  border: 2px solid #c4c4c4;
  border-left: none;
  border-right: none;
  width: 760px;
  padding: 18px;
  padding-left: 5px;
`;

const PaymentMethodItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;
