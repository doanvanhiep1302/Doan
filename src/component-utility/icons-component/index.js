import {ReactComponent as IconChevron} from "./../../assets/icons-svg/chevron_down.svg";
import {ReactComponent as IconArrowRight} from "./../../assets/icons-svg/arow-right.svg";
import {ReactComponent as IconBackButton} from "./../../assets/icons-svg/back-button.svg";

const Chevron = ({height}) => {
    return <>
        <IconChevron height={height}/>
    </>
}

const ArrowRight = ({height}) => {
    return <>
        <IconArrowRight height={height}/>
    </>
}

const CardBackButton = ({ title, onClick, height }) => {
    return <>
        <span className="back-icon" style={{color: "#2469DF",fontWeight: "bold", display: "flex", alignItems: "center", cursor: "pointer"}}><IconBackButton height={height}/>Quay lại</span>
    </>
};

export  {Chevron, ArrowRight, CardBackButton};