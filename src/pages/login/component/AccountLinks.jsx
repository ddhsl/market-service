import styled from "styled-components";
import { Link } from "react-router-dom";

export default function AccountLinks() {
  return (
    <AccountSection>
      <h3 className="sr-only">계정 관리</h3>
      <ul>
        <li>
          <Link to="/join">회원가입 </Link>
        </li>
        <li>비밀번호 찾기</li>
      </ul>
    </AccountSection>
  );
}

const AccountSection = styled.section`
  ul {
    display: flex;
    margin-top: 10px;
    color: #333;
  }

  ul > li:first-child::after {
    content: "|";
    margin: 0 10px;
  }
`;
