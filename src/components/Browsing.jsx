import styled from "styled-components";
import swiper1Icon from "../assets/icon-swiper-1.svg";
import swiper2Icon from "../assets/icon-swiper-2.svg";
export default function Browsing() {
  const dots = new Array(5).fill(null); // 동적으로 5개의 dot을 생성
  return (
    <BrowseSection>
      <h2 className="sr-only">둘러보기</h2>
      <div>
        {dots.map((_, index) => (
          <Dot key={index} isFirst={index === 0} />
        ))}
      </div>
    </BrowseSection>
  );
}

const BrowseSection = styled.section`
  background-color: var(--back-color);
  height: 500px;
  width: 100%;
  background-image: url(${swiper1Icon}), url(${swiper2Icon});
  background-repeat: no-repeat;
  background-position: center left 2%, center right 2%;
  & > div {
    display: flex;
    gap: 6px;
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => (props.isFirst ? "#000" : "#fff")};
  position: relative;
  top: 474px;
  left: 50%;
  z-index: 100;
`;
