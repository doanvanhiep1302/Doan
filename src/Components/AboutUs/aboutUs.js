import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";
import "./aboutUs.css";
import { useTranslation } from "react-i18next";
import bannerImg from "../../Images/bannerAbouUs.png";
import "../DecripstionWebsite/decrip.css";
import video1 from '../../Images/curnon.mp4';

function AboutUs() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="container-fluid overAboutUs">
        <div className="text-center">
          <img src={bannerImg} className="img-fluid" alt="Error" />
        </div>
        <div className="overTitleAboutUs text-center">
          <h1 className="titleAboutUs">{t("AboutUs-1")}</h1>
          <p className="vietnameseAboutUs">/cơ - nần/!</p>
          <p className="descriptionAboutUs">{t("AboutUs-2")}</p>
        </div>
        <div className="container overContentAboutUs">
          <div className="wrapperWhyNot">
            <div className="contentImgAboutUs text-center">
              <img
                src="https://curnonwatch.com/_next/static/media/why.dadbe7c5.png"
                alt="..."
              ></img>
            </div>
            <div className="descriptionContentAboutUs text-center">
              <p className="descriptionCAU1">TẠI SAO KHÔNG?</p>
              <p className="descriptionCAU2">{t("AboutUs-3")}</p>
              <p className="descriptionCAU3">{t("AboutUs-4")}</p>
              <p className="descriptionCAU4">{t("AboutUs-5")}</p>
            </div>
          </div>
        </div>
        <div
          className="overEndContentABU"
          style={{ backgroundColor: "#f1f0ee", marginBottom: "50px" }}
        >
          <div className="container">
            <div className="wrapperValue">
              <div className="endContentAboutUS1">
                <p className="endContent1 text-center">GIÁ TRỊ CỐT LÕI</p>
                <div className="endContent2">
                  <span>{t("AboutUs-6")}</span>
                </div>
                <p className="endContent3">C.E.O | FOUNDER: Quang Thái</p>
              </div>
              <div className="endContentAboutUS2 text-center">
                <img
                  src="https://curnonwatch.com/_next/static/media/pic-02.e2d7363f.jpg"
                  alt="..."
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapperDecripstion">
          <video 
          preload="auto"
             src={video1}
             width="100%"
             controls
             autoPlay
          />
        </div>
        <div className="container text-center">
          <div className="overFooterABU">
            <div className="customWidth">
              <div>
                <img
                  src="https://curnonwatch.com/_next/static/media/Illus-01.2bc704d7.png"
                  alt=""
                ></img>
              </div>
              <p className="footerAboutUs1">Dám nghĩ, dám làm</p>
              <p className="footerAboutUs2">{t("AboutUs-7")}</p>
            </div>
            <div className="customWidth">
              <div>
                <img
                  src="	https://curnonwatch.com/_next/static/media/Illus-02.f271c5c6.png"
                  alt=""
                ></img>
              </div>
              <p className="footerAboutUs1">
                Bắt đầu và kết thúc bằng khách hàng
              </p>
              <p className="footerAboutUs2">{t("AboutUs-8")}</p>
            </div>
            <div className="customWidth">
              <div>
                <img
                  src="https://curnonwatch.com/_next/static/media/Illus-03.53789ba0.png"
                  alt=""
                ></img>
              </div>
              <p className="footerAboutUs1">Truyền cảm hứng</p>
              <p className="footerAboutUs2">{t("AboutUs-9")}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
