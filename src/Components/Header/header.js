import "./header.css";
import { useTranslation } from "react-i18next";
import dataSlider from './dataSlider';
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from 'react-router-dom';

function Header({listCategory, onScrollToBestSeller}) {
  const { t } = useTranslation();
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  return (
    <>
      <div className="overHeader">
        <div className="header">
          {dataSlider.map((obj, index) => {
            return (
              <div
                key={obj.id}
                className={
                  slideIndex === index + 1
                    ? "slide-header active-anim"
                    : "slide-header"
                }
              >
                <img
                  src={process.env.PUBLIC_URL + `/Image/header${index + 1}.jpg`}
                  alt="" className="img-fluid"
                />
              </div>
            );
          })}
          <button className="btn-slide-left" onClick={prevSlide}>
            <ChevronLeftIcon sx={{ color: "white" }} fontSize="large" />{" "}
          </button>
          <button className="btn-slide-right" onClick={nextSlide}>
            <ChevronRightIcon sx={{ color: "white" }} fontSize="large" />{" "}
          </button>
        </div>
        <div className="text">
          <span className="sp-text">BEST SELLER</span>
          <h1 className="sp-h1">WHITESANDS COLLECTION</h1>
          <span className="sp-text" id="one" style={{ fontSize: "20px" }}>
            UP TO 25% OFF
          </span>
          <span className="sp-text" style={{ marginTop: "20px" }}>
            {t("header-1")}
          </span>
          <Link><button className="sp-btn" onClick={onScrollToBestSeller} >SHOP NOW</button></Link>
        </div>
      </div>
    </>
  );
}
export default Header;
