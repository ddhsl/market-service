import { useState } from "react";
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

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const navItems = [
    {
      icon: cartIcon,
      text: "장바구니",
      alt: "장바구니로 이동하기",
      isIconVisible: true,
    },
    {
      icon: userIcon,
      text: isLoggedIn ? (isSeller ? "판매자 센터" : "마이페이지") : "로그인",
      alt: isLoggedIn
        ? isSeller
          ? "판매자 센터로 이동하기"
          : "마이페이지로 이동하기"
        : "로그인 하기",
      isIconVisible: !isSeller,
    },
  ];

  return (
    <Title>
      <div>
        <SearchSection>
          <h1>
            <Logo src={logo} alt="HODU 로고" />
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
        {navItems.map(({ icon, text, alt, isIconVisible }, index) => (
          <NavButton key={index}>
            {isIconVisible && <img src={icon} alt={alt} />}
            <NavText>{text}</NavText>
          </NavButton>
        ))}
      </Nav>
    </Title>
  );
}
