import Header from '../Header/header';
import Infor from '../InforHeader/infor-header';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import ManBestSeller from './ManBestSeller';
import WomanBestSeller from './WomanBestSeller';
import Decripsiton from '../DecripstionWebsite';
import {useEffect, useRef, useState} from "react";
import {getAllCategory} from "../../api/category";
import HomePageBestSeller from "./HomePageBestSeller";
import HomeContentBestSell from "./HomeContentBestSell";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

function HomePage() {
    const user = useSelector(state => state.userSlice);
    const bestSeller = useRef(null);

    const onScrollToBestSeller = () => {
        window.scrollTo(0, bestSeller.current.offsetTop);
    }
    return (
        <>
            <Navbar/>
            <Header onScrollToBestSeller={onScrollToBestSeller}/>
            <Infor/>
            <div ref={bestSeller}>
            <HomeContentBestSell user={user}/>
            </div>
            <Decripsiton/>
            <Footer/>
        </>
    )
}

export default HomePage;