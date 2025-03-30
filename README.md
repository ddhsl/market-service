# Opne Market Service

### 🌐 배포 URL

[Open Market Service 바로가기](https://yewonni.github.io/market-service/)

## 📌 프로젝트 소개

오픈 마켓 서비스는 사용자가 다양한 상품을 구매하고 판매할 수 있는 온라인 마켓 플랫폼입니다.  
구매회원은 상품을 장바구니에 담거나 구매할 수 있으며, 판매회원은 직접 상품을 등록하여 판매할 수 있습니다.

**[테스트 계정]**

- **구매자 계정**

  - **ID**: test3333 / **PW**: qorhvk123

- **판매자 계정**
  - **ID**: test9999 / **PW**: qorhvk999

## 🏗 개발 환경

### Frontend

- **프레임워크/라이브러리**: React
- **스타일링**: Styled Components / Global CSS
- **라우팅**: React Router
- **상태 관리**: Context API
- **버전 관리**: Git & GitHub
- **API 통신**: Fetch API
- **배포 환경**: Netlify / Vercel

### Backend

- **백엔드**: 위니브 제공 API 활용

## 🗂️ 프로젝트 폴더 구조

```
src
├── assets
│   ├── Logo-hodu.png
│   ├── banner1.jpg
│   ├── icon-check.svg
│   ├── icon-shopping-cart.svg
│   └── ...
├── components
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Input.jsx
│   ├── Main.jsx
│   └── ...
├── constants
│   └── api.js
├── context
│   ├── AuthContext.js
│   └── OrderContext.js
├── pages
│   ├── cartPage
│   │   ├── component
│   │   │   ├── CartItem.jsx
│   │   │   └── Cart.jsx
│   ├── error
│   │   └── ErrorPage.jsx
│   ├── join
│   │   ├── component
│   │   └── Join.jsx
│   ├── login
│   │   ├── component
│   │   └── Login.jsx
│   ├── myPage
│   │   └── MyOrderPage.jsx
│   ├── paymentPage
│   │   ├── component
│   │   └── Payment.jsx
│   ├── productDetails
│   │   ├── component
│   │   └── ProductDetails.jsx
│   ├── registerProduct
│   │   ├── component
│   │   └── RegisterProduct.jsx
│   ├── search
│   │   └── SearchResults.jsx
│   ├── sellerCenter
│   │   ├── component
│   │   └── SellerCenter.jsx
│   └── Home.jsx
├── styles
│   ├── GlobalStyle.js
│   ├── footerStyle.js
│   ├── reset.css
│   └── ...
├── utils
│   └── cookieUtils.js
├── App.js
└── index.js
```

## ✨ 페이지별 기능

### [홈 페이지]

- 배너이미지 및 오픈마켓서비스의 모든 상품을 표시합니다.
- 비로그인 / 구매회원 / 판매회원 별 HEADER를 구현하였습니다.
