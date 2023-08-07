import React from 'react'
import './styles.scss'
import {thousandsSeparators} from "../../common/fCommon";

function UpDownSaleOff({num}) {
    console.log(num)
    return <>{num !== 0 && <span className={`saleOff ${num > 0 ? "down" : "up"}`}>{thousandsSeparators(num || 0)}%</span>}</>
}

export default UpDownSaleOff;