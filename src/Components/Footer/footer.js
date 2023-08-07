import AccordionStore from "../AccordionAddressStore";
import { useTranslation } from "react-i18next";
import "./footer.css";
import {listImage} from "./dataImg";
import footerPay1 from "../../Images/footerpay.png";
import footerPay2 from "../../Images/footerpay2.png";
import footerPay3 from "../../Images/footerpay3.png";
import footerPay4 from "../../Images/footerpay4.png";
function Footer() {
  const { t } = useTranslation();

  const imagesPay = [footerPay1, footerPay2, footerPay3, footerPay4];
  return (
    <>
      <div className="slider">
        <div className="slide-track">
          {listImage.map((index) => (
            <div key={index} className="slide">
              <img className="imgFooter" alt="" src={index}></img>
            </div>
          ))}
        </div>
      </div>

      <div className="footerForm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 " style={{ marginTop: "50px" }}>
              <form>
                <div className="mb-3">
                  <div>
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                      style={{ fontWeight: "bold", marginBottom: "30px" }}
                    >
                      {t("footer-3")}
                    </label>
                  </div>
                  <div
                    className="mb-3"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <select
                      style={{ width: "32%" }}
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option defaultValue>Giới tính</option>
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                    </select>
                    <input
                      style={{ width: "65%", justifyContent: "end" }}
                      type="text"
                      className="form-control"
                      placeholder="Họ tên..."
                    />
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary subForm btn-sub"
                  style={{
                    width: "100%",
                    backgroundColor: "#87888a",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "unset",
                  }}
                >
                  {t("footer-4")}
                </button>
              </form>
            </div>
            <div className="col-md-12 col-lg-4" style={{ marginTop: "50px" }}>
              <div style={{ marginLeft: "40px" }}>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label"
                  style={{ fontWeight: "bold", marginBottom: "30px" }}
                >
                  {t("footer-5")}
                </label>
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    style={{ marginBottom: "10px" }}
                  >
                    doanvanhiep1302@gmail.com
                  </label>
                </div>
                <div>
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    0344561099
                  </label>
                </div>
                <div>
                  <a
                    href="https://www.facebook.com/doanvanhiep1302/"
                    target="_blank"
                  >
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        margin: "0 10px 10px 0",
                      }}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8Xc+oAa+m1zfcOcepEie0AaOne6vy+0/gAbul6pvHu9f5ile+70fhAh+0Aaen5/P/Z5vuYuvSBq/KOsvPT4fqhv/XC1vhhmO+nwvWFrvKTtvOvx/bH2vnk7fzu8/01f+wkeOtZkO50o/Ale+sAW+dvnvCNIdfhAAADfUlEQVR4nO3da3OiMBiG4RLTVEQKKqL2oNjT//+Ja+3MznanOyQh+74PzHN/7ji5yrEh2JsbxhhjjLH/XH1aPc8O6+Zhs/hs89A8rtv28DQr58/b1fFU1LX2EONbPTXLLqtcZUz+LXOtqirnXJVn5+52v3hsd9rjDWu7vnXO5NbarKfLT1h7YbsX7TH7V8/2mct7aX9Ll9rj9m23/Nx2gbzxCOv2fDmwohqFsG5yE8cbifDRmIi9czzC3XmID19YLN0QHr5wbiLPL2MRbtygHRReWL9Ug33QwuI8eA/FFh6z4XsotPCUCAgrLFIBYYVdkmMQWLhMBgQVtkNvZNCFq4RATOFbqrMMqrCJ/2NwHMJjins1aGHC8yimcJvyNAMpTLwJ8YR3iTchnnCReBPCCeth004jEM7SXioAhS+pNyGasEh9noETllE76fUp2vXB4Q+BPV17DT+TWuOybr9ZH8p/9KyN+tY51Je7+/VqRM+zT4E7aV4tjtpjDmseJqyWJ+0Rh9YEHYZurT3e8PYhQtdqDzeitwBg/qE92pgCrvc2H9EZ9HchdzRmhAdh2CyiKbRHG9PW/2IBdrfpW8Dl0By0BxvVzH+itNpqDzaqAKEb5WEYJNQea1z+QnvWHmtcAcJ77bHGRSGF+FFIIX4UUogfhRTiRyGF+FFIIX4UUogfhRQqd9fbsfV+jG/vj/2f95UYsHh3vQWsU7D9n/aVlROmX5Pn9ZuQe5KqJMw3Uxeap6kLK7mViVpCuZV9OkLJdUVKwk4MqCSUXPymJGymLjSzqQslFxbpCCUXFqkIbSYHVBLeTl2Yv05daCQXu6sIq3LyQrk5DC2h5Hp+DaHoxUJHKPrqoYZQcJJGSSi7oF9DKDhJoyR0oq9fKgitFX35S0PYSQI1hPl+8kLBSRodoeQkjY5Q+O0vBaHw218a21AUqCCUftZfvP/81SN/FvKUu//TnPDr7HU572v34L9Sodv1fly5khX6VPqvNpGcJkxYwHoaCkGjkEL8KKQQPwopxI9CCvGjkEL8KKQQPwopxI9CCvGjkEL8KKQQPwopxI9CCvGjkEL8KKQQPwopxI9CCvGjkEL8KKQQPwopxI9CCvGjkEL8KKQQPwopxI9CCvGjkEL8KKQQPwopxI9CCvGjkEL8KJyA0OWeGcT/0unR9nXhm+yXIDPGGGNsuv0Cse9b0oVwmkAAAAAASUVORK5CYII="
                      alt="..."
                    ></img>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCo2BGGWuHOaBHNcQPIgCeNg"
                    target="_blank"
                  >
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        margin: "0 10px 10px 0",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRde18G_cJGBEqnd0_em7lP3ilRnuenkjE0aA&usqp=CAU"
                      alt=""
                    ></img>
                  </a>
                </div>
                {imagesPay.map((index) => (
                  <img key={index}
                    className="cash"
                    alt=""
                    src={index}
                  ></img>
                ))}
              </div>
            </div>
            <div className="col-md-12 col-lg-4" style={{ marginTop: "50px" }}>
              <div className="addressBig" style={{ marginLeft: "40px" }}>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label"
                  style={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  HANOI STORES
                </label>
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    style={{ marginBottom: "10px" }}
                  >
                    {t("address-1")}
                    <br />
                    {t("address-2")}
                    <br />
                    {t("address-3")}
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    TP.HCM STORES
                  </label>
                  <div>
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                      style={{ marginBottom: "10px" }}
                    >
                      {t("address-4")}
                      <br />
                      {t("address-5")}
                    </label>
                  </div>
                </div>
              </div>
              <div className="addressSmall">
                <AccordionStore />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "#dddbd7", padding: "10px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-5">
              <p style={{ fontSize: "14px" }}>{t("footer-1")}</p>
              <p style={{ fontSize: "14px" }}>{t("footer-2")}</p>
            </div>
            <div className="col-5 text-end" style={{ margin: "auto 0" }}>
              <img
                src="https://curnonwatch.com/_next/static/media/certificate.e07e4993.png"
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
