import styled from "styled-components";

export const Title = styled.header`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
  padding: 0 6%;
`;

export const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 124px;
  height: 38px;
`;

export const SearchInput = styled.input`
  width: 400px;
  height: 46px;
  margin-left: 30px;
  border: 2px solid var(--main-color);
  border-radius: 50px;
  color: var(--sub-color);
  padding-left: 20px;
`;

export const SearchImg = styled.img`
  width: 28px;
  height: 28px;
  margin-left: -45px;
  margin-bottom: -8.5px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 26px;
`;

export const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: ${(props) => (props.isSeller ? "var(--main-color)" : "none")};
  color: ${(props) => (props.isSeller ? "white" : "var(--sub-color)")};
`;

export const NavText = styled.p`
  color: var(--sub-color);
  font-size: 14px;
`;
