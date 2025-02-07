import styled from "styled-components";
import ShippingInput from "./ShippingInput";
import PhoneInput from "./PhoneInput";
import Button from "../../../components/Button";
import { StyledShippingInput } from "./ShippingInput";
import { ShippingInputWrap } from "./ShippingInfo";
import { OrdererTitle } from "./OrdererForm";

export default function ShippingForm() {
  return (
    <section>
      <ShippingDetailsTitle>배송지 정보</ShippingDetailsTitle>
      <form action="">
        <ShippingInputWrap>
          <label htmlFor="recipient">수령인</label>
          <ShippingInput id="recipient" name="recipient" />
        </ShippingInputWrap>
        <ShippingInputWrap>
          <label htmlFor="recipient-phone">휴대폰</label>
          <PhoneInput idPrefix="recipient-phone" namePrefix="recipientPhone" />
        </ShippingInputWrap>
        <ShippingInputWrap
          style={{
            height: "152px",
            alignItems: "flex-start",
            marginTop: "8px",
          }}
        >
          <label
            htmlFor="shipping-postal-code"
            style={{ position: "relative", top: "12px" }}
          >
            배송주소
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <StyledShippingInput
                id="shipping-postal-code"
                name="shippingPostalCode"
                width="170px"
              />
              <Button
                style={{
                  width: "154px",
                  height: "40px",
                  borderRadius: "5px",
                }}
              >
                우편번호 조회
              </Button>
            </div>

            <StyledShippingInput
              id="shipping-address"
              name="shippingAddress"
              width="800px"
            />

            <StyledShippingInput
              id="shipping-detail-address"
              name="shippingDetailAddress"
              width="800px"
            />
          </div>
        </ShippingInputWrap>

        <ShippingInputWrap style={{ marginBottom: "70px" }}>
          <label>배송 메시지</label>
          <ShippingInput id="shipping-message" name="shippingMessage" />
        </ShippingInputWrap>
      </form>
    </section>
  );
}

const ShippingDetailsTitle = styled(OrdererTitle)``;
