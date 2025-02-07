import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import QuantityControlSection from "./component/QuantityControlSection";
import PurchaseInfoSection from "./component/PurchaseInfoSection";
import {
  ProductImg,
  StoreName,
  ProductName,
  Price,
} from "../../styles/mainStyle";

export default function ProductDetails() {
  const { id } = useParams(); //구조분해할당 구문 사용 {id}
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://estapi.openmarket.weniv.co.kr/products/${id}/`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("상품 상세 정보를 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]); //URL의 id 값이 변경될 때마다 해당 ID에 맞는 상품 데이터를 다시 가져오도록 [id]를 의존성 배열에 포함

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  return (
    <>
      <Header />
      <ProductInfoSection>
        <h2 className="sr-only">상품정보</h2>
        <ProductImg variant="detail" src={product.image} alt={product.name} />
        <ProductDetail>
          <StoreName variant="detail">{product.seller.store_name}</StoreName>
          <ProductName variant="detail">{product.name}</ProductName>
          <Price variant="detail">{product.price.toLocaleString()} </Price>
          <span>원</span>
          <p style={{ color: "var(--sub-color", marginTop: "138px" }}>
            택배배송 / 무료배송
          </p>
          <QuantityControlSection />
          <OrderSummary>
            <p>총 상품 금액</p>
            <div>
              <p>
                총 수량 <span style={{ color: "var(--main-color)" }}>1</span>개
              </p>
              <Price
                variant="detail"
                style={{
                  color: "var(--main-color)",
                }}
              >
                {product.price.toLocaleString()}
              </Price>
              <span style={{ color: "var(--main-color)" }}>원</span>
            </div>
          </OrderSummary>
          <Button style={{ width: "416px", height: "60px" }}>바로 구매</Button>
          <Button
            style={{
              width: "200px",
              height: "60px",
              backgroundColor: "var(--sub-color)",
              marginLeft: "14px",
            }}
          >
            장바구니
          </Button>
        </ProductDetail>
      </ProductInfoSection>
      <PurchaseInfoSection />
    </>
  );
}

const ProductInfoSection = styled.section`
  padding: 0 6%;
  display: flex;
  gap: 50px;
  margin-top: 80px;
  & > img {
    width: 600px;
    height: 600px;
  }
`;
const ProductDetail = styled.div`
  & > button {
    font-size: 18px;
    font-weight: bold;
    margin-top: 22px;
  }
`;

const OrderSummary = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  & > p {
    font-weight: bold;
    font-size: 18px;
  }

  & > div {
    display: flex;
    align-items: baseline;
  }

  & > div > p {
    font-size: 18px;
    color: var(--sub-color);
  }

  & > div > p::after {
    content: "|";
    margin-left: 11px;
    margin-right: 11px;
  }
`;
