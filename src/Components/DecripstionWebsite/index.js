import "./decrip.css";
import { useTranslation } from "react-i18next";

function Decripsiton() {
  const { t } = useTranslation();
  return (
    <>
      <div style={{backgroundColor: '#f1f0ee'}}>
        <div className="wrapperDecripstion">
          <img
            className="logoDecripstion"
            src="https://curnonwatch.com/_next/static/media/logo_small.f2cdcd68.svg"
            alt=""
          />
          <h3 className="h3TitleDecripstion">THE STORY OF CURNON</h3>
          <p className="pTextDecroption">{t("p")}</p>
          <img
            className="bigImgDectipstion"
            src="https://curnonwatch.com/_next/static/media/storyLarge.b54806b1.png"
            alt=""
          />
          <h3 className="h3TitleDecripstion">
            CURNON - LUÔN ĐỒNG HÀNH CÙNG BẠN!
          </h3>
        </div>
      </div>
    </>
  );
}
export default Decripsiton;
