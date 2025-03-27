import {
  Main,
  ProductCard,
  ProductImg,
  StoreName,
  ProductName,
  Price,
} from "../styles/mainStyle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants/api";
import Loader from "./Loader";

export default function MainContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/`);
        const data = await response.json();
        setProducts(data.results);
      } catch (error) {
        console.error("상품 정보를 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <div>상품 정보가 없습니다.</div>;
  }

  return (
    <Main>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          onClick={() => navigate(`/product-details/${product.id}`)}
        >
          <ProductImg $variant="main" src={product.image} alt={product.info} />
          <StoreName $variant="main">{product.seller.store_name}</StoreName>
          <ProductName $variant="main">{product.name}</ProductName>
          <Price $variant="main">
            {product.price.toLocaleString()} <span>원</span>
          </Price>
        </ProductCard>
      ))}
    </Main>
  );
}
