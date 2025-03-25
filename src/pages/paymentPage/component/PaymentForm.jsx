import styled from "styled-components";

export default function PaymentForm({ paymentMethod, setPaymentMethod }) {
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <PaymentMethodWrap>
      <PaymentMethodItem>
        <StyledLabel>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={handlePaymentChange}
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
            checked={paymentMethod === "deposit"}
            onChange={handlePaymentChange}
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
            checked={paymentMethod === "phone"}
            onChange={handlePaymentChange}
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
            checked={paymentMethod === "naverpay"}
            onChange={handlePaymentChange}
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
            checked={paymentMethod === "kakaopay"}
            onChange={handlePaymentChange}
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
