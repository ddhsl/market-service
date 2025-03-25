import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import ActiveItem from "./ActiveItem";
import { getCookie } from "../../../utils/cookieUtils";

const dashboardLabels = [
  { text: "상품정보", flex: 5 },
  { text: "판매가격", flex: 2.4 },
  { text: "수정", flex: 1.3 },
  { text: "삭제", flex: 1.3 },
];

export default function DashboardSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback으로 fetchProducts 함수 최적화
  const fetchProducts = useCallback(async () => {
    const sellerName = localStorage.getItem("name");
    if (!sellerName) {
      setError("판매자 이름이 로컬 스토리지에 없습니다.");
      setLoading(false);
      return;
    }

    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `https://estapi.openmarket.weniv.co.kr/${sellerName}/products/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        setError(
          response.status === 404
            ? "일치하는 판매자를 찾을 수 없습니다."
            : "상품을 불러오는 중 오류가 발생했습니다."
        );
        return;
      }

      const data = await response.json();
      if (data.count === 0) {
        setError("등록된 상품이 없습니다.");
      } else {
        setProducts(data.results);
      }
    } catch {
      setError("상품을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 배열 비움

  // 컴포넌트 마운트 시 상품 불러오기
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 상품 삭제 핸들러
  const handleProductDelete = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
    );
  };

  return (
    <DashboardWrap>
      <h3 className="sr-only">판매중인 상품</h3>
      <DashboardField>
        {dashboardLabels.map(({ text, flex }) => (
          <DashboardLabel key={text} $flex={flex}>
            {text}
          </DashboardLabel>
        ))}
      </DashboardField>
      {loading && <p>상품을 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && products.length > 0 && (
        <div>
          {products.map((product) => (
            <ActiveItem
              key={product.id}
              product={product}
              onDelete={handleProductDelete}
            />
          ))}
        </div>
      )}
      {!loading && !error && products.length === 0 && (
        <p>등록된 상품이 없습니다.</p>
      )}
    </DashboardWrap>
  );
}

const DashboardWrap = styled.section`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
`;

const DashboardField = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 30px;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
  background-color: #fff;
`;

const DashboardLabel = styled.p`
  flex: ${({ $flex }) => $flex};
  text-align: center;
`;
