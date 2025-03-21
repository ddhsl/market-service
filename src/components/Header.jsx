import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Title,
  SearchSection,
  Logo,
  SearchInput,
  SearchImg,
  Nav,
  NavButton,
  NavText,
} from "../styles/headerStyle";
import logo from "../assets/Logo-hodu.png";
import searchImg from "../assets/search.png";
import cartIcon from "../assets/icon-shopping-cart.svg";
import userIcon from "../assets/icon-user.svg";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { isLoggedIn, isSeller, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const handleMyPageClick = (e) => {
    if (isLoggedIn) {
      e.preventDefault(); // 네비게이션 방지
      setShowLogout(!showLogout);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogout(false); // 로그아웃 후 로그아웃 버튼 숨기기
  };

  return (
    <>
      <Title>
        <div>
          <SearchSection>
            <h1>
              <Link to="/">
                <Logo src={logo} alt="HODU 로고" />
              </Link>
            </h1>
            <form action="">
              <label htmlFor="search" className="sr-only">
                상품 검색하기
              </label>
              <SearchInput
                type="text"
                name="search"
                id="search"
                placeholder="상품을 검색해보세요!"
              ></SearchInput>
              <button type="submit">
                <SearchImg src={searchImg} alt=""></SearchImg>
              </button>
            </form>
          </SearchSection>
        </div>
        <Nav>
          {/* 첫 번째 Nav 항목 */}
          {(!isLoggedIn || !isSeller) && (
            <Link to="/cart">
              <NavButton>
                <img src={cartIcon} alt="장바구니로 이동하기" />
                <NavText>장바구니</NavText>
              </NavButton>
            </Link>
          )}

          {isLoggedIn && (
            <MyPageContainer>
              <Link to="#" onClick={handleMyPageClick}>
                <NavButton>
                  <img src={userIcon} alt="마이페이지로 이동하기" />
                  <NavText>마이페이지</NavText>
                </NavButton>
              </Link>
              {showLogout && (
                <LogoutBox onClick={handleLogout}>로그아웃</LogoutBox>
              )}
            </MyPageContainer>
          )}

          {/* 두 번째 Nav 항목 */}
          {!isLoggedIn && (
            <Link to="/login">
              <NavButton>
                <img src={userIcon} alt="로그인 하기" />
                <NavText>로그인</NavText>
              </NavButton>
            </Link>
          )}

          {isLoggedIn && isSeller && (
            <Link to="/seller-center">
              <NavButton isSeller={true}>
                <NavText isSeller={true}>판매자 센터</NavText>
              </NavButton>
            </Link>
          )}
        </Nav>
      </Title>
    </>
  );
}

const MyPageContainer = styled.div`
  position: relative;
`;

const LogoutBox = styled.button`
  border: 1px solid gray;
  width: 78px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  position: absolute;
  z-index: 1000;
  top: 120%; /* "마이페이지" 버튼 바로 아래에 위치 */
  left: -7%;
  background-color: #fff;
  padding: 4px;
  font-size: 14px;
  color: var(--sub-color);
  &:hover {
    color: var(--main-color);
    border: 1px solid var(--main-color);
  }
`;
