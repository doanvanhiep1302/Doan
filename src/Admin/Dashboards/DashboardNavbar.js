import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import MenuNavbarResponsive from './MenuNavbarResponsive';
import {deepOrange} from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../redux/userSlice";
import './styles.scss'
import {getAllCategory} from "../../api/category";
import {addCategory} from "../../redux/categorySlice";
import {logoutService} from "../../api/action/auth";
import {Logout} from "@mui/icons-material";
import {getUserDetails} from "../../api/user";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

const nest = (items, id = 0, link = 'parentId') =>
    items
        .filter(item => item[link] === id)
        .map(item => ({
            ...item,
            children: nest(items, item.id)
        }));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
    const [showAccountInfor, setShowAccountInfor] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const {user: currentUser} = useSelector((state) => state.userSlice);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     getUserDetails().then(res => {
    //         const {data} = res.data;
    //         if(data) {
    //             setUser(data);
    //         }
    //     })
    // }, [currentUser])

    useEffect(() => {
        getAllCategory().then((res) => {
            if (res && res.data) {
                const {data} = res.data;
                const list = nest(data);
                setListCategory(list)
                dispatch(addCategory(list))
            }
        });
    }, []);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    function onLogin() {
        navigator("/login");
    }

    const logOut = () => {
        dispatch(logoutService());
        dispatch(logout())
        navigator("/login");
    };



    return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <MenuNavbarResponsive />
          <Box sx={{ flexGrow: 1 }} />
          {/*<Tooltip title="Contacts">*/}
          {/*  <IconButton sx={{ ml: 1 }}>*/}
          {/*    <UsersIcon fontSize="small" />*/}
          {/*  </IconButton>*/}
          {/*</Tooltip>*/}
          {/*<Tooltip title="Notifications">*/}
          {/*  <IconButton sx={{ ml: 1 }}>*/}
          {/*    <Badge*/}
          {/*      badgeContent={4}*/}
          {/*      color="primary"*/}
          {/*      variant="dot"*/}
          {/*    >*/}
          {/*      <BellIcon fontSize="small" />*/}
          {/*    </Badge>*/}
          {/*  </IconButton>*/}
          {/*</Tooltip>*/}
            <div className="avatar">

                {currentUser?.username ?
                    <div className="account"
                    ><Avatar sx={{
                        color: deepOrange[Math.floor(Math.random() * 10)],
                        width: 20,
                        height: 20,
                        p: 2
                    }} onClick={() => setShowAccountInfor(!showAccountInfor)}
                    >{currentUser?.username?.slice(0, 2)}</Avatar>
                        {showAccountInfor ? <div className="popup-account">
                            <ul>
                                <li onClick={() => navigator(`/account/${currentUser.id}`)}>
                                    Thông tin tài khoản
                                </li>
                                <li onClick={logOut}>
                                    Đăng xuất <Logout sx={{size: "12px"}}/>
                                </li>
                            </ul>

                        </div> : null}
                    </div>
                    :
                    <span onClick={onLogin}>Đăng nhập<LoginIcon/></span>
                }
            </div>
            {/*<UserCircleIcon fontSize="small" />*/}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
