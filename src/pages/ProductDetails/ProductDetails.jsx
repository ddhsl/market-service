import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import minusIcon from "../../assets/icon-minus-line.svg";
import plusIcon from "../../assets/icon-plus-line.svg";
import { StoreName, ProductName, Price } from "../../styles/mainStyle";

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
        <img src={product.image} alt={product.name} />
        <ProductDetail>
          <StoreName>{product.seller.store_name}</StoreName>
          <ProductName>{product.name}</ProductName>
          <Price>{product.price.toLocaleString()} 원</Price>
          <p>택배배송 / 무료배송</p>
          <QuantityControl>
            <button>
              <img src={minusIcon} alt="수량 줄이기" />
            </button>
            <div>1</div>
            <button>
              <img src={plusIcon} alt="수량 늘리기" />
            </button>
          </QuantityControl>
          <OrderSummary>
            <p>총 상품 금액</p>
            <p>
              총 수량 <span>1</span>개
            </p>
            <p>{product.price.toLocaleString()} 원</p>
          </OrderSummary>
          <Button>바로 구매</Button>
          <Button>장바구니</Button>
        </ProductDetail>
      </ProductInfoSection>
      <PurchaseInfoSection>
        <h2 className="sr-only">구매정보</h2>
        <ul>
          <li>버튼</li>
          <li>리뷰</li>
          <li>Q&A</li>
          <li>반품/교환정보</li>
        </ul>
      </PurchaseInfoSection>
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
const ProductDetail = styled.div``;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const OrderSummary = styled.div`
  display: flex;
`;
const PurchaseInfoSection = styled.section`
  padding: 0 6%;
`;
