import styled from "styled-components";
import { useEffect, useState } from "react";
import ShippingInput from "./ShippingInput";
import PhoneInput from "./PhoneInput";
import Button from "../../../components/Button";
import { StyledShippingInput } from "./ShippingInput";
import { ShippingInputWrap } from "./ShippingInfo";

export default function ShippingForm({
  recipient,
  setRecipient,
  recipientPhone,
  setRecipientPhone,
  shippingAddress,
  setShippingAddress,
  detailAddress,
  setDetailAddress,
  shippingMessage,
  setShippingMessage,
  onSubmit,
}) {
  const [isPostcodeScriptLoaded, setIsPostcodeScriptLoaded] = useState(false);

  useEffect(() => {
    // 스크립트가 이미 로드되었다면 추가로 로드하지 않음
    if (window.daum && window.daum.Postcode) {
      setIsPostcodeScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      setIsPostcodeScriptLoaded(true);
    };
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handlePostcodeSearch = () => {
    if (isPostcodeScriptLoaded && window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 우편번호 검색 결과로 주소 입력란에 값 설정
          setShippingAddress({
            ...shippingAddress,
            postalCode: data.zonecode,
            address: data.address,
          });
        },
      }).open();
    } else {
      console.error("우편번호 서비스가 준비되지 않았습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // 폼 제출 시 onSubmit 함수 호출
  };

  return (
    <section>
      <ShippingSubTitle>배송지 정보</ShippingSubTitle>
      <form onSubmit={handleSubmit}>
        <ShippingInputWrap>
          <label htmlFor="recipient">수령인</label>
          <ShippingInput
            id="recipient"
            name="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </ShippingInputWrap>
        <ShippingInputWrap>
          <label htmlFor="recipient-phone">휴대폰</label>
          <PhoneInput
            idPrefix="recipient-phone"
            namePrefix="recipientPhone"
            value={recipientPhone}
            onChange={setRecipientPhone}
          />
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
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                width="170px"
              />
              <Button
                style={{
                  width: "154px",
                  height: "40px",
                  borderRadius: "5px",
                }}
                onClick={handlePostcodeSearch}
                type="button" // 버튼 클릭 시 폼 제출 방지
              >
                우편번호 조회
              </Button>
            </div>

            <StyledShippingInput
              id="shipping-address"
              name="shippingAddress"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              width="800px"
            />

            <StyledShippingInput
              id="shipping-detail-address"
              name="shippingDetailAddress"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              width="800px"
            />
          </div>
        </ShippingInputWrap>
        <ShippingInputWrap style={{ marginBottom: "70px" }}>
          <label htmlFor="shipping-message">배송 메시지</label>
          <ShippingInput
            id="shipping-message"
            name="shippingMessage"
            value={shippingMessage}
            onChange={(e) => setShippingMessage(e.target.value)}
          />
        </ShippingInputWrap>
      </form>
    </section>
  );
}

const ShippingSubTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 8px;
  margin-top: 40px;
  border-bottom: 2px solid #c4c4c4;
`;
