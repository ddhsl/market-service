import React from "react";
import {
  FooterWrap,
  PolicySection,
  PolicyList,
  SnsSection,
  SnsList,
  AddressList,
} from "../styles/footerStyle";
import instaIcon from "../assets/icon-insta.svg";
import facebookIcon from "../assets/icon-fb.svg";
import youtubeIcon from "../assets/icon-yt.svg";

export default function Footer() {
  return (
    <FooterWrap>
      <div>
        <PolicySection>
          <h2 className="sr-only">정책 살펴보기</h2>
          <PolicyList>
            {policyLinks.map((link, index) => (
              <li key={index}>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.preventDefault()} // 클릭 시 기본 동작 방지
                >
                  <span
                    style={{
                      fontWeight:
                        link === "개인정보처리방침" ? "bold" : "normal",
                    }}
                  >
                    {link}
                  </span>
                </button>
              </li>
            ))}
          </PolicyList>
        </PolicySection>
        <SnsSection>
          <h2 className="sr-only">SNS 바로가기</h2>
          <SnsList>
            {snsLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <img src={link.icon} alt={link.alt} />
                </a>
              </li>
            ))}
          </SnsList>
        </SnsSection>
      </div>
      <address>
        <h2 className="sr-only">기업정보</h2>
        <AddressList style={{ color: "var(--sub-color)" }}>
          {addressDetails.map((detail, index) => (
            <div key={index} style={{ display: "flex" }}>
              <dt
                className={
                  detail.title === "기업이름" || detail.title === "기업주소"
                    ? "sr-only"
                    : undefined
                }
              >
                {detail.title}
              </dt>
              <dd
                style={{
                  fontWeight:
                    detail.info === "(주)HODU SHOP" ? "700" : "normal",
                }}
              >
                {detail.info}
              </dd>
            </div>
          ))}
        </AddressList>
      </address>
    </FooterWrap>
  );
}

const policyLinks = [
  "호두샵 소개",
  "이용약관",
  "개인정보처리방침",
  "전자금융거래약관",
  "청소년보호정책",
  "제휴문의",
];

const snsLinks = [
  {
    icon: instaIcon,
    alt: "인스타그램 바로가기",
    url: "https://www.instagram.com",
  },
  {
    icon: facebookIcon,
    alt: "페이스북 바로가기",
    url: "https://www.facebook.com",
  },
  {
    icon: youtubeIcon,
    alt: "유튜브 바로가기",
    url: "https://www.youtube.com",
  },
];

const addressDetails = [
  { title: "기업이름", info: "(주)HODU SHOP" },
  {
    title: "기업주소",
    info: "제주특별자치도 제주시 동광고 137 제주코딩베이스캠프",
  },
  { title: "사업자번호 : ", info: "000-0000-0000 | 통신판매업" },
  { title: "대표 : ", info: " 김호두" },
];
