import {Link} from 'react-router-dom';
import productImg1 from '../../../Images/1.jpg';
import './styles.scss'
import '../Content/content.css';
import ProductItem from "../productItem";
import React, {useEffect, useState} from "react";
import {getProduct} from "../../../api/product";

function ManBestSeller({category}) {


    const [listBestSell, setListBestSell] = useState([])

    useEffect(() => {
        getProduct({
            "direction": "DESC",
            "pageNo": 1,
            "pageSize": 4,
            "keyword": "",
            "orderBy": "sale_number",
            "isBestSell": true,
            "parentCategoryId": category?.id,
        }).then(res => {
                if (res && res.data) {
                    const {data} = res.data;
                    setListBestSell(data.content)
                }
            }
        )
    }, [category])


    return (
        <>
            <div className="best-sell">
                <div className="best-sell-content">
                    <div className="title">{category?.title} BEST SELLERS</div>
                    <Link className="more" to={`/product/best-seller/${category.id}`}>
                        <div>Xem tất cả ➾</div>
                    </Link>
                </div>
                <div className="product-container">
                    {listBestSell && listBestSell.length ? listBestSell.map((item) =>
                            (<ProductItem key={item.id} item={item}/>))
                        : null}
                </div>
            </div>
        </>
    )
        ;
}

export default ManBestSeller;
