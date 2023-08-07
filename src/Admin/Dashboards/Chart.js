import {
    FormControl, FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import ReactECharts from "echarts-for-react";
import {useSelector} from "react-redux";
import {thousandsSeparators} from "../../common/fCommon";
import './styles.scss'
import {getProduct} from "../../api/product";
import {faUser, faDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../../Components/LoadingSpinner";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import {toast} from "react-toastify";


const si = [
    {v: 1e3, s: "Nghìn"},
    {v: 1e6, s: "Triệu"},
    {v: 1e9, s: "Tỷ"},
    {v: 1e12, s: "Nghìn Tỷ"},
    {v: 1e15, s: "Triệu Tỷ"},
];

const EXPORT_LAYOUT_WIDTH = 1600;
const TIMEOUT_EXPORT = 10000;
const TIME_START_TRACKING = 2000;
const TIME_DIFF_LAST_DOM_UPDATE = 2000;

const numberToString = (num) => {
    if (num === null || num === 0 || num === undefined) return 0;
    if (num > 0) {
        if (num < 1000) {
            return thousandsSeparators(num);
        }
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].v) {
                break;
            }
        }
        return (
            (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1").replace(".", ",") + " " +
            si[i].s
        );
    } else {
        const positiveNumbers = Math.abs(num);
        if (positiveNumbers < 1000) {
            return "-" + thousandsSeparators(positiveNumbers);
        }
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (positiveNumbers >= si[i].v) {
                break;
            }
        }
        return (
            "-" + (positiveNumbers / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1").replace(".", ",") + " " +
            si[i].s
        );
    }
};

const nest = (items, id = 0, link = 'parentId') =>
    items
        ?.filter(item => item[link] === id)
        .map(item => ({
            ...item,
            children: nest(items, item.id)
        }));


