import '../adminHome.scss';
import PropTypes from 'prop-types';
import {Box, Button, Divider, Drawer, Typography, useMediaQuery} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Link, useNavigate} from 'react-router-dom'
import {ChartBar as ChartBarIcon} from '../icons/chart-bar';
import {User as UserIcon} from '../icons/user';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import WatchIcon from '@mui/icons-material/Watch';
import {useDispatch, useSelector} from "react-redux";
import {setSlideBarSelected} from "../../redux/sildeBarSlice";
import {useEffect} from "react";


export const DashboardSidebar = (props) => {


    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });

    const dispatch = useDispatch();
    const slideBarSelected = useSelector(state => state.slideBarSlice);

    const navigator = useNavigate();

    const items = [
        {
            key: "ANALYSIS",
            href: '/admin',
            icon: (<ChartBarIcon fontSize="small"/>),
            title: 'Thống kê',
        },
        {
            key: "PRODUCT",
            href: '/admin/product',
            icon: (<WatchIcon sx={{fontWeight: 'bold'}} fontSize="small"/>),
            title: 'Sản Phẩm',
        },
        {
            key: "ORDER",
            href: '/admin/order',
            icon: (<ShoppingCartCheckoutIcon sx={{fontWeight: 'bold'}} fontSize="small"/>),
            title: 'Đơn hàng',
        },
        {
            key: "ACCOUNT",
            href: '/admin/account',
            icon: (<UserIcon fontSize="small"/>),
            title: 'Khách Hàng',
        }
    ];

    useEffect(() => {
        if (!slideBarSelected.key) {
            setSlideBarSelected(items[0]?.key);
        }
    }, [])

    function onChangeMenu(item) {
        dispatch(setSlideBarSelected(item.key));
        navigator(`${item.href}`);
    }

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <div>

                    <Box sx={{px: 2}}>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{flexGrow: 1}}>
                    <div className='wrapperItemsSideBar'>
                        {items.map((item) => (
                            <div
                                onClick={() => onChangeMenu(item)}
                                className={item.key === slideBarSelected?.key ? 'itemSideBarActive' : 'linkItemSideBar'}
                                key={item.title}
                                // to={item.href}

                            >
                                {item.icon} {item.title}
                            </div>
                        ))}
                    </div>
                </Box>
                <Divider sx={{borderColor: '#2D3748'}}/>
                <Box
                    sx={{
                        px: 2,
                        py: 3
                    }}
                >
                    <Typography
                        color="neutral.100"
                        variant="subtitle2"
                    >
                        Trang quản trị website
                    </Typography>
                    <Typography
                        color="neutral.500"
                        variant="body2"
                    >
                        Chúng tôi là Curnon
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 2,
                            mx: 'auto',
                            width: '160px',
                            '& img': {
                                width: '100%'
                            }
                        }}
                    >
                       
                    </Box>
                    <Link
                        to="/"
                    >
                        <Button
                            color="secondary"
                            component="a"
                            endIcon={(<OpenInNewIcon/>)}
                            fullWidth
                            sx={{mt: 2}}
                            variant="contained"
                        >
                            Go to Website!
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
