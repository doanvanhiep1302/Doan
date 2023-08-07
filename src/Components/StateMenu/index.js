import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SortIcon from "@mui/icons-material/Sort";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CloseIcon from "@mui/icons-material/Close";
import StateMenuMen from "./StateMenuMen";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from 'react-router-dom';
import "./StateMenu.css";
import StateMenuWoman from "./StateMenWoman";

export default function StateMenu({currentUser}) {
  const [state, setState] = React.useState({
    left: false,
  });

  const [stateMen, setStateMen] = React.useState(true);
  const [stateWoman, setStateWoman] = React.useState(false);

  const menHover = () => {
    setStateWoman(false);
    setStateMen(true);
  }

  const womanHover = () => {
    setStateMen(false);
    setStateWoman(true);
  }
 

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    menHover();
  };

  const list = (anchor) => (
    <div style={{ display: "flex" }}>
      <div>
        <Box
          sx={{ width: "70vw" }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <div className="wrapperStateMenu">
            <div className={ stateMen ? "genStateMenu  activeStateHover" : "genStateMenu"}
            onMouseEnter={menHover}>
              <h3>
                <MaleIcon color="primary" />
                NAM GIỚI
              </h3>
            </div>

            <div className={ stateWoman ? "genStateMenu  activeStateHover" : "genStateMenu"}
            onMouseEnter={womanHover}>
              <h3>
                <FemaleIcon sx={{ color: "#FF00FF" }} />
                NỮ GIỚI
              </h3>
            </div>
          </div>
          <Divider />
          <div className={stateMen ? "showStateMenuMen" : "hideStateMenuMen"}>
            <StateMenuMen />
          </div>
          <div className={stateWoman ? "showStateMenuWoman" : "hideStateMenuWoman"}>
            <StateMenuWoman />
          </div>
          <Divider />
          <Link to="/aboutUS">
          <div className="StateMenuHover">
            <div style={{ width: "80%" }}>
              <h3 style={{ paddingBottom: "5px" }}>
                <InfoIcon color="success" fontSize="large" /> VỀ CURNON
              </h3>
            </div>
            <div>
              <ChevronRightIcon fontSize="large" />
            </div>
          </div>
          </Link>
        </Box>
      </div>
      <div>
        <Box>
          <Button onClick={toggleDrawer(anchor, false)} sx={{ color: "black" }}>
            <CloseIcon />
          </Button>
        </Box>
      </div>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <SortIcon fontSize="large" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
