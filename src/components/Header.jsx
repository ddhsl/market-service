import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function Header() {
  const { isLoggedIn, isSeller, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 폼 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  // 마이페이지 드롭다운 토글 핸들러
  const handleMyPageClick = (e) => {
    e.preventDefault();
    setShowDropdown((prev) => !prev);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    navigate("/");
    setShowDropdown(false);
  };

  // 마이페이지 이동 핸들러
  const handleNavigateToMyPage = () => {
    navigate("/mypage");
    setShowDropdown(false);
  };

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <Title>
      <div>
        <SearchSection>
          <h1>
            <Link to="/">
              <Logo src={logo} alt="HODU 로고" />
            </Link>
          </h1>
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="search" className="sr-only">
              상품 검색하기
            </label>
            <SearchInput
              type="text"
              name="search"
              id="search"
              placeholder="상품을 검색해보세요!"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <SearchImg src={searchImg} alt="검색" />
            </button>
          </form>
        </SearchSection>
      </div>
      <Nav>
        {!isSeller && (
          <NavButton
            as={isLoggedIn ? Link : "div"}
            to={isLoggedIn ? "/cart" : undefined}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
              }
            }}
          >
            <img src={cartIcon} alt="장바구니로 이동하기" />
            <NavText>장바구니</NavText>
          </NavButton>
        )}

        {isLoggedIn && (
          <MyPageContainer ref={dropdownRef}>
            <NavButton as="button" onClick={handleMyPageClick}>
              <img src={userIcon} alt="마이페이지 및 로그아웃 옵션 열기" />
              <NavText>마이페이지</NavText>
            </NavButton>
            {showDropdown && (
              <DropdownMenu>
                {!isSeller && (
                  <DropdownItem onClick={handleNavigateToMyPage}>
                    마이페이지
                  </DropdownItem>
                )}
                <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
              </DropdownMenu>
            )}
          </MyPageContainer>
        )}

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
  );
}

const MyPageContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: -17px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 8px;
  width: 100px;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 15px 15px;
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: var(--sub-color);
  &:hover {
    background-color: #f5f5f5;
    color: var(--main-color);
    font-weight: bold;
  }
`;
