import "./detailProduct.scss";
import {useEffect, useState} from 'react'
import Footer from '../../Footer/footer';
import Navbar from '../../Navbar/navbar';
import Infor from "../../InforHeader/infor-header";
import {useNavigate, useParams} from "react-router-dom";
import {getProductDetail} from "../../../api/product";
import {thousandsSeparators} from "../../../common/fCommon";
import {addToCart, getCart} from "../../../redux/cartSlice";
import {updateCustomerOrder} from "../../../api/customer-order";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getAllCategory} from "../../../api/category";
import {logoutService} from "../../../api/action/auth";
import {logout} from "../../../redux/userSlice";

const TAB_KEY = [
    {
        key: "TAB_1",
        name: "THÔNG TIN SẢN PHẨM"
    },
    {
        key: "TAB_2",
        name: "CHÍNH SÁCH VẬN CHUYỂN"
    },
    {
        key: "TAB_3",
        name: "ĐỔI TRẢ & BẢO HÀNH"
    },
    {
        key: "TAB_4",
        name: "HÌNH THỨC THANH TOÁN"
    }
]

const nest = (items, id = 0, link = 'parentId') =>
    items
        .filter(item => item[link] === id)
        .map(item => ({
            ...item,
            children: nest(items, item.id)
        }));

function DetailProduct() {

    const {id} = useParams();

    const [product, setProduct] = useState(null)

    const [tabSelected, setTabSelected] = useState(TAB_KEY[0]);
    const categorySlice = useSelector(state => state.categorySlice)?.listCategory;
    const [imgPresent, setImgPresent] = useState("");
    const [listCategory, setListCategory] = useState([]);
    const navigator = useNavigate();

    const cartStore = useSelector(state => state.cartSlice);
    const { user: currentUser } = useSelector((state) => state.userSlice);


    useEffect(() => {
        getAllCategory().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setListCategory(data);
            }
        })
    }, [id])


    const dispatch = useDispatch();
    useEffect(() => {
        getProductDetail(
            {productId: id}
        ).then(res => {
            const {data} = res.data;
            if (data) {
                setProduct(data);
                const projectImageSelected = data?.productImages?.[0]?.photosImagePath;
                setImgPresent(projectImageSelected)
            }
        })
    }, [id])

    const renderCustomTab = (item) => {
        console.log(item);
        switch (tabSelected.key) {
            case "TAB_1":
                return <>
                    <div className="product-content">
                        {item?.content}
                    </div>
                    <div className="product-detail">
                        <table>
                            <tr>
                                <td className="detail-title">
                                    Kích thước mặt
                                </td>
                                <td className="detail-right">
                                    {item?.size?.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="detail-title">
                                    Màu mặt
                                </td>
                                <td className="detail-right">
                                    {item?.colors?.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="detail-title">
                                    Dây đeo
                                </td>
                                <td className="detail-right">
                                    {item?.collections?.name}
                                </td>
                            </tr>

                            <tr>
                                <td className="detail-title">
                                    Danh mục
                                </td>
                                <td className="detail-right">
                                    {listCategory && listCategory.length ? listCategory.find(i => i.id == item?.categoryId)?.name : ""}
                                </td>
                            </tr>

                            <tr>
                            <td className="detail-title">
                                Thương hiệu
                            </td>
                            <td className="detail-right">
                            {item?.producer}
                            </td>
                        </tr>
                        </table>
                    </div>
                </>
            case "TAB_2":
                return <>
                    <ul>

                    </ul>
                </>
            case "TAB_3":
                return <>
                </>
            case "TAB_4":
                return <>
                </>
            default:
                return <></>

        }
    }

    const onChangeCustomTab = (item) => {
        setTabSelected(item);
    }

    const onAddToCart = (item, isPayNow) => {
        // if (item.total <= 0) return;
        if(!currentUser?.token) {
            dispatch(logoutService());
            dispatch(logout());
            navigator("/login");
        }
        const findIndexItem = cartStore?.customerOrderDetails && cartStore?.customerOrderDetails.length ? cartStore?.customerOrderDetails.findIndex(i => i?.product?.id === item?.id) : -1;
        const newDetail = [];
        const cartItem = cartStore?.customerOrderDetails?.[findIndexItem];
        if (cartItem?.quantity >= item?.total || item.total <= 0) {
            toast.success("Không đủ số lượng sản phẩm");
            return;
        }
        if (findIndexItem > -1) {
            cartStore?.customerOrderDetails.forEach((item, index) => {
                if (index === findIndexItem) {
                    newDetail.push({
                        ...item,
                        id: item.id,
                        orderId: item.orderId,
                        quantity: item.quantity + 1,
                        product: item.product,
                    })
                } else {
                    newDetail.push(
                        {
                            ...item,
                            id: item.id,
                            orderId: item.orderId,
                            quantity: item.quantity,
                            product: item.product,
                        }
                    );
                }
            });
        } else {
            cartStore?.customerOrderDetails.forEach((item, index) => {
                newDetail.push(item);
            });
            newDetail.push(
                {
                    orderId: cartStore?.id,
                    quantity: 1,
                    product: item,
                });
        }

        const payload = {
            ...cartStore,
            orderId: cartStore?.id,
            userId: cartStore?.user?.id,
            isPaid: false,
            status: 0,
            customerOrderDetails: newDetail

        }
        updateCustomerOrder(payload).then(res => {
            const {data} = res;
            if (data.errorCode == "200") {
                dispatch(getCart(payload));
                if(isPayNow) {
                    navigator(`/payment/${data?.data?.id}`)
                }
            }
        })
    }

    const onSelectImgPresent = (img) => {
        setImgPresent(img);
    }

    function onPayNow(item) {
        onAddToCart(item, true);
        // navigator(`/payment/${cartStore?.id}`)
    }

    return (
        <>
            <Navbar/>
            <div className="container overDetailProduct">
                <div className="row">
                    <div className="col-7">
                        {product && product.productImages && product.productImages.length ?
                            <div className="row detailImgProduct">
                                <div className="col-2 detailMiniProduct">
                                    {product.productImages.map((item) => <div
                                        className={`mini-ImgProduct ${imgPresent === item.photosImagePath ? "active" : ""}`}>
                                        <img className="miniShow"
                                             onClick={() => onSelectImgPresent(item.photosImagePath)}
                                             src={item.photosImagePath}/>
                                    </div>)}
                                </div>
                                <div className="col-10 bigImgProduct">
                                    <img
                                        src={imgPresent}></img>
                                </div>
                            </div> : <span>Không có ảnh hiển thị</span>}
                    </div>
                    <div className="col-4 First">
                        <div className="coverPayment">
                            <div className="topPayment">
                                <p className="brandTopPayment">{product?.collections?.name}</p>
                                <h2 className="titleTopPayment">{product?.name}</h2>
                            </div>
                            <div className=" text-center mb-5">
                                        <span
                                            className="cardPrice Detail">{thousandsSeparators(product?.priceRef)} VNĐ </span>
                                <span
                                    className="cardOldPrice Detail">{thousandsSeparators(product?.priceSale)} VNĐ</span>
                                <span className="text-endNote"> </span>
                            </div>
                            <div style={{textAlign: 'center'}} className="product-details-footer">
                                {product?.total > 0 ? <button type="button" className="btn btn-success btnPayment"
                                                              onClick={() => onPayNow(product)}>THANH TOÁN NGAY
                                </button> : null}
                                <button type="button" className="btn btn-outline-dark btnAddStore"
                                        onClick={() => onAddToCart(product, false)}>{product?.total > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Infor/>
            <div className="custom-tab">
                <ul>{
                    TAB_KEY.map((item, index) => (
                        <>
                            <li key={item.key}
                                className={`custom-tab-list ${tabSelected.key === item.key ? "active" : ""}`}
                                onClick={() => onChangeCustomTab(item)}>{item.name}</li>
                        </>
                    ))
                }</ul>
                <div className="custom-tab-content">
                    {renderCustomTab(product)}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default DetailProduct;
