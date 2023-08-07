import {useState, useEffect} from "react";
import './content.css';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import FilterProduct from "../FilterProduct";
import {getProduct} from "../../../api/product";
import ProductItem from "../productItem";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Pagination, Stack, TextField} from "@mui/material";
import {getCollections} from "../../../api/filter";


function ContentMen({categoryDetail, isBestSeller, isCollection, collectionsId}) {

    const {id} = useParams();

    const [data, setData] = useState([]);
    const [totalElements, setTotalElement] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [collectionSelected, setCollectionSelected] = useState("");

    const [filterProduct, setFilterProduct] = useState({
        colors: [],
        sizes: [],
        collections: [],
        priceFrom: "",
        priceTo: "",
        direction: "",
        orderBy: "product_id"
    })
    const [page, setPage] = useState({});
    const [elementSize, setElementSize] = useState(8);

    useEffect(() => {
        getCollections().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                const collectionNameSelected = data.find(item => item.id == collectionsId)?.name;
                setCollectionSelected(collectionNameSelected);
            }
        })
    }, [collectionsId]);

    useEffect(() => {
        if(!isCollection) {
            if(isBestSeller) {
                getProduct({
                    "direction": "DESC",
                    "pageNo": pageNo,
                    "keyword": keyword || "",
                    "pageSize": elementSize,
                    "orderBy": "sale_number",
                    "isBestSell": true,
                    "parentCategoryId": id,
                }).then(res => {
                        if (res && res.data) {
                            const {data} = res.data;
                            setData(data.content);
                            setTotalElement(data?.totalElements || 0);
                            setTotalPages(data?.totalPages || 0);
                            setNumberOfElements(data?.numberOfElements || 0);
                        }
                    }
                )
            }
            else {
                getProduct(
                    {
                        "id": 15,
                        "colors": filterProduct?.colors,
                        "size": filterProduct?.sizes,
                        "collections": filterProduct?.collections,
                        "priceFrom": filterProduct?.priceFrom,
                        "priceTo": filterProduct?.priceTo,
                        "categoryId": categoryDetail?.id,
                        "direction": filterProduct.direction,
                        "keyword": keyword || "",
                        "pageNo": pageNo,
                        "pageSize": elementSize,
                        "orderBy": `${isBestSeller ? "sale_number" : filterProduct.orderBy}`,
                        "isBestSell": false,
                        "parentCategoryId": categoryDetail?.parentId,

                    })
                    .then(res => {
                        if (res && res.data) {
                            const {data} = res.data;
                            setData(data.content)
                            setTotalElement(data?.totalElements || 0);
                            setTotalPages(data?.totalPages || 0);
                            setNumberOfElements(data?.numberOfElements || 0);
                        }
                    })
                    .catch(error => console.log(error));
            }

        }
        else {

                getProduct(
                    {
                        "id": 15,
                        "colors": filterProduct?.colors,
                        "size": filterProduct?.sizes,
                        "collections": filterProduct?.collections,
                        "priceFrom": filterProduct?.priceFrom,
                        "priceTo": filterProduct?.priceTo,
                        "categoryId": categoryDetail?.id,
                        "direction": filterProduct.direction,
                        "pageNo": pageNo,
                        "keyword": keyword || "",
                        "pageSize": elementSize,
                        "orderBy": `${isBestSeller ? "sale_number" : filterProduct.orderBy}`,
                        "isBestSell": false,
                        "parentCategoryId": categoryDetail?.parentId,
                        collectionId: collectionsId,
                        isFindCollections: true
                    })
                    .then(res => {
                        if (res && res.data) {
                            const {data} = res.data;
                            setData(data.content);
                            setTotalElement(data?.totalElements || 0);
                            setTotalPages(data?.totalPages || 0);
                            setNumberOfElements(data?.numberOfElements || 0);
                        }
                    })
                    .catch(error => console.log(error));


        }
    }, [categoryDetail, isBestSeller, filterProduct, pageNo, collectionsId, keyword]);

    const onChangeCollection = (item) => {
        const tmp = {...filterProduct};
        const findIndex = tmp.collections.findIndex(i => i === item.id);
        if (findIndex > -1) {
            const removedList = tmp.collections.filter(i => i !== item.id);
            tmp.collections = removedList;
        } else {
            tmp.collections.push(item.id);
        }
        setFilterProduct(tmp);
    }

    const onChangeSize = (item) => {
        const tmp = {...filterProduct};
        const findIndex = tmp.sizes.findIndex(i => i === item.id);
        if (findIndex > -1) {
            const removedList = tmp.sizes.filter(i => i !== item.id);
            tmp.sizes = removedList;
            setFilterProduct(tmp);

        } else {
            tmp.sizes.push(item.id);
        }
        setFilterProduct(tmp);

    }

    const onChangeColor = (item) => {
        const tmp = {...filterProduct};
        const findIndex = tmp.colors.findIndex(i => i === item?.id);
        if (findIndex > -1) {
            const removedList = filterProduct.colors.filter(i => i !== item?.id);
            tmp.colors = removedList;
            setFilterProduct(tmp);
        } else {
            if (item?.id) {
                tmp.colors.push(item?.id);
                setFilterProduct(tmp);
            }
        }
    }

    const onChangePriceFrom = (value) => {
        const tmp = {...filterProduct};
        tmp.priceFrom = value;
        setFilterProduct(tmp);

    }

    const onChangePriceTo = (value) => {
        const tmp = {...filterProduct};
        tmp.priceTo = value;
        setFilterProduct(tmp);
    }

    const onClearFilter = () => {
        const tmp = {...filterProduct};
        const tmpClear = {
            ...filterProduct,
            colors: [],
            sizes: [],
            collections: [],
            priceFrom: "",
            priceTo: "",
            direction: "",
        }
        setFilterProduct(tmpClear);
    }

    const onChangeSort = (item) => {
        const tmp = {...filterProduct};
        tmp.direction = item?.key;
        tmp.orderBy = item?.orderBy;
        setFilterProduct(tmp);
    }

    function handleChange(e, value) {
        setPageNo(value);
    }

    function onChangeKeyword(value) {
        setKeyword(value);
    }

    return (
        <div className="container">
            {!isCollection && !isBestSeller? <FilterProduct categoryDetail={categoryDetail} filterProduct={filterProduct}
                           onChangeCollection={onChangeCollection}
                           onChangeSize={onChangeSize} onChangeColor={onChangeColor}
                           onChangePriceFrom={onChangePriceFrom}
                           onChangePriceTo={onChangePriceTo}
                           totalPages={totalPages}
                           totalElements={totalElements}
                           onClearFilter={onClearFilter}
                           onChangeSort={onChangeSort}
                           numberOfElements={numberOfElements}
            /> : null}

            {isCollection ? <h5>Bộ sưu tập: {collectionSelected}</h5> : null}
                <div style={{marginTop: "80px"}}>

            <TextField style={{width: "30%"}}
                         id="outlined-basic" label="Tên Sản Phẩm" variant="outlined" fontSize="small" onChange={(e) => onChangeKeyword(e.target.value)}/>
            </div>

            <div className="product-container mt-5">
                {data && data.length ?
                    <>{data.map((item) =>
                        (
                            <ProductItem key={item.id} item={item}
                            />
                        ))}

                    </>

                    : null}
            </div>
            <Stack spacing={2} className="float-end">
                <Pagination count={totalPages} page={pageNo} variant="outlined" color="primary" onChange={handleChange} />
            </Stack>
        </div>
    );
}

export default ContentMen;
