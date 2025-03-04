import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 6%;
  margin-top: 80px;
  gap: 78px;
`;

export const ProductCard = styled.article``;

//product card 공통 스타일 정의

const variants = {
  main: {
    productImg: {
      border: "1px solid #c4c4c4",
      borderRadius: "10px",
      width: "370px",
      height: "370px",
      marginBottom: "16px",
    },
    storeName: { color: "var(--sub-color)", marginBottom: "10px" },
    productName: { fontSize: "18px", marginBottom: "10px" },
    price: { fontSize: "24px", fontWeight: "bold" },
  },
  detail: {
    productImg: { width: "320px", height: "250px" },
    storeName: {
      color: "var(--sub-color)",
      fontSize: "18px",
      marginBottom: "16px",
    },
    productName: { fontSize: "36px", marginBottom: "20px" },
    price: { fontSize: "36px", fontWeight: "bold" },
  },
};

export const ProductImg = styled.img`
  border: ${({ variant }) => variants[variant]?.productImg.border};
  border-radius: ${({ variant }) => variants[variant]?.productImg.borderRadius};
  width: ${({ variant }) => variants[variant]?.productImg.width};
  height: ${({ variant }) => variants[variant]?.productImg.height};
  margin-bottom: ${({ variant }) => variants[variant]?.productImg.marginBottom};
`;

export const StoreName = styled.p`
  color: var(--sub-color);
  font-size: ${({ variant }) => variants[variant]?.storeName.fontSize};
  font-weight: ${({ variant }) => variants[variant]?.storeName.fontWeight};
  margin-bottom: ${({ variant }) => variants[variant]?.storeName.marginBottom};
`;

export const ProductName = styled.h3`
  font-size: ${({ variant }) => variants[variant]?.productName.fontSize};
  margin-bottom: ${({ variant }) =>
    variants[variant]?.productName.marginBottom};
`;

export const Price = styled.span`
  font-size: ${({ variant }) => variants[variant]?.price.fontSize};
  font-weight: ${({ variant }) => variants[variant]?.price.fontWeight};
`;
