import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCookie } from "../../utils/cookieUtils";
import Header from "../../components/Header";
import { API_BASE_URL } from "../../constants/api";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";

export default function MyOrderPage() {
  const { refreshAccessToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    const fetchOrders = async () => {
      setError(null);
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // 401 에러 시 다시 토큰 갱신 시도
            accessToken = await refreshAccessToken();
            if (!accessToken) {
              throw new Error("리프레시 토큰으로 갱신 실패");
            }

            const retryResponse = await fetch(`${API_BASE_URL}/order/`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (!retryResponse.ok) {
              throw new Error(`API 요청 실패: ${retryResponse.status}`);
            }

            const data = await retryResponse.json();
            const sortedOrders = data.results.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setOrders(sortedOrders);
          } else {
            throw new Error(`API 요청 실패: ${response.status}`);
          }
        } else {
          const data = await response.json();
          const sortedOrders = data.results.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setOrders(sortedOrders);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [refreshAccessToken]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <>
      <Header />
      <MyPageWrapper>
        <TitleWrapper>
          <Title>안녕하세요, {userName}님!</Title>
          <SubtitleWrapper>
            <Subtitle>나의 주문 내역</Subtitle>
            <OrderCount>({orders.length})</OrderCount>
          </SubtitleWrapper>
        </TitleWrapper>
        {orders.length === 0 ? (
          <Message>주문 내역이 없습니다.</Message>
        ) : (
          <OrderList>
            {orders.map((order) => (
              <OrderItem key={order.id}>
                <OrderHeader>
                  <OrderNumber>주문번호: {order.order_number}</OrderNumber>
                  <OrderStatus $status={order.order_status}>
                    {order.order_status === "payment_complete"
                      ? "결제완료"
                      : ""}
                  </OrderStatus>
                </OrderHeader>
                <OrderDate>
                  주문일: {new Date(order.created_at).toLocaleString()}
                </OrderDate>
                <OrderDetails>
                  <Detail>
                    <DetailTitle>결제금액:</DetailTitle>
                    <DetailContent>
                      {order.total_price.toLocaleString()}원
                    </DetailContent>
                  </Detail>
                  <Detail>
                    <DetailTitle>배송지:</DetailTitle>
                    <DetailContent>{order.address}</DetailContent>
                  </Detail>
                  <Detail>
                    <DetailTitle>수령인:</DetailTitle>
                    <DetailContent>{order.receiver}</DetailContent>
                  </Detail>
                  <Detail>
                    <DetailTitle>연락처:</DetailTitle>
                    <DetailContent>{order.receiver_phone_number}</DetailContent>
                  </Detail>
                  {order.delivery_message && (
                    <Detail>
                      <DetailTitle>배송 메시지:</DetailTitle>
                      <DetailContent>{order.delivery_message}</DetailContent>
                    </Detail>
                  )}
                </OrderDetails>
              </OrderItem>
            ))}
          </OrderList>
        )}
      </MyPageWrapper>
    </>
  );
}

const MyPageWrapper = styled.main`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 50px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: #333;
`;

const SubtitleWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 5px;
  align-items: baseline;
`;

const Subtitle = styled.span`
  font-size: 22px;
  font-weight: normal;
`;

const OrderCount = styled.span`
  font-size: 18px;
  color: var(--main-color);
  font-weight: bold;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
`;

const Message = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
`;

const OrderList = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const OrderItem = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-left: 5px solid var(--main-color);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-3px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const OrderNumber = styled.h2`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const OrderStatus = styled.span`
  font-size: 14px;
  font-weight: bold;
  padding: 10px 12px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.$status === "payment_complete"
      ? "#28a745"
      : props.$status === "preparing"
      ? "#ffc107"
      : props.$status === "canceled"
      ? "#dc3545"
      : "#6c757d"};
  color: white;
`;

const OrderDate = styled.span`
  font-size: 14px;
  color: #888;
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 15px;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DetailTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  min-width: 100px;
`;

const DetailContent = styled.span`
  font-size: 16px;
  color: #555;
`;
