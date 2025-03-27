import React, { useState } from "react";
import styled from "styled-components";
import swiper1Icon from "../assets/icon-swiper-1.svg";
import swiper2Icon from "../assets/icon-swiper-2.svg";

// 이미지 import
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";

const images = [banner1, banner2, banner3, banner4, banner5];

export default function Browsing() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1); // 마지막 배너에서는 넘기지 않도록 제한
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // 첫 번째 배너에서는 되돌리지 않도록 제한
    }
  };

  return (
    <BrowseSection>
      <h2 className="sr-only">둘러보기</h2>

      <div className="banner">
        <div
          className="banner-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`배너 ${index + 1}`}
              className="banner-img"
            />
          ))}
        </div>
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <Dot key={index} $isActive={index === currentIndex} />
        ))}
      </div>

      <div className="swiper-icons">
        <img
          src={swiper1Icon}
          alt="Previous"
          onClick={handlePrev}
          style={{
            opacity: currentIndex === 0 ? 0.5 : 1,
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          }}
        />
        <img
          src={swiper2Icon}
          alt="Next"
          onClick={handleNext}
          style={{
            opacity: currentIndex === images.length - 1 ? 0.5 : 1,
            cursor:
              currentIndex === images.length - 1 ? "not-allowed" : "pointer",
          }}
        />
      </div>
    </BrowseSection>
  );
}

const BrowseSection = styled.section`
  background-color: var(--back-color);
  width: 100%;
  height: 100vh;
  position: relative;

  .banner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .banner-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .swiper-icons {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-50%);
    z-index: 10;

    & > img {
      cursor: pointer;
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    position: absolute;
    bottom: 20px;
    width: 100%;
    z-index: 100;
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? "#000" : "#fff")};
  transition: background-color 0.3s ease;
`;
