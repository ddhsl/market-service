import styled from "styled-components";
import cartMinusIcon from "../../../assets/minus-icon_2.png";
import cartPlusIcon from "../../../assets/plus-icon_2.png";

const overviewData = [
  { label: "총 상품 금액", value: "46,500" },
  { label: "상품 할인", value: "0" },
  { label: "배송비", value: "0" },
  { label: "결제예정금액", value: "46,500" },
];

export default function PaymentOverview() {
  return (
    <PaymentOverviewWrap>
      <h3 className="sr-only">예상 결제 금액 보기</h3>
      {overviewData.map(({ label, value }, index) => (
        <OverviewField
          key={index}
          isPaymentAmount={label === "결제예정금액"}
          isDiscount={label === "상품 할인"}
          isShipping={label === "배송비"}
        >
          <OverviewLabel isPaymentAmount={label === "결제예정금액"}>
            {label}
          </OverviewLabel>
          <OverviewValue isPaymentAmount={label === "결제예정금액"}>
            {value}
            <span>원</span>
          </OverviewValue>
        </OverviewField>
      ))}
    </PaymentOverviewWrap>
  );
}

const PaymentOverviewWrap = styled.section`
  width: 100%;
  height: 150px;
  margin-top: 80px;
  border-radius: 10px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
`;

const OverviewField = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.isPaymentAmount ? "5px" : "12px")};
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    left: -17px;
    width: 34px;
    height: 34px;
    background-repeat: no-repeat;
    background-size: contain;
    ${({ isDiscount, isShipping }) =>
      isDiscount
        ? `background-image: url(${cartMinusIcon});`
        : isShipping
        ? `background-image: url(${cartPlusIcon});`
        : ""}
  }
`;

const OverviewLabel = styled.p`
  font-weight: ${(props) => (props.isPaymentAmount ? "bold" : "normal")};
`;

const OverviewValue = styled.p`
  font-weight: bold;
  font-size: ${(props) => (props.isPaymentAmount ? "36px" : "24px")};
  color: ${(props) => (props.isPaymentAmount ? "#eb5757" : "black")};

  & > span {
    font-size: 16px;
    font-weight: normal;
    margin-left: 2px;
  }
`;
