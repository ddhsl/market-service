import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import ActiveItem from "./ActiveItem";
import { getCookie } from "../../../utils/cookieUtils";
import { API_BASE_URL } from "../../../constants/api";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/AuthContext";

const dashboardLabels = [
  { text: "상품정보", flex: 5 },
  { text: "판매가격", flex: 2.4 },
  { text: "수정", flex: 1.3 },
  { text: "삭제", flex: 1.3 },
];

export default function DashboardSection() {
  const { refreshAccessToken } = useAuth();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 토큰 확인 및 갱신 함수를 useMemo로 메모이제이션
  const getValidToken = useMemo(() => {
    return async () => {
      let accessToken = getCookie("accessToken");
      if (!accessToken) {
        accessToken = await refreshAccessToken();
      }
      return accessToken;
    };
  }, [refreshAccessToken]);

  // 상품 조회 API 요청 함수
  const fetchProductsRequest = useCallback(async (sellerName, accessToken) => {
    const response = await fetch(`${API_BASE_URL}/${sellerName}/products/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "일치하는 판매자를 찾을 수 없습니다."
          : "상품을 불러오는 중 오류가 발생했습니다."
      );
    }

    const data = await response.json();
    return data;
  }, []);

  const fetchProducts = useCallback(async () => {
    const sellerName = localStorage.getItem("name");
    if (!sellerName) {
      setError("판매자 이름이 없습니다.");
      setLoading(false);
      return;
    }

    try {
      // 유효한 토큰 얻기
      let accessToken = await getValidToken();

      if (!accessToken) {
        throw new Error("토큰 갱신에 실패했습니다.");
      }

      try {
        // 첫 번째 상품 조회 시도
        const data = await fetchProductsRequest(sellerName, accessToken);

        if (data.count === 0) {
          setError("등록된 상품이 없습니다.");
        } else {
          setProducts(data.results);
        }
      } catch (error) {
        // 401 에러 시 토큰 재갱신 시도
        if (error.message.includes("401")) {
          accessToken = await refreshAccessToken();

          if (!accessToken) {
            throw new Error("리프레시 토큰으로 갱신 실패");
          }

          // 재갱신된 토큰으로 다시 상품 조회 시도
          const data = await fetchProductsRequest(sellerName, accessToken);

          if (data.count === 0) {
            setError("등록된 상품이 없습니다.");
          } else {
            setProducts(data.results);
          }
        } else {
          // 다른 에러는 그대로 throw
          throw error;
        }
      }
    } catch (error) {
      setError(error.message || "상품을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [getValidToken, refreshAccessToken, fetchProductsRequest]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <Loader />;

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
      {error && (
        <p style={{ color: "#EB5757", padding: "20px", textAlign: "center" }}>
          {error}
        </p>
      )}
      {!loading && !error && (
        <div>
          {products && products.length > 0 ? (
            products.map((product) => (
              <ActiveItem
                key={product.id}
                product={product}
                onDelete={handleProductDelete}
              />
            ))
          ) : (
            <p style={{ padding: "20px", textAlign: "center" }}>
              등록된 상품이 없습니다.
            </p>
          )}
        </div>
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
