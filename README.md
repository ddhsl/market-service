# Opne Market Service

### 🌐 배포 URL

[Open Market Service 바로가기](https://yewonni.github.io/market-service/)

## 📌 프로젝트 소개

오픈 마켓 서비스는 사용자가 다양한 상품을 구매하고 판매할 수 있는 온라인 마켓 플랫폼입니다.  
구매회원은 상품을 장바구니에 담거나 구매할 수 있으며, 판매회원은 직접 상품을 등록하여 판매할 수 있습니다.

**[테스트 계정]**

- **구매자 계정**

  - **ID**: client / **PW**: client4989

- **판매자 계정**
  - **ID**: host / **PW**: host4989

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
#### (비로그인 HEADER)
![Header](./src/assets/Header.png)

#### (구매회원 HEADER)
![BuyerHeader](./src/assets/buyer-header.png)

#### (판매회원 HEADER)
![SellerHeader](./src/assets/seller-header.png)

-----

### [검색 페이지]

- 오픈 마켓 상품에 대한 사용자의 검색 결과를 표시합니다.
  
![Image](https://github.com/user-attachments/assets/fd5400e7-a8c1-456e-8dd6-d90670c48b3c)

-----


### [회원가입]
- 사용자는 가입 유형을 선택할 수 있습니다.
- 판매회원 가입의 경우, 사업자등록번호 및 스토어 이름이 추가로 요구됩니다.
- 이미 존재하는 아이디 / 사업자등록번호는 사용이 불가합니다.
- 가입하고자 하는 내용을 입력하는 즉시 유효성 검사가 실행됩니다.
- 회원가입에 성공하면, 로그인 페이지로 이동합니다.

  ![Image](https://github.com/user-attachments/assets/dae6bbdf-ae8b-4511-a82c-a5b19fa43e87)
  
  ![Image](https://github.com/user-attachments/assets/ccfcf396-980f-4275-9312-122e743653a8)

-----

### [로그인]
- 가입 유형 별 로그인 탭이 구현되어 있습니다.
- 가입 유형과 다른 유형을 선택하여 로그인 시도 시 오류 메세지가 발생합니다.
- 로그인 버튼을 클릭하면 유효성 검사가 실행됩니다.
- 로그인에 성공하면, 홈 페이지로 이동합니다.

![Image](https://github.com/user-attachments/assets/3dc6d4d4-8d4a-48d6-b78e-096b968b5e16)

![Image](https://github.com/user-attachments/assets/4ed90026-d946-442d-aa4d-ae852337d6db)

-----

### [상품 디테일 페이지]
- 사용자가 홈페이지에서 클릭한 상품의 판매점, 상품명, 가격을 표시합니다.
- 구매회원은 상품의 수량을 조정하여 장바구니에 담거나, 바로 구매 기능을 이용할 수 있습니다.
- 판매회원은 상품의 정보 확인만 가능하며, 수량 조정/ 장바구니/ 바로 구매 기능이 비활성화 됩니다.
- 비로그인 사용자가 장바구니 / 바로 구매를 클릭할 경우, 로그인 요청 모달이 화면에 나타납니다.
- 재고가 없는 상품의 경우, 재고 없음 메세지가 표시되며 모든 버튼이 비활성화 됩니다.

![Image](https://github.com/user-attachments/assets/97eb8c8f-af26-43b0-bb97-fcc04d0f1edd)

-----

### [장바구니 페이지]
- 구매회원 사용자가 장바구니에 담은 상품들을 표시합니다.
- 구매 수량 조정이 가능하며, 장바구니 상품을 제거할 수 있습니다.
- 여러 개의 상품을 선택하여 주문하거나, 개별 상품의 주문이 가능합니다.

![Image](https://github.com/user-attachments/assets/e052f478-e5c5-432a-a1be-57b88dedf522)

-----

### [주문/결제 페이지]
- 주문하고자 하는 상품의 정보,수량, 배송비, 최종 결제 금액을 표시합니다.
- 구매회원은 배송정보 입력, 결제 수단을 선택, 동의하기 후 결제하기 이용이 가능합니다.
- 상품 결제에 성공하면, 마이페이지로 이동합니다.

 ![Image](https://github.com/user-attachments/assets/d44bda1d-566c-4fa9-bc59-b49b5d500e7f)

-----

### [마이페이지]
- 구매회원의 주문 내역을 표시합니다.
- 주문 내역은 주문한 날짜를 최신순으로 하여, 나열됩니다.
- 주문한 상품의 정보, 배송 요청 사항, 주문 상태를 확인할 수 있습니다.

![Image](https://github.com/user-attachments/assets/da452410-6da3-4e89-9de6-337413be4d53)

-----

### [상품 등록 페이지]
- 판매회원은 본인의 상품을 직접 등록할 수 있습니다.
- 상품 등록에 성공하면, 등록된 상품의 디테일 페이지로 이동합니다.

![Image](https://github.com/user-attachments/assets/9e30f33e-36f8-41c9-9e0a-9c96be64daa7)

-----

### [판매자센터 페이지]
- 판매회원은 본인이 등록한 상품 즉, 판매중인 상품 확인이 가능합니다.
- 수정하기 기능을 이용하여 상품 정보를 수정할 수 있습니다.
- 등록된 상품을 삭제할 수 있습니다.

![Image](https://github.com/user-attachments/assets/e450322e-4623-4f80-a98c-b88f2346adf9)

  ![Image](https://github.com/user-attachments/assets/0641fdd4-ad6f-4983-91f9-568015599bb9)


### [404 에러 페이지]
- 404 에러일 때 나타나는 페이지입니다.
- 메인으로 돌아가거나, 이전 페이지로 돌아가는 기능을 제공합니다.

![Image](https://github.com/user-attachments/assets/31a0de00-1b9d-4983-baf6-15ed41b4a032)

-----


## 💥 트러블슈팅
### `useCallback`을 사용하지 않았을 때 발생한 오류와 해결 과정  

#### **문제 발생**  
처음에는 `navigateToEdit` 함수를 일반 함수로 선언하여 `handleEditClick`에서 호출하도록 구현.   
하지만 이 방식에서는 `navigate`와 `product`가 변경될 때마다 `navigateToEdit`의 참조가 변경되었고, 불필요한 렌더링이 발생. 
특히, `useEffect`나 특정 이벤트 핸들러에서 `navigateToEdit`을 의존성 배열에 추가하면,해당 함수가 계속 새로 생성되어 무한 루프가 발생할 가능성이 존재하였음.

#### **발생한 오류 예시**  
   - `navigateToEdit`이 계속 새로 생성되어 `useEffect` 의존성 배열에 포함되면 무한 렌더링이 발생.  
   - `handleEditClick`을 실행할 때마다 `navigateToEdit`이 새롭게 정의되어, 불필요한 렌더링 발생.
   - `handleEditClick`이 불필요하게 새로운 함수를 참조하면서, 이전 이벤트 핸들러와 일관성이 떨어짐.  

### **[해결 방법]**  
`useCallback`을 사용하여 `navigateToEdit` 함수를 메모이제이션함으로써, `navigate`와 `product`가 변경되지 않는 한 함수가 새로 생성되지 않도록 수정.  

```
const navigateToEdit = useCallback(() => {
  navigate(`/register/${product.id}`, { state: { product } });
}, [navigate, product]);

const handleEditClick = () => {
  navigateToEdit();
};
```

### **[적용 후 개선된 점]**
#### **불필요한 함수 재생성을 방지**
- `useCallback`을 사용하여 `navigateToEdit`을 메모이제이션함. 이제 `navigateToEdit` 함수는 `navigate`와 `product`가 변경되지 않는 한  
- 동일한 참조를 유지하게 되어 불필요한 함수 재생성을 방지할 수 있음.

#### **렌더링 최적화**
- `handleEditClick`이 항상 동일한 함수 참조를 유지하여, 불필요한 리렌더링을 방지함. 이로 인해 성능이 개선됨.

#### **버그 해결**
- `useEffect` 의존성 문제나 이벤트 핸들러에서의 예상치 못한 동작을 예방할 수 있었음. 이제 `handleEditClick`에서 항상 같은 함수 참조를 사용하므로, 예기치 않은 동작이 발생하지 않음.

#### **함수 안정성 향상**
- `navigateToEdit`이 변경되지 않아서 코드의 예측 가능성과 안정성이 향상됨. 상태가 변하지 않는 한 동일한 함수 참조를 사용하게 되어,  
- 후속 호출에서의 예기치 않은 동작을 방지함.



## 🌱 프로젝트를 통해 성장한 점

**1. 컴포넌트 설계의 중요성 :**   
    컴포넌트 간의 데이터 흐름을 명확히 정의하는 것에 따라 유지보수성과 확장성이 크게 달라진다는 것을 배웠습니다.  
    특히, 헤더 컴포넌트를 사용자 유형(구매자, 판매자, 비로그인)에 따라 다르게 렌더링하면서, 조건부 렌더링을 효율적으로 적용하는 방법을 익혔습니다.  

**2. API 연동과 비동기 처리 :**    
    단순히 데이터를 불러오는 것이 아니라, API 응답을 처리하고 오류 발생 시 적절한 사용자 피드백을 제공하는 것이 중요하다는 점을 깨달았습니다.  
    이는 ID 중복 검사 기능, 사업자등록번호 인증 기능을 구현하면서 비동기 처리를 최적화하는 방법을 학습할 수 있었습니다.  
  
**3. 사용자 경험(UX)을 고려한 유효성 검사 :**    
    사용자 친화적인 메시지를 제공하고 실시간 피드백을 적용하는 것이 더 나은 경험을 만든다는 점을 배웠습니다.  
    정규식을 활용해 입력값을 검증하고, 즉각적인 피드백을 제공하는 과정에서 UX 개선이 개발에서 중요한 요소임을 다시 한번 느꼈습니다.  

이번 프로젝트를 통해 컴포넌트 설계, 비동기 처리, 상태 관리, UX 개선, 성능 최적화 등 실무에 가까운 다양한 기술적 고민을 경험할 수 있었습니다.  
이러한 경험을 바탕으로 더 효율적인 구조 설계와 최적화된 웹 서비스를 개발할 수 있도록 지속적으로 개선해 나가고 싶습니다.
  