const Chart = ({listOrderHistory, listAllProduct}) => {

    const listCategory = useSelector(state => state.categorySlice)?.listCategory;
    const [categorySelected, setCategorySelected] = useState(0);
    const [listBestSeller, setListBestSeller] = useState([]);
    const [isExporting, setIsExporting] = useState(false);
    const refBarChart = useRef(null);
    const refLineChart = useRef(null);
    const exportWrapperLineEL = useRef(null);
    const exportWrapperBarEL = useRef(null);

    const [typeChart, setTypeChart] = useState({
        barChart: listCategory?.[0]?.id,
        lineChart: "month",
    })

    useEffect(() => {
        setCategorySelected(listCategory?.[0]?.id)
    }, [listCategory])

    useEffect(() => {
        getProduct({
            "direction": "DESC",
            "pageNo": 1,
            "pageSize": 5,
            "keyword": "",
            "orderBy": "sale_number",
            "isBestSell": true,
            "parentCategoryId": categorySelected,
        }).then(res => {
                if (res && res.data) {
                    const {data} = res.data;
                    setListBestSeller(data.content)
                }
            }
        )
    }, [categorySelected])

    function onChangeTypeBarChart(value) {
        setCategorySelected(value)
        // setTypeChart({...typeChart, barChart: value})
    }

    function onChangeTypeLineChart(value) {
        setTypeChart({...typeChart, lineChart: value})
    }

    const onExportPDF = (type) => {
        switch (type) {
            case "LINE":
                callExport(exportPDF, refLineChart.current, exportWrapperLineEL.current);
                return;
            case "BAR":
                callExport(exportPDF, refBarChart.current, exportWrapperBarEL.current);
                return;
            default:
                return;
        }

    }


    const exportPDF = (element) => {
        html2canvas(element, {
            dpi: 300,
            scale: 1,
        })
            .then((canvas) => {
                let doc = new jsPDF("p", "px");
                let pageWidth = doc.internal.pageSize.getWidth();
                let pageHeight = doc.internal.pageSize.getHeight();
                let newHeight = canvas.height;
                let newWidth = canvas.width;

                while (newHeight > pageHeight || newWidth > pageWidth) {
                    if (newHeight > pageHeight) {
                        newHeight = pageHeight;
                        newWidth = (canvas.width / canvas.height) * newHeight;
                        continue;
                    }
                    if (newWidth > pageWidth) {
                        newWidth = pageWidth;
                        newHeight = (canvas.height / canvas.width) * newWidth;
                        continue;
                    }
                }
                const marginLeft =
                    newWidth < pageWidth ? (pageWidth - newWidth) / 2 : 0;
                doc.setFillColor("#ffffff");
                doc.rect(0, 0, pageWidth, pageHeight, "F");
                doc.addImage(
                    canvas.toDataURL("image/png"),
                    "PNG",
                    marginLeft,
                    0,
                    newWidth,
                    newHeight
                );
                doc.save("data-export.pdf");
                toast.success("Xuất file thành công")
                setIsExporting(false);
            })
            .catch(() => {
                setIsExporting(false);
            });
    }

    const exportPDFV2 = async (currentChart) => {
        try {
            let scale = 1;
            let data = await domtoimage.toPng(currentChart, {
                quality: 5,
                width: currentChart.clientWidth * scale,
                height: currentChart.clientHeight * scale + 30,
                style: {
                    transform: "scale(" + scale + ")",
                    transformOrigin: "top left",
                },
            });
            const pdf = new jsPDF("l", "px", "a4");

            let height_chart = 250;
            let width_chart = 380;
            let margin = 20;
            let marginTop = 10;
            let ratio = height_chart / width_chart;
            let pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
            pdf.addImage(
                data,
                "PNG",
                margin,
                marginTop,
                pageWidth,
                pageWidth * ratio
            );
            pdf.save("chart.pdf");
            setIsExporting(false);
        } catch (err) {
            setIsExporting(false);
        }

    }

    const callExport = (callback, element, elementWrapper) => {
        setIsExporting(true);
        const startTime = new Date();
        let timeUpdateDOM = new Date();
        let observer = new MutationObserver(() => {
            timeUpdateDOM = new Date();
        });
        observer.observe(elementWrapper, {
            subtree: true,
            childList: true,
            attributes: false,
        });
        setTimeout(() => {
            const timer = setInterval(() => {
                const timeDelay = new Date().getTime() - timeUpdateDOM.getTime();
                const timeFromClick = new Date().getTime() - startTime.getTime();
                if (timeDelay > TIME_DIFF_LAST_DOM_UPDATE) {
                    observer.disconnect();
                    clearInterval(timer);
                    callback(element);
                }
                if (timeFromClick > TIMEOUT_EXPORT) {
                    observer.disconnect();
                    clearInterval(timer);
                    setIsExporting(false);
                }
            }, 1000);
        }, TIME_START_TRACKING);
    };

    return (

        <>
            <div className="chart-wrapper">
                <div className="row">
                    <div className="col-6" style={{position: "relative"}}>
                        <div className="chart-wrapper-item">
                            <FormControl>
                                {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={typeChart.lineChart}
                                    value={typeChart.lineChart}
                                    name="radio-buttons-group"
                                    className="flex-row"
                                >

                                    <FormControlLabel value="month" control={<Radio/>} label="Tháng"
                                                      onChange={(e) => onChangeTypeLineChart(e.target.value)}/>
                                    <FormControlLabel value="year" control={<Radio/>} label="Năm"
                                                      onChange={(e) => onChangeTypeLineChart(e.target.value)}/>
                                </RadioGroup>
                            </FormControl>
                            <div onClick={() => onExportPDF("LINE")}><FontAwesomeIcon icon={faDownload}
                                                                                      fontSize={"1.125rem"}/></div>
                        </div>
                        <LineChart listOrderHistory={listOrderHistory} type={typeChart.lineChart}/>
                        {
                            <div className="export-layout-helper" hidden={!isExporting}>
                                        <LoadingSpinner/>
                                <div ref={exportWrapperLineEL} style={{opacity: 0}} className="export-layout-chart">
                                    <div
                                        ref={refLineChart}
                                        className="export-layout-chart"
                                        style={{
                                            width: "100%",
                                            top: 0,
                                            left: 0,
                                            position: "absolute",
                                            background: "white"
                                        }}
                                    >
                                        <LineChart listOrderHistory={listOrderHistory} type={typeChart.lineChart}
                                                   isExporting={true}/>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-6" style={{position: "relative"}}>
                        <div className="chart-wrapper-item">
                            <FormControl>
                                {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={categorySelected}
                                    value={categorySelected}
                                    name="radio-buttons-group"
                                    className="flex-row"

                                >
                                    {listCategory && listCategory.length ? listCategory.map(item => (
                                        <FormControlLabel value={item?.id} control={<Radio/>} label={item.name}
                                                          onChange={(e) => onChangeTypeBarChart(e.target.value)}
                                        />
                                    )) : null}
                                </RadioGroup>
                            </FormControl>
                            <div onClick={() => onExportPDF("BAR")}><FontAwesomeIcon icon={faDownload}
                                                                                     fontSize={"1.125rem"}/></div>
                        </div>
                        <BarChart listAllProduct={listAllProduct} listBestSeller={listBestSeller}/>
                        {
                            <div className="export-layout-helper" hidden={!isExporting}>
                                {/*<LoadingSpinner/>*/}
                                <div ref={exportWrapperBarEL} style={{opacity: 0}} className="export-layout-chart">
                                    <div
                                        ref={refBarChart}
                                        className="export-layout-chart"
                                        style={{
                                            width: "100%",
                                            top: 0,
                                            left: 0,
                                            position: "absolute",
                                            background: "white"
                                        }}
                                    >
                                        <BarChart listAllProduct={listAllProduct} listBestSeller={listBestSeller}
                                                  isExporting={true}/>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>

    );
};

const BarChart = ({listAllProduct, listBestSeller, isExporting}) => {
    // const sortBySale = listAllProduct && listAllProduct.length ? listAllProduct.sort((a, b) => b.saleNumber - a.saleNumber) : [];

    const nestListProduct = nest(listAllProduct)
    const cData = [];
    listBestSeller?.forEach((item, index) => {
        if (index < 10) {
            cData.push([item.saleNumber, `${item.name}-${index}`])
        }
    })

    const options = {
        dataset: {
            source: cData,
        },
        label: {
            show: isExporting,
            formatter: function (a) {
                return thousandsSeparators(a?.data?.[0])
            }
        },
        grid: {
            containLabel: true,
            left: "2%",
            right: "2%",
            top: 0,
            bottom: 0
        },
        xAxis: {
            axisLabel: {
                overflow: "truncate", // or 'break' to continue in a new
                rotate: 30,
                formatter: (value, index) => {
                    if (index % 2 !== 0 || index === 0) {
                        return numberToString(value);
                    }
                },
            },
        },
        yAxis: {type: "category", inverse: true}, //,  nameGap: 25
        gradientColor: "#106ce1",

        visualMap: {
            orient: "none",
            left: "-1000000",
            dimension: 1,
        },
        series: [
            {
                type: "bar",
                encode: {
                    x: "",
                    y: "",
                },
            },
        ],
        tooltip: {
            position: "bottom",
            borderColor: "white",
            textStyle: {
                color: "#2B3555",
            },
        },
    };
    return (<div>
        <ReactECharts option={options}/>
        {isExporting ?
            <div className="table-wrapper"><table className="table-chart">
            <thead>
            <tr>
                <td>
                    Sản phẩm
                </td>
                <td>
                    Doanh Thu
                </td>
            </tr>
            </thead>
            <tbody>
            {listBestSeller && listBestSeller.length ? listBestSeller.map((item, index) => (
                <tr>
                    <td>
                        {item?.name}
                    </td>
                    <td>
                        {thousandsSeparators(item?.saleNumber)}
                    </td>
                </tr>
            )) : null}

            </tbody>
            </table> </div>: null}
    </div>);
};

const LineChart = ({data, listOrderHistory, type, isExporting}) => {

    const resultArr = [];
    const dateArr = [];
    console.log(listOrderHistory)
    listOrderHistory && listOrderHistory.length && listOrderHistory?.forEach(function (res, value) {
        let date = null;
        if (type === "month") {
            date = moment(res.createTime).format("DD/MM/YYYY");
        }
        if (type === "year") {
            date = moment(res.createTime).year();
        }
        var index = dateArr.indexOf(date);
        if (index == -1) {
            dateArr.push(date);
            var obj = {date: date, totalPrice: res?.price || 0};
            resultArr.push(obj);
        } else {
            resultArr[index].totalPrice += res?.price || 0;
            // resultArr[index].quantity += res?.customerOrder?.total || 0;
        }
    }, {});

    let labels = resultArr && resultArr.length ? resultArr.map(item => item.date) : [];
    const cData = [
        {
            name: "Doanh Thu",
            data: resultArr && resultArr.length ? resultArr.map(item => item.totalPrice) : [],
            type: 'line',
            smooth: true,
            label: {
                show: isExporting,
                formatter: function (a) {
                    return thousandsSeparators(a.value)
                }
            },
        },
        // {
        //     name: "Tổng số",
        //     data: resultArr && resultArr.length ? resultArr.map(item => item.total) : [],
        //     type: 'line',
        //     smooth: true,
        //     label: {
        //         show: true,
        //     },
        // }
    ];

    const options = {
        tooltip: {
            trigger: "axis",
            formatter: function (a) {
                return `
            <div style="padding: 5px;">
            <div>${a?.[0]?.name}</div>
            <div class="d-flex justify-content-between"><strong>Doanh Thu</strong>&nbsp<span>${numberToString(a?.[0]?.value)}</span></div>
            <div class="d-flex justify-content-between"><strong>Tổng Số</strong>&nbsp<span>${thousandsSeparators(a?.[1]?.value)}</span></div>
            </div>
                `;
            },

        },

        grid: {
            top: "10%",
            left: "10%",
            // top: 0,
            bottom: 0,
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: labels,
            axisLabel: {
                overflow: "truncate", // or 'break' to continue in a new
                rotate: 40,
            },
        },
        yAxis: [
            {
                type: "value",
                axisLabel: {
                    formatter: function (a, index) {
                        return `${numberToString(a)} VNĐ`;

                    },
                },
            },
        ],
        series: cData?.length ? cData : [],
    };
    return (<div>
        <ReactECharts option={options}/>
        {isExporting ?
            <div className="table-wrapper"><table className="table-chart">
            <thead>
            <tr>
                <td>
                    {type === "month" ? "Thời gian" : "Năm"}
                </td>
                <td>
                    Doanh Thu
                </td>
            </tr>
            </thead>
            <tbody>
            {
                resultArr && resultArr.length ? resultArr.map((item, index) => (
                    <tr key={index}>
                        <td>
                            {item?.date}
                        </td>
                        <td>
                            {thousandsSeparators(item?.totalPrice)}
                        </td>
                    </tr>
                )) : null
            }
            </tbody>
            </table> </div>: null}
    </div>);
};

export default Chart;
