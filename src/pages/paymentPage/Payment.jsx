import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { CartField, CartTitle, CartLabel } from "../cartPage/Cart";
import PaymentItem from "./component/PaymentItem";
import { useLocation } from "react-router-dom";
import OrdererForm from "./component/OrdererForm";
import ShippingForm from "./component/ShippingForm";
import PaymentForm from "./component/PaymentForm";
import FinalPaymentDetails from "./component/FinalPaymentDetails";
import { getCookie } from "../../utils/cookieUtils";
import { API_BASE_URL } from "../../constants/api";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";

const paymentLabels = [
  { text: "상품정보", flex: 4 },
  { text: "할인", flex: 2 },
  { text: "배송비", flex: 2 },
  { text: "주문금액", flex: 2 },
];

export default function Payment() {
  const { refreshAccessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const { orderData } = useOrder();
  const {
    recipient,
    recipientPhoneNumber = { first: "", middle: "", last: "" },
    shippingAddress = { address: "", detailAddress: "" },
    shippingMessage,
    paymentMethod,
    ordererName,
    ordererPhoneNumber = { first: "", middle: "", last: "" },
    ordererEmail,
  } = orderData;

  // 총 금액 및 배송비 계산
  const { totalPrice, totalShippingFee } = selectedItems.reduce(
    (acc, item) => {
      const itemPrice = (item.product?.price || 0) * item.quantity;
      const itemShippingFee = item.product?.shipping_fee || 0;
      acc.totalPrice += itemPrice;
      acc.totalShippingFee += itemShippingFee;
      return acc;
    },
    { totalPrice: 0, totalShippingFee: 0 }
  );

  // 주문 생성 함수
  const createOrder = async (orderData) => {
    try {
      let accessToken = getCookie("accessToken");

      // 토큰이 없으면 리프레시 시도
      if (!accessToken) {
        accessToken = await refreshAccessToken();
      }

      if (!accessToken) {
        throw new Error("토큰 갱신에 실패했습니다.");
      }

      const response = await fetch(`${API_BASE_URL}/order/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // 401 에러 시 토큰 갱신 재시도
          accessToken = await refreshAccessToken();

          if (!accessToken) {
            throw new Error("리프레시 토큰으로 갱신 실패");
          }

          const retryResponse = await fetch(`${API_BASE_URL}/order/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          if (!retryResponse.ok) {
            const errorText = await retryResponse.text();
            console.error("주문 생성에 실패했습니다. 응답:", errorText);
            throw new Error(`주문 생성 실패: ${retryResponse.status}`);
          }

          const result = await retryResponse.json();
          console.log("주문 생성 성공:", result);
          return result;
        } else {
          const errorText = await response.text();
          console.error("주문 생성에 실패했습니다. 응답:", errorText);
          throw new Error(`주문 생성 실패: ${response.status}`);
        }
      }

      const result = await response.json();
      console.log("주문 생성 성공:", result);
      return result;
    } catch (error) {
      console.error("주문 생성 오류:", error);
      alert(`주문 생성 중 오류가 발생했습니다: ${error.message}`);
      return null;
    }
  };
  // 휴대폰 번호를 하나의 문자열로 결합
  const formatPhoneNumber = (phone) =>
    `${phone.first}${phone.middle}${phone.last}`;

  const recipientPhoneNumberString = formatPhoneNumber(recipientPhoneNumber);
  const ordererPhoneNumberString = formatPhoneNumber(ordererPhoneNumber);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitOrder = () => {
    // 필수 필드 검증
    if (!ordererName.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (
      !ordererPhoneNumberString ||
      !validatePhoneNumber(ordererPhoneNumberString)
    ) {
      alert("주문자 휴대폰 번호는 11자리의 숫자로 입력해야 합니다.");
      return;
    }

    if (!ordererEmail.trim() || !validateEmail(ordererEmail)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!recipient.trim()) {
      alert("수령인을 입력해주세요.");
      return;
    }

    if (
      !recipientPhoneNumberString ||
      !validatePhoneNumber(recipientPhoneNumberString)
    ) {
      alert("수령인 휴대폰 번호는 11자리의 숫자로 입력해야 합니다.");
      return;
    }

    if (!shippingAddress.address || !shippingAddress.detailAddress) {
      alert("배송지 주소를 입력해주세요.");
      return;
    }

    handleOrderSubmit();
  };

  // 주문하기 적용
  const handleOrderSubmit = async () => {
    if (selectedItems.length > 1) {
      // 장바구니에서 여러 아이템을 주문하는 경우
      const cartItems = selectedItems.map((item) => item.product?.id);
      const orderData = {
        order_type: "cart_order",
        cart_items: cartItems,
        total_price: totalPrice + totalShippingFee,
        receiver: recipient,
        receiver_phone_number: recipientPhoneNumberString,
        address: `${shippingAddress.address} ${shippingAddress.detailAddress}`,
        delivery_message: shippingMessage,
        payment_method: paymentMethod,
      };

      const result = await createOrder(orderData);
      if (result) navigate("/mypage");
    } else {
      // 개별 상품을 주문하는 경우
      for (const item of selectedItems) {
        const orderData = {
          order_type: "direct_order",
          product: item.product?.id,
          quantity: item.quantity,
          total_price: totalPrice + totalShippingFee,
          receiver: recipient,
          receiver_phone_number: recipientPhoneNumberString,
          address: `${shippingAddress.address} ${shippingAddress.detailAddress}`,
          delivery_message: shippingMessage,
          payment_method: paymentMethod,
        };

        const result = await createOrder(orderData);
        if (result) {
          alert("성공적으로 주문이 생성됐습니다.");
          navigate("/mypage");
        }
      }
    }
  };

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
        <PaymentItem
          selectedItems={selectedItems}
          totalPrice={totalPrice}
          totalShippingFee={totalShippingFee}
        />
        <TotalPrice>
          <span>총 주문금액</span>
          <span> {(totalPrice + totalShippingFee).toLocaleString()}원</span>
        </TotalPrice>
        <section>
          <ShippingTitle>배송정보</ShippingTitle>
          <OrdererForm onSubmit={submitOrder}></OrdererForm>
          <ShippingForm onSubmit={submitOrder}></ShippingForm>
          <div style={{ marginTop: "70px", display: "flex", gap: "40px" }}>
            <div>
              <PaymentMethodTitle>결제수단</PaymentMethodTitle>
              <PaymentForm></PaymentForm>
            </div>
            <div style={{ flexGrow: "1" }}>
              <FinalPaymentTitle>최종결제 정보</FinalPaymentTitle>
              <FinalPaymentDetails
                totalPrice={totalPrice}
                totalShippingFee={totalShippingFee}
                handleOrderSubmit={submitOrder}
              />
            </div>
          </div>
        </section>
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

const ShippingTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
  border-bottom: 2px solid #c4c4c4;
`;
const PaymentMethodTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
`;

const FinalPaymentTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 18px;
`;

export const ShippingInputWrap = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  align-items: center;

  label {
    width: 170px;
  }
`;
