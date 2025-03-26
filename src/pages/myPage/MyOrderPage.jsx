import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCookie } from "../../utils/cookieUtils";
import Header from "../../components/Header";
import { API_BASE_URL } from "../../constants/api";
import Loader from "../../components/Loader";
export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = getCookie("accessToken");
        const response = await fetch(`${API_BASE_URL}/order/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("주문 정보를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setOrders(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
            <Subtitle>나의 주문 목록</Subtitle>
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
                  <OrderStatus status={order.order_status}>
                    {order.order_status === "payment_complete"
                      ? "결제완료"
                      : ""}
                  </OrderStatus>
                </OrderHeader>
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
  padding: 50px 6%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleWrapper = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: #333;
`;

const SubtitleWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: baseline;
  gap: 5px;
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
  text-align: left;
  font-size: 18px;
  color: red;
`;

const Message = styled.p`
  text-align: left;
  font-size: 18px;
  color: #888;
`;

const OrderList = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const OrderItem = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
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
    props.status === "payment_complete"
      ? "#28a745"
      : props.status === "preparing"
      ? "#ffc107"
      : props.status === "canceled"
      ? "#dc3545"
      : "#6c757d"};
  color: white;
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
