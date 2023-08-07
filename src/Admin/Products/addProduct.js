import {DashboardLayout} from "../Dashboards/DashboardLayout";
import {
    Box, Button,
    Container,
    FormControl,
    FormControlLabel, FormHelperText,
    InputLabel, Modal, NativeSelect, Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import InputBase from '@mui/material/InputBase';
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";
import {DashboardSidebar} from "../Dashboards/DashboardSidebar";
import {DashboardNavbar} from "../Dashboards/DashboardNavbar";
import {useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import NumberFormat, {InputAttributes} from 'react-number-format';
import {addCollections, getCollections, getColor, getSizes} from "../../api/filter";
import './styles.scss'

import {getProductDetail, saveProduct, updateProduct, addProductNumber} from "../../api/product";
import {useSelector} from "react-redux";
import {getAllCategory} from "../../api/category";
import DashboardTitle from "../../Components/DashboardTitle";
import {CardBackButton} from "../../component-utility/icons-component";
import CustomError from "../../component-utility/custom-error";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { styled } from '@mui/material/styles';
import messsage from "../../redux/messsage";
import {toast} from "react-toastify";
import {isEmpty} from "lodash";
import axios from "axios";


function AddProduct(props) {
    AddProduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

    const {id} = useParams();
    const categoryStore = useSelector(state => state.categorySlice);

    const [collections, setCollections] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [product, setProduct] = useState({
        id: null,
        "name": "",
        "title": "",
        "desc": "",
        "priceRef": 0,
        "perDiscount": 0,
        "content": "",
        "categoryId": null,
        "colorId": null,
        "materialId": null,
        "total": 0,
        "totalHold": 0,
        "sizeId": null,
        "collectionId": null,
        glassSurface: "",
        thinkness: "",
        collection_name: ""
    })
    const [show, setShow] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [errorNameCollection, setErrorNameCollection] = useState("");
    const [isSaveClickCollection, setIsSaveClickCollection] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetail(
            {productId: id}
        ).then(res => {
            console.log(res.data);
            const {data} = res.data;
            if (data) {
                const tmp = {...product};
                tmp.id = data.id;
                tmp.name = data.name;
                tmp.title = data.title;
                tmp.desc = data.desc;
                tmp.priceRef = data.priceRef;
                tmp.perDiscount = data.perDiscount;
                tmp.content = data.content;
                tmp.categoryId = data.categoryId;
                tmp.colorId = data?.colors?.id;
                tmp.materialId = data.materialId;
                tmp.total = data.total;
                tmp.sizeId = data?.size?.id;
                tmp.collectionId = data?.collections?.id;
                tmp.glassSurface = data.glassSurface;
                tmp.thinkness = data.thinkness;
                tmp.totalHold = data.totalHold
                setProduct(tmp);
            }
        })
    }, [id])

    const validate = (field) => {
        const errors = {};
        if (!product?.name) {
            errors.name = "Tên sản phẩm không được để trống";
        }
        if (!product?.categoryId) {
            errors.categoryId = "Danh mục không được để trống";
        }
        if (!product?.priceRef) {
            errors.priceRef = "Giá sản phẩm không được để trống";
        }
        if (!product?.collectionId) {
            errors.collectionId = "Bộ sưu tập không được để trống";
        }
        if (!product?.title) {
            errors.title = "Tiêu đề không được để trống";
        }
        if (!product?.content) {
            errors.content = "Nội dung không được để trống";
        }
        if (!product?.colorId) {
            errors.colorId = "Bạn chưa chọn màu";
        }
        if (!product?.sizeId) {
            errors.sizeId = "Bạn chưa chọn kích cỡ";
        }
        if ( product?.perDiscount < -99|| product?.perDiscount > 99) {
            errors.perDiscount = "Số phải từ -99 đến 99";
        }
        return errors;
    }

   const  validateCollection = () => {
       const errors = {};
       if(!collectionName?.trim()) {
           errors.collectionName = "Chưa nhập tên bộ sưu tập";
       }
       if(!product.categoryId) {
           errors.collectionName = "Chưa chọn danh mục";
       }
       return errors;
    }

    //
    useEffect(() => {
        getCollections().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setCollections(data);
                console.log(151, data)
                const tmp = {...product};
                tmp.collectionId = data?.[0]?.id;
                setProduct(tmp);

            }
        })
    }, [show]);

    useEffect(() => {
        getSizes().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setSize(data);
            }
        })
    }, [])

    useEffect(() => {
        getColor().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setColor(data);
            }
        })
    }, [])

    useEffect(() => {
        getAllCategory().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setListCategory(data);
            }
        })
    }, [])

    const headerField = (num, text) => {
        return <div className="title-form d-flex flex-row"><span className="title-form-number">{num}</span><span
            className="title-form-text">{text}</span></div>
    }


    const onChangeName = (value) => {
        const tmp = {...product};
        tmp.name = value;
        setProduct(tmp);
    }


    function onChangeTitle(value) {
        const tmp = {...product};
        tmp.title = value;
        setProduct(tmp);
    }

    function onChangeDescription(value) {
        const tmp = {...product};
        tmp.desc = value;
        setProduct(tmp);
    }

    function onChangeContent(value) {
        const tmp = {...product};
        tmp.content = value;
        setProduct(tmp);
    }

    function handleChangeCollection(value) {
        const tmp = {...product};
        tmp.collectionId = value;
        setProduct(tmp);

    }

    function handleChangeColor(value) {
        const tmp = {...product};
        tmp.colorId = value;
        setProduct(tmp);
    }

    function handleChangePriceRef(value) {
        const tmp = {...product};
        tmp.priceRef = value;
        setProduct(tmp);
    }

    function handleChangePerDiscount(value) {
        const tmp = {...product};
        tmp.perDiscount = value;
        setProduct(tmp);
    }


    function onChangeGlassSurface(value) {
        const tmp = {...product};
        tmp.glassSurface = value;
        setProduct(tmp);
    }

    function onChangeThinkness(value) {
        const tmp = {...product};
        tmp.thinkness = value;
        setProduct(tmp);
    }

    async function onSaveClick() {
       
        setIsSaveClick(true)
        const message = validate();
        if(!isEmpty(message)) return;
            const payload = {
                ...product,
                total: Number(addNumberProduct) + Number(product.total),
                totalHold: Number(addNumberProduct) + Number(product.totalHold),
                perDiscount: product.perDiscount || 0,
                totalOld:product.total,
            }
            const dataHistory = {
                product_id: product.id,    
                total: +addNumberProduct,
                total_old:product.total,
                total_now : Number(addNumberProduct) + Number(product.total),


            }
            console.log(payload, dataHistory);
            // const saveHistory = await addProductNumber(dataHistory)
            const saveRes = id ? await updateProduct(payload) : await saveProduct(payload);
            if (saveRes.data.errorCode == "200") {
                if(id) {
                    toast.success("Sửa thành công!");

                }
                else {
                    toast.success("Thêm thành công!");
                }
                navigate("/admin/product");
            }

    }

    function handleChangeCategory(value) {
        const tmp = {...product};
        tmp.categoryId = value;
        setProduct(tmp);
    }

    function onChangeSize(value) {
        const tmp = {...product};
        tmp.sizeId = value;
        setProduct(tmp);

    };

    const { user: currentUser } = useSelector((state) => state.userSlice);
    const [addNumberProduct, setAddNumberProduct] = useState(0)

    function onCancel() {
        navigate("/admin/product");
    }

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }));

    function handleCloseCollection() {
        setCollectionName("");
        setErrorNameCollection("");
        setShow(false)
    }

    function onApply() {
        if(!collectionName?.trim()) {
            setErrorNameCollection("Chưa nhập tên bộ sưu tập");
        }
        if(!product.categoryId) {
            setErrorNameCollection("Chưa chọn danh mục");
        }
            addCollections({
                categoryId: product.categoryId,
                name: collectionName?.trim()
            }).then(res => {
                const {data} = res;
                if(data?.errorCode == "200") {
                    toast.success("Tạo bộ sưu tập thành công!");
                    handleCloseCollection();

                }
                else {
                    toast.error(data?.errorDesc);
                }
            }).catch(err => {
                toast.error("Tạo bộ sưu tập thất bại!");
            })

    }

    function onChangeCollectionName(value) {
        setCollectionName(value)
    }

    function handleChangeTotal(value) {
        // const tmp = {...product};
        // tmp.total = value;
        setAddNumberProduct(value);
    }

    if(currentUser?.roles?.includes("ROLE_ADMIN")) {
        return (
            <div className="add-product">
                <ThemeProvider theme={theme}>
                    <div className="dashBoardNarBar">
                        <DashboardNavbar/>
                    </div>
                    <DashboardSidebar/>
                    <div className="wrapper-AdminHome">
                        <div className="">
                            <Box className=""
                                 component="main"
                                 sx={{
                                     flexGrow: 1,
                                     py: 8,
                                     backgroundColor: '#f9fafc'
                                 }}
                            >
                                {!id ? <DashboardTitle title="Thêm sản phẩm"/>
                                    : <DashboardTitle title="Chỉnh sửa sản phẩm"/>
                                }
                                <div className="edit-content">
                                    <div className="edit-content-header">
                                        <Link to="/admin/product"><CardBackButton/></Link>
                                        {!id ? <h5>Tạo mới sản phẩm</h5>
                                            : <h5>Chỉnh sửa sản phẩm</h5>
                                        }
                                    </div>
                                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                        <Grid item xs={6}>
                                            {headerField(1, "Nhập tên sản phẩm")}
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Nhập tên sản phẩm"
                                                fullWidth={true}
                                                multiline
                                                value={product.name}
                                                onChange={(e) => onChangeName(e.target.value)}
                                            />
                                            <CustomError message={validate(product)?.name}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {headerField(2, "Nhập tiêu đề")}
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Nhập tiêu đề"
                                                fullWidth={true}
                                                multiline
                                                value={product.title}
                                                onChange={(e) => onChangeTitle(e.target.value)}
                                            />
                                            <CustomError message={validate(product)?.title}
                                                         isSaveClick={isSaveClick}/>
                                            
                                        </Grid>
                                        <Grid item xs={6}>
                                            {headerField(3, "Thương Hiệu")}
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Nhập thương hiệu"
                                                fullWidth={true}
                                                multiline
                                                value={product.producer}
                                                onChange={(e) => onChangeTitle(e.target.value)}
                                            />
                                            <CustomError message={validate(product)?.producer}
                                                         isSaveClick={isSaveClick}/>
                                            
                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(3, "Chọn danh mục")}
                                            <FormControl fullWidth>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={product.categoryId}
                                                    value={product.categoryId}
                                                    name="radio-buttons-group"
                                                >
                                                    <div className="ratio-list">
                                                        {listCategory && listCategory.length ? listCategory.filter(i => i.parentId).map((item, index) =>
                                                            <FormControlLabel value={item.id} control={<Radio/>}
                                                                              label={<div>{item.name}</div>}
                                                                              onChange={(e) => handleChangeCategory(e.target.value)}/>
                                                        ) : null}
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <CustomError message={validate(product)?.categoryId}
                                                         isSaveClick={isSaveClick}/>

                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(4, "Chọn bộ sưu tập")}
                                            <span className="add-collection" onClick={() => setShow(true)}><FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>Tạo mới bộ sưu tập</span>
                                            <FormControl fullWidth style={{paddingTop: "8px"}}>
                                                {/*<InputLabel htmlFor="demo-customized-select-native">Bộ sưu tập</InputLabel>*/}
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={product.collectionId}
                                                    // defaultValue={product.collectionId}
                                                    onChange={(e) => handleChangeCollection(e.target.value)}
                                                    input={<BootstrapInput />}
                                                >
                                                    {collections && collections.length ? collections.map((item, index) =>
                                                        <option value={item?.id}>{item?.name}</option>
                                                    ) : null}
                                                </NativeSelect>
                                            </FormControl>
                                            <CustomError message={validate(product)?.collectionId}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(5, "Chọn Màu sắc")}
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={product.colorId}
                                                value={product.colorId}
                                                name="radio-buttons-group"
                                            >
                                                <div className="ratio-list">
                                                    {color && color.length ? color.map((item, index) =>
                                                        <FormControlLabel value={item.id} control={<Radio/>}
                                                                          label={<div>{item.name}</div>}
                                                                          onChange={(e) => handleChangeColor(e.target.value)}/>
                                                    ) : null}
                                                </div>
                                            </RadioGroup>
                                            <CustomError message={validate(product)?.colorId}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(6, "Chọn kích cỡ")}
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={product.sizeId}
                                                value={product.sizeId}
                                                name="radio-buttons-group"
                                            >
                                                <div className="ratio-list">
                                                    {size && size.length ? size.map((item, index) =>
                                                        <FormControlLabel value={item.id} control={<Radio/>}
                                                                          label={item.name}
                                                                          onChange={(e) => onChangeSize(e.target.value)}/>
                                                    ) : null}
                                                </div>
                                            </RadioGroup>
                                            <CustomError message={validate(product)?.sizeId}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {headerField(7, "Nhập giá")}
                                            <TextField
                                                type="number"
                                                label="Giá sản phẩm"
                                                fullWidth={true}
                                                value={product.priceRef}
                                                onChange={(e) => handleChangePriceRef(e.target.value)}
                                                name="numberformat"
                                                id="outlined-multiline-flexible"
                                            />
                                            <CustomError message={validate()?.priceRef}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        
                                        <Grid item xs={6}>
                                            {headerField(8, "Biến động giá")}
                                            <TextField
                                                type="number"
                                                label="Biến động giá"
                                                fullWidth={true}
                                                value={product.perDiscount}
                                                onChange={(e) => handleChangePerDiscount(e.target.value)}
                                                name="numberformat"
                                                id="formatted-numberformat-input"
                                            />
                                            <CustomError message={validate("perDiscount")?.perDiscount}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={4}>
                                            {headerField(8, "Số lượng hiện tại")}
                                            <TextField
                                                type="number"
                                                label="Nhập số lượng"
                                                fullWidth={true}
                                                value={product.total}
                                                name="numberformats"
                                                id="outlined-multiline-flexible"
                                            />
                                            <CustomError message={validate()?.total}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={4}>
                                            {headerField(8, "Số lượng nhập thêm")}
                                            <TextField
                                                type="number"
                                                label="Nhập số lượng"
                                                fullWidth={true}
                                                value={addNumberProduct}
                                                onChange={(e) => handleChangeTotal(e.target.value)}
                                                name="numberformat"
                                                id="outlined-multiline-flexible"
                                            />
                                            <CustomError message={validate()?.total}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(111, "Nhập nội dung")}
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Nhập nội dung"
                                                fullWidth={true}
                                                multiline
                                                value={product.content}
                                                onChange={(e) => onChangeContent(e.target.value)}
                                            />
                                            <CustomError message={validate(product)?.content}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>

                                    </Grid>
                                    {/*<Grid item xs={6}>*/}
                                    {/*    {headerField(3, "Nhập mô tả")}*/}
                                    {/*    <TextField*/}
                                    {/*        id="outlined-multiline-flexible"*/}
                                    {/*        label="Nhập mô tả"*/}
                                    {/*        fullWidth={true}*/}
                                    {/*        multiline*/}
                                    {/*        value={product.desc}*/}
                                    {/*        onChange={(e) => onChangeDescription(e.target.value)}*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
                                    <Grid item xs={12}>
                                        <div className="add-product-footer">
                                            <button className="btn-cancel mr-2" onClick={onCancel}>Hủy bỏ</button>
                                            <button className="btn-save pl-3" onClick={onSaveClick}>Lưu sản phẩm
                                            </button>
                                        </div>
                                    </Grid>

                                </div>
                            </Box>


                            {/*</div>*/}
                        </div>
                    </div>
                </ThemeProvider>
                <Modal
                    open={!!show}
                    onClose={handleCloseCollection}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <div className="popover-wrapper">
                            <div className="popover">
                                <div className="popover-header">
                                    Thêm bộ sưu tập
                                </div>
                                <div className="popover-form-add-collection">
                                    <span className="category">Danh mục {listCategory && listCategory.length ? listCategory.find(item => item.id == product.categoryId)?.name : ""}</span>
                                    <div style={{paddingTop: "20px"}}>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Nhập tên bộ sưu tập"
                                        fullWidth={true}
                                        multiline
                                        value={collectionName}
                                        onChange={(e) => onChangeCollectionName(e.target.value)}
                                    />
                                    </div>
                                    <CustomError message={validateCollection()?.collectionName}
                                                 isSaveClick={isSaveClickCollection}/>
                                </div>
                                <div className="popover-body">
                                    {/* eslint-disable-next-line no-undef */}

                                    <Button color="primary" variant="contained" onClick={onApply}>
                                        Xác Nhận
                                    </Button>
                                    <Button color="secondary" variant="contained" onClick={handleCloseCollection}>
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }
};
export default AddProduct;
