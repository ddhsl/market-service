import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 6%;
  margin-top: 80px;
  gap: 78px;
`;

export const ProductCard = styled.article``;

export const ProductImg = styled.img`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 370px;
  height: 370px;
  margin-bottom: 16px;
`;

export const StoreName = styled.p`
  color: var(--sub-color);
  margin-bottom: 10px;
`;

export const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Price = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
