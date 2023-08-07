import {Link, useNavigate} from "react-router-dom";
import productImg1 from "../../../Images/1.jpg";
import {formatCurrency} from "../../../common/fCommon";
import UpDownSaleOff from "../../../component-utility/UpDownSaleOff";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, getCart} from "../../../redux/cartSlice";
import {useEffect} from "react";
import {getCustomerOrder, updateCustomerOrder} from "../../../api/customer-order";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify";
import {logoutService} from "../../../api/action/auth";
import {logout} from "../../../redux/userSlice";

const ProductItem = ({item}) => {

    const cartStore = useSelector(state => state.cartSlice);
    const { user: currentUser } = useSelector((state) => state.userSlice);
    const navigator = useNavigate();

    const dispatch = useDispatch();


    const onAddToCart = (item) => {
        if(!currentUser?.token) {
            dispatch(logoutService());
            dispatch(logout());
            navigator("/login");
        }
        // dispatch(addToCart(item));
        // eslint-disable-next-line no-unused-expressions
        const findIndexItem = cartStore?.customerOrderDetails && cartStore?.customerOrderDetails.length ? cartStore?.customerOrderDetails.findIndex(i => i?.product?.id === item?.id) : -1;
        const cartItem = cartStore?.customerOrderDetails?.[findIndexItem];
        if(cartItem?.quantity >= item?.total || item.total <= 0) {
            toast.success("Không đủ số lượng sản phẩm");
            return;
        }
        const newDetail = [];
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
                    // status: item.status,
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
                fetchCustomerOrder();
                // dispatch(getCart(payload));
            }
        })
    }


    const fetchCustomerOrder = () => {
        getCustomerOrder({
            isPaid: false,
        }).then(
            res => {
                const {data} = res.data;
                if (data && data.length) {
                    dispatch(getCart(data?.[data.length - 1]))

                } else {
                    dispatch(getCart(null))
                }
            }
        ).catch(res => {
            dispatch(getCart(null))
        })
    }

    return (<div className="content-product container">
        <div className="row" style={{textAlign: 'center'}}>
            <div className="col-lg-3 hit">
                <UpDownSaleOff num={item?.perDiscount}/>
                <div className="card">
                    <Link to={`/detail/product/${item.id}`}>
                        {item?.productImages?.[0]?.photosImagePath ?
                            <img src={item?.productImages?.[0]?.photosImagePath} className="card-img-top product-img"
                                 alt="Không thể hiển thị ảnh"/> : <div className="product-img">
                                <span>Sản phẩm chưa có hình ảnh</span>
                                <FontAwesomeIcon icon={faImage} fontSize={"30"}/></div>}
                    </Link>
                </div>
                <div className="card-body">
                    <button className="btn-addStore" type="button" onClick={() => onAddToCart(item)}>{item?.total > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
                    </button>
                    <div className="cardBrand">{item?.collections?.name}</div>
                    <div><h4 className="cardTitle">{item.name}</h4></div>
                    <div>
                        <span className="cardPrice">{formatCurrency(item?.priceSale || 0)}</span>
                        {item?.priceRef!==item?.priceSale && <span className="cardOldPrice">{formatCurrency(item?.priceRef || 0)}</span>}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ProductItem;