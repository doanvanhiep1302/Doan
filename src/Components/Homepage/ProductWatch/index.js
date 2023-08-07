import React from 'react';
import Navbar from "../../Navbar/navbar";
import Header from "../../Header/header";
import Infor from "../../InforHeader/infor-header";
import HomeContentBestSell from "../HomeContentBestSell";
import Decripsiton from "../../DecripstionWebsite";
import Footer from "../../Footer/footer";

function ProductWatch() {

    return (
        <>
            <Navbar/>
            <Infor/>
            <HomeContentBestSell listCategory={listCategory}/>
            <Decripsiton/>
            <Footer/>
        </>
    )

}
export default ProductWatch;