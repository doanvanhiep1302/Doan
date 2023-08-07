import "../../DecripstionWebsite/decrip.css";
import bannerImg from "../../../Images/bestseller.png";
import { useTranslation } from 'react-i18next';
import ContentMen from '../Content/contentMen';

function BestSeller() {

    const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="header">
          <img style={{
            maxWidth: '100%',
            height: '100%'
          }} src={bannerImg} alt="" className="img-fluid" />
        </div>
        <h3 className="h3TitleDecripstion">WHITESANDS</h3>
        <p className="pTextDecroption">{t("p-seller")}</p>
      </div>
    </>
  );
}

export default BestSeller;
