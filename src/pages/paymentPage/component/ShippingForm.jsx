import styled from "styled-components";
import { useEffect, useState } from "react";
import ShippingInput from "./ShippingInput";
import PhoneInput from "./PhoneInput";
import Button from "../../../components/Button";
import { StyledShippingInput } from "./ShippingInput";
import { ShippingInputWrap } from "./ShippingInfo";
import { useOrder } from "../../../context/OrderContext";

export default function ShippingForm({ onSubmit }) {
  const [isPostcodeScriptLoaded, setIsPostcodeScriptLoaded] = useState(false);
  const { orderData, updateOrderData } = useOrder();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateOrderData({ [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    updateOrderData({
      shippingAddress: {
        ...orderData.shippingAddress, // 기존 값들 유지
        [name]: value, // 해당 필드만 업데이트
      },
    });
  };

  const handleDetailAddressChange = (e) => {
    const { value } = e.target;
    updateOrderData({
      shippingAddress: {
        ...orderData.shippingAddress, // 기존 값들 유지
        detailAddress: value, // 상세주소만 업데이트
      },
    });
  };

  const ZipcodeChange = (e) => {
    const { value } = e.target;
    updateOrderData({
      shippingAddress: {
        ...orderData.shippingAddress, // 기존 값들 유지
        postalCode: value, // 상세주소만 업데이트
      },
    });
  };

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

  const handlePostcodeSearch = (e) => {
    e.preventDefault(); // 폼 제출 방지
    if (isPostcodeScriptLoaded && window.daum && window.daum.Postcode) {
      // 우편번호 서비스를 팝업으로 여는 옵션 설정
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 우편번호 검색 결과로 주소 입력란에 값 설정
          updateOrderData({
            shippingAddress: {
              postalCode: data.zonecode,
              address: data.address,
            },
          });
        },
        // 현재 페이지 내에 팝업을 띄우기 위한 설정
        popup: true, // 기존에 새 탭을 여는 것과는 다르게, 페이지 내 팝업을 띄움
      }).open();
    } else {
      alert("우편번호 서비스가 준비되지 않았습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
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
            value={orderData.recipient}
            onChange={handleInputChange}
          />
        </ShippingInputWrap>
        <ShippingInputWrap>
          <label htmlFor="recipient-phone">휴대폰</label>
          <PhoneInput
            idPrefix="recipient-phone"
            namePrefix="recipientPhone"
            value={orderData.recipientPhone}
            onChange={handleInputChange}
            isOrderer={false}
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
                name="postalCode"
                value={orderData.shippingAddress.postalCode}
                onChange={ZipcodeChange}
                width="170px"
              />
              <Button
                style={{
                  width: "154px",
                  height: "40px",
                  borderRadius: "5px",
                }}
                onClick={handlePostcodeSearch}
                type="button"
              >
                우편번호 조회
              </Button>
            </div>

            <StyledShippingInput
              id="shipping-address"
              name="address"
              value={orderData.shippingAddress.address}
              onChange={handleAddressChange}
              width="800px"
            />

            <StyledShippingInput
              id="shipping-detail-address"
              name="detailAddress"
              value={orderData.shippingAddress.detailAddress}
              onChange={handleDetailAddressChange}
              width="800px"
            />
          </div>
        </ShippingInputWrap>
        <ShippingInputWrap style={{ marginBottom: "70px" }}>
          <label htmlFor="shipping-message">배송 메시지</label>
          <ShippingInput
            id="shipping-message"
            name="shippingMessage"
            value={orderData.shippingMessage}
            onChange={handleInputChange}
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
