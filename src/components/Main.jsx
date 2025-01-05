import {
  Main,
  ProductCard,
  ProductImg,
  StoreName,
  ProductName,
  Price,
} from "../styles/mainStyle";
import { useEffect, useState } from "react";

export default function MainContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://estapi.openmarket.weniv.co.kr/products/"
        );
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
    return <div>로딩 중...</div>;
  }

  if (products.length === 0) {
    return <div>상품 정보가 없습니다.</div>;
  }

  return (
    <Main>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImg src={product.image} alt={product.info} />
          <StoreName>{product.seller.store_name}</StoreName>
          <ProductName>{product.name}</ProductName>
          <Price>{product.price.toLocaleString()}</Price>
          <span>원</span>
        </ProductCard>
      ))}
    </Main>
  );
}
