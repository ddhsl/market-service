import styled from "styled-components";
import { useState } from "react";
import Button from "../../../components/Button";
import checkbox from "../../../assets/check-box.svg";
import checkboxFill from "../../../assets/check-fill-box.svg";

export default function FinalPaymentDetails({
  totalPrice,
  totalShippingFee,
  handleOrderSubmit,
}) {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreementChange = () => {
    setIsAgreed((prev) => !prev);
  };

  return (
    <PaymentDetails>
      <section>
        <h3 className="sr-only">결제정보</h3>
        <div>
          <span>- 상품금액</span>
          <span>
            {totalPrice.toLocaleString()}
            <span>원</span>
          </span>
        </div>
        <div>
          <span>- 할인금액</span>
          <span>
            0 <span>원</span>
          </span>
        </div>
        <div
          style={{
            borderBottom: "1px solid #c4c4c4",
            paddingBottom: "18px",
          }}
        >
          <span>- 배송비</span>
          <span>
            {totalShippingFee.toLocaleString()}
            <span>원</span>
          </span>
        </div>
        <div>
          <span>- 결제금액</span>
          <span style={{ fontSize: "24px", color: "#EB5757" }}>
            {" "}
            {(totalPrice + totalShippingFee).toLocaleString()}원
          </span>
        </div>
      </section>
      <section>
        <h3 className="sr-only">동의 및 결제하기</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <img
            onClick={handleAgreementChange}
            src={isAgreed ? checkboxFill : checkbox}
            alt="주문 내용에 동의"
          />

          <p>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleOrderSubmit}
            style={{
              backgroundColor: isAgreed ? "" : "#D3D3D3",
              cursor: isAgreed ? "pointer" : "not-allowed",
            }}
          >
            결제하기
          </Button>
        </div>
      </section>
    </PaymentDetails>
  );
}

const PaymentDetails = styled.div`
  border: 2px solid var(--main-color);
  border-radius: 10px;
  margin-bottom: 150px;

  section:nth-child(1) {
    padding: 34px;
    padding-bottom: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  section:nth-child(1) > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
      & > span {
        color: var(--sub-color);
        font-weight: normal;
        margin-left: 4px;
        font-size: 14px;
      }
    }
  }

  section:nth-child(2) {
    background-color: #f2f2f2;
    padding: 30px;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    flex-direction: column;

    & > img {
      width: 220px;
    }

    & > div > button {
      width: 220px;
      height: 68px;
      font-size: 24px;
      margin-top: 30px;
    }
  }
`;
