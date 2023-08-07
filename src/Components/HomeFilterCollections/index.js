import Header from '../Header/header';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
// import ContentMen from './Content/contentMen';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCategoryDetail} from "../../api/category";
import HomePageMan from "../Homepage/HomPageMan";
import dataSlider from "../Header/dataSlider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function HomePageCollection ({isBestSeller}) {

    const {id} = useParams();

    const [categoryDetail, setCategoryDetail] = useState(null);

    useEffect(() => {
        getCategoryDetail({
            id: id,
        }).then(res => {
            const {data} = res.data;
            if(data) {
                setCategoryDetail(data);
            }
        })
    }, [id])

    return(
        <>
            {/*<Navbar />*/}
            <div className="header">

                        {/*<div*/}
                        {/*    className="slide-header"*/}
                        {/*>*/}
                            <img
                                src={process.env.PUBLIC_URL + `/Image/header${1}.jpg`}
                                alt="" className="img-fluid"
                            />
                        {/*</div>*/}

            </div>
            <HomePageMan categoryDetail={categoryDetail} isBestSeller={isBestSeller} isCollection={true} collectionsId={id}/>
            <Footer />
        </>
    )
}
export default HomePageCollection;