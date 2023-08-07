import React, {useRef, useState} from 'react';
import './styles.scss';
import {Chevron} from "../../../component-utility/icons-component";
import {Checkbox} from "@mui/material";
import FilterContentList from "./FilterContentList";
import {FILTER_TYPE, SORT_TYPE} from "../../../common/common";
import {useOutsideAlerter} from "../../../component-utility/hook";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const TYPE_FILTER = [
    {
        key: FILTER_TYPE.COLLECTION,
        name: "Bộ sưu tập",
        active: false,
    },
    {
        key: FILTER_TYPE.SIZE,
        name: "size",
        active: false,
    },
    {
        key: FILTER_TYPE.COLOR,
        name: "Màu sắc",
        active: false,
    },
    {
        key: FILTER_TYPE.PRICE,
        name: "Khoảng giá",
        active: false,
    }
]

const LIST_SORT = [
    {
        key: SORT_TYPE.DEFAULT,
        name: "Mặc định"
    },
    {
        key: SORT_TYPE.ASC,
        orderBy: "price_sale",
        name: "Giá tăng dần"
    },
    {
        key: SORT_TYPE.DESC,
        orderBy: "price_sale",
        name: "Giá giảm dần"
    }
]


const FilterProduct = ({
                           categoryDetail,
                           filterProduct,
                           onChangeCollection,
                           onChangeSize,
                           onChangeColor,
                           onChangePriceFrom,
                           onChangePriceTo,
                           onChangeSort,
                           totalPages,
                           totalElements,
                           onClearFilter,
                           numberOfElements
                       }) => {

    const [filterSelected, setFilerSelected] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [isSortShow, setIsSortShow] = useState(false);

    const refFilterContent = useRef(null);
    const refFilterProperties = useRef(null);
    const refSort = useRef(null);

    useOutsideAlerter(refFilterContent, () => {
        if (isShow && filterSelected) {
            setIsShow(false);
            setFilerSelected(null);
        }
        if (isSortShow) {
            setIsSortShow(false);
        }
    });

    useOutsideAlerter(refFilterProperties, () => {
        if (isShow && filterSelected) {
            setIsShow(false);
            setFilerSelected(null);
        }
    });

    const onSelectFilter = (item) => {
        setFilerSelected(item);
        setIsShow(true);
        setIsSortShow(false);
    }

    function onOpenFilterSort() {
        setIsSortShow(!isSortShow);
        setIsShow(false);
    }

    return (<>
        <div className="category-header">
            <div className="header-left">
                <div>
                    {categoryDetail?.title}
                </div>
                <div>
                    {categoryDetail?.desc}
                </div>
            </div>
            <div className="header-right">
                {numberOfElements} trên {totalElements} sản phẩm
            </div>
        </div>
        <div className="filter-wrapper" >
            <div ref={refFilterContent}
                className="filter" >
                <div className="filter-header">
                    <div className="filter-header-properties">
                        <ul>
                            {TYPE_FILTER.map(item => <li onClick={() => onSelectFilter(item)}>
                                <div
                                    className={`filter ${filterSelected?.key === item?.key ? "active" : ""}`}>{item.name}<Chevron
                                    height={18}/></div>
                            </li>)}
                        </ul>
                    </div>
                    <div className="filter-header-sort" ref={refSort}>
                        <div className="filter"><span onClick={() => onOpenFilterSort()}>Sắp xếp theo</span><Chevron
                            height={18}/></div>
                    </div>
                </div>
                {isShow ? <div className="filter-content">
                    <div className="body">
                        <FilterContentList type={filterSelected?.key} filterProduct={filterProduct}
                                           onChangeSize={onChangeSize} onChangeCollection={onChangeCollection}
                                           onChangeColor={onChangeColor}
                                           onChangePriceFrom={onChangePriceFrom}
                                           onChangePriceTo={onChangePriceTo}
                                           totalPages={totalPages}
                                           totalElements={totalElements}
                        />
                    </div>
                    <div className="footer">
                        {/*<div>*/}
                        {/*    <Checkbox/> Ẩn sản phẩm hết hàng*/}
                        {/*</div>*/}
                        <div>
                            {totalElements || 0} sản phẩm phù hợp
                        </div>
                        <div className="text-decoration-underline" onClick={onClearFilter}>
                            Reset
                        </div>
                    </div>
                </div> : null}
                {isSortShow ? <div className="dropdown-filter-sort">
                    {LIST_SORT.map((item) => <div className="dropdown-filter-sort-item" onClick={() => onChangeSort(item)}>
                        <div><span className="">{item.name}</span>{filterProduct.direction === item.key ? <span><FontAwesomeIcon icon={faCheck}/></span> : <span></span>}</div>

                    </div>)}
                    </div>
                    : null}
            </div>
        </div>
    </>)
}
export default FilterProduct;