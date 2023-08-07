import React, {useEffect, useState} from "react";
import {FILTER_TYPE} from "../../../../common/common";
import {getCollections, getColor, getSizes} from "../../../../api/filter";
import './styles.scss'
import imgChoice from "../../../Navbar/imgChoice";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const FilterContentList = ({
                               type,
                               filterProduct,
                               onChangeSize,
                               onChangeCollection,
                               onChangeColor,
                               onChangePriceFrom,
                               onChangePriceTo,
                               totalPages,
                               totalElements
                           }) => {

    const [listFilter, setListFiler] = useState([]);

    useEffect(() => {
        switch (type) {
            case FILTER_TYPE.COLLECTION:
                getCollections().then(res => {
                    const {data} = res.data;
                    if (data && data.length) {
                        setListFiler(data)
                    }
                })
                return;
            case FILTER_TYPE.COLOR:
                getColor().then(res => {
                    const {data} = res.data;
                    if (data && data.length) {
                        setListFiler(data)
                    }
                })
                return;
            case FILTER_TYPE.SIZE:
                getSizes().then(res => {
                    const {data} = res.data;
                    if (data && data.length) {
                        setListFiler(data)
                    }
                })
                return;
            default:
                return;
        }
    }, [type])

    const checkFilterActive = (list, item) => {
        return list && list.length && list?.includes(item.id) ? "select-active" : "";
    }

    const renderFilter = (type) => {
        switch (type) {
            case FILTER_TYPE.COLLECTION:
                return <>
                    {listFilter && listFilter.length ? listFilter.map(item => <div
                        onClick={() => onChangeCollection(item)}>
                        <div>
                            <img className={`imgChoice ${checkFilterActive(filterProduct.collections, item)}`}
                                 src={imgChoice[0].img} alt=""/>
                        </div>
                        <div>
                            {item.name}
                        </div>
                    </div>) : <div>Không có dữ liệu hiển thị</div>}
                </>
            case FILTER_TYPE.COLOR:
                return <>
                    {listFilter && listFilter.length ? listFilter.map(item => <div onClick={() => onChangeColor(item)}>
                        <div className={`color`}>
                            <div className="border">
                                <div className={`label ${checkFilterActive(filterProduct.colors, item)}`}
                                     style={{background: `${item.hex}`}}/>
                            </div>
                        </div>
                        <div>
                            {item.name}
                        </div>
                    </div>) : <div>Không có dữ liệu hiển thị</div>}
                </>
            case FILTER_TYPE.SIZE:
                return <>
                    {listFilter && listFilter.length ? listFilter.map(item => <div onClick={() => onChangeSize(item)}>
                        <div className={`size ${checkFilterActive(filterProduct.sizes, item)}`}>
                            <div className="label">{item.name}</div>
                        </div>
                        <div>
                            {item.name}
                        </div>

                    </div>) : <div>Không có dữ liệu hiển thị</div>}
                </>
            case FILTER_TYPE.PRICE:
                return <div className="d-flex align-items-center justify-content-between">
                    <span className="text-nowrap filter-price-title">Lọc theo khoảng giá:</span>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                type="number"
                                required
                                fullWidth
                                id="price-from"
                                label="Từ"
                                name="email"
                                autoComplete="email"
                                value={filterProduct.priceFrom}
                                onChange={(e) => onChangePriceFrom(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                type="number"
                                required
                                fullWidth
                                id="price-to"
                                label="Đến"
                                name="email"
                                autoComplete="email"
                                value={filterProduct.priceTo}
                                onChange={(e) => onChangePriceTo(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </div>

        }
    }

    return <div className="content-list">
        {renderFilter(type)}
    </div>
}
export default FilterContentList;