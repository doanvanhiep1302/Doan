import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import imgChoice from "./imgChoice";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import phuKienImg from '../../Images/phukien.png';
import './navbar.scss';
import Button from "@mui/material/Button";
import {getCollectionByCategoryId} from "../../api/filter";

function DropDownMen({children}) {
    const [menBestSeller, setMenBestSeller] = useState(false)
    const [categorySelected, setCategorySelected] = useState({
        id: "",
        content: "",
        collections: []
    });
    const [listCollection, setListCollection] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setCategorySelected(children?.[0])
        setMenBestSeller(true)
    }, [children])

    const TrueMenBestSeller = () => {
        setCategorySelected({
            id: "",
            content: "",
            collections: []
        })
        setMenBestSeller(false);
    }

    useEffect(() => {
        getCollectionByCategoryId({
            categoryId: categorySelected?.id
        }).then(res => {
            const {data} = res.data;
            if(data && data.length) {
                setListCollection(data);
            }
        })
    }, [categorySelected]);

    const onMouseShowCollection = (item) => {
        if (item.id !== categorySelected.id) {
            const tmp = {...categorySelected};
            tmp.id = item.id;
            tmp.content = item.content;
            tmp.collections = item && item.collections ? item.collections.map(item => ({...item})) : [];
            setCategorySelected(tmp);
            setMenBestSeller(true)
        }
    }

    return (
        <div className="dropdown-contentMan" onMouseLeave={TrueMenBestSeller}
             >
            <div className="dropdown-detail">
                <div className="menuDropDown">
                    <div
                        style={{
                            display: "grid",
                            gridRowGap: "40px",
                            rowGap: "40px",
                            gridAutoColumns: "1fr",
                        }}
                    >
                        {children && children.length ?
                            children.map((item,index) => <div className={`summary1-2`}
                                                      onMouseEnter={() => onMouseShowCollection(item)}>
                                <Link to={`/product/${item.id}`} style={{color: "unset"}}><div className="menuDropDown-item">
                                    <div className="menuDropDown-item-name">{item.name}</div>
                                </div></Link>
                                {index === 0 ? <Link style={{color: "unset"}} to={`/product/best-seller/${item.id}`}><div className="menuDropDown-item desc"><div className="menuDropDown-item-name">Bán chạy nhất</div></div></Link> : null}

                            </div>) :
                            null}


                    </div>
                </div>
                <div className="choiceDropDown">
                    <div className={menBestSeller ? "showMenu" : "hideMenu"}>
                        {listCollection && listCollection.length ?
                            <div className="choiceDropDownChild1">

                                {listCollection.map((data) => (
                                    <Link key={data.id} to={`/collections/${data.id}`} className="linkChoice">
                            <span
                                style={{
                                    boxSizing: "border-box",
                                    display: "inline-block",
                                    overflow: "hidden",
                                    width: "initial",
                                    height: "initial",
                                    backGround: "none",
                                    opacity: 1,
                                    border: "0px",
                                    margin: "0px",
                                    padding: "0px",
                                    position: "relative",
                                    maxWidth: "100%",
                                }}
                            >
                            <span className="spanChild1">
                            </span>
                            <img className="imgChoice" src={imgChoice[0].img} alt=""/>
                            </span>
                                        <div className="titleChoice">{data.name}</div>
                                    </Link>
                                ))
                                }
                                {/*<Link to="" className="linkChoice">*/}
                                {/*    <div className="linkChoiceViewAll">*/}
                                {/*        <span className="text-load-more">XEM TẤT CẢ</span>*/}
                                {/*        <ArrowRightAltIcon/>*/}
                                {/*    </div>*/}
                                {/*</Link>*/}
                            </div> : <div className="content">
                                <span className="content-image">
                                    <img  src={imgChoice[0].img} alt=""/>
                                </span>
                                <div>
                                    <span className="content-desc">{categorySelected?.content}</span>
                                    <Button
                                        className="by-now-button"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Mua ngay
                                    </Button>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropDownMen;