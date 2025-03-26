import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants/api";
import Loader from "../../components/Loader";

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 검색어 추출
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/products/?search=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setProducts(data.results);
      } catch (error) {
        console.error("상품 정보를 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <SearchResultMain>
        <h1>
          <span>"{searchTerm}"</span> 에 대한 검색 결과입니다.
        </h1>
        <div>
          {products.map((product) => (
            <article
              key={product.id}
              onClick={() => navigate(`/product-details/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />
              <div>
                <p>{product.seller?.store_name}</p>
                <h2>{product.name}</h2>
                <p>
                  {product.price.toLocaleString()} <span>원</span>
                </p>
              </div>
            </article>
          ))}
          {products.length === 0 && (
            <SearchErrorMessage>
              <p>찾고 있는 상품 정보가 없습니다.</p>
              <p>정확한 상품명을 확인 후 다시 검색해 주세요.</p>
            </SearchErrorMessage>
          )}
        </div>
      </SearchResultMain>
      <Footer />
    </>
  );
}

const SearchResultMain = styled.main`
  padding: 0 6%;
  min-height: 70vh;
  & > h1 {
    margin-top: 40px;
    font-size: 24px;
    margin-bottom: 40px;
    & > span {
      color: var(--main-color);
      font-weight: bold;
      font-size: 26px;
    }
  }

  & > div {
    display: flex;
    gap: 30px;
  }

  & > div > article {
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > img {
      width: 300px;
      height: 300px;
      border-radius: 10px;
      cursor: pointer;
      border: 1px solid #c4c4c4;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    & > img:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 10px;

      & > p:nth-child(1) {
        color: var(--sub-color);
      }
      & > h2 {
        font-size: 18px;
      }
      & > p:nth-child(3) {
        font-size: 24px;
        font-weight: bold;
        & > span {
          font-size: 16px;
          font-weight: normal;
        }
      }
    }
  }
`;

const SearchErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: center;

  & > p {
    font-size: 18px;
    color: var(--sub-color);
  }
`;
