import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider } from "@mui/material";

function StateMenuMen() {
  return (
    <>
      <Link to="">
        <div className="StateMenuHover">
          <div style={{ width: "80%" }}>
            <h3 style={{ paddingBottom: "5px" }}>ĐỒNG HỒ</h3>
            <p>BÁN CHẠY NHẤT</p>
          </div>
          <div>
            <ChevronRightIcon fontSize="large" />
          </div>
        </div>
        <Divider />
        <div className="StateMenuHover">
          <div style={{ width: "80%" }}>
            <h3 style={{ paddingBottom: "5px" }}>PHỤ KIỆN</h3>
          </div>
          <div>
            <ChevronRightIcon fontSize="large" />
          </div>
        </div>
      </Link>
    </>
  );
}
export default StateMenuMen;
