import styled from "styled-components";

export const FooterWrap = styled.footer`
  width: 100%;
  height: 298px;
  background-color: var(--back-color);
  margin-top: 180px;
  padding: 0 6%;
  & > div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 22px;
    border-bottom: 1px solid #c4c4c4;
    margin-bottom: 30px;
  }
`;

export const PolicySection = styled.section`
  margin-top: 60px;
`;

export const PolicyList = styled.ul`
  display: flex;
  li > button::before {
    content: "|";
    margin: auto 14px;
  }
  li:first-child button::before {
    content: none;
  }
`;

export const SnsSection = styled.section`
  margin-top: 54px;
`;

export const SnsList = styled.ul`
  display: flex;
  gap: 14px;
`;

export const AddressList = styled.dl`
  color: var(--sub-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
  dt {
    margin-right: 5px;
  }
`;
