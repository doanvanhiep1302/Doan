import * as React from "react";
import '../adminHome.scss';
import { useState } from 'react';
import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom'
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import MenuIcon from '@mui/icons-material/Menu';
import WatchIcon from '@mui/icons-material/Watch';


export default function StateMenu() {
  const [state, setState] = useState({
    left: false,
  });

  const [dashBoard, setDashBoard] = useState(true);
  const [customer, setCustomer] = useState(false);
  const [product, setProduct] = useState(false);
  const [account, setAccount] = useState(false);
  const [order, setOrder] = useState(false);

  const dashBoardActive = () => {
    setDashBoard(true);
    setCustomer(false);
    setProduct(false);
    setAccount(false);
    setOrder(false);
  };

  const customerActive = () => {
    setDashBoard(false);
    setCustomer(true);
    setProduct(false);
    setOrder(false);
    setAccount(false);
  };

  const productActive = () => {
    setDashBoard(false);
    setCustomer(false);
    setProduct(true);
    setAccount(false);
    setOrder(false);
  };

  const accountActive = () => {
    setDashBoard(false);
    setCustomer(false);
    setProduct(false);
    setAccount(true);
    setOrder(false);
  };

  const orderActive = () => {
    setDashBoard(false);
    setCustomer(false);
    setProduct(false);
    setAccount(false);
    setOrder(true);
  }

  const items = [
    {
      href: '/admin',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Thống kê',
      class: dashBoard,
      fun: dashBoardActive
    },
    {
      href: '/admin/customer',
      icon: (<UsersIcon fontSize="small" />),
      title: 'Khách Hàng',
      class: customer,
      fun: customerActive
    },
    {
      href: '/admin/product',
      icon: (<WatchIcon sx={{fontWeight: 'bold'}} fontSize="small" />),
      title: 'Sản Phẩm',
      class: product,
      fun: productActive
    },
    {
      href: '/admin/order',
      icon: (<ShoppingCartCheckoutIcon sx={{ fontWeight: 'bold'}} fontSize="small" />),
      title: 'Đơn hàng',
      class: order,
      fun: orderActive
    },
    {
      href: '/admin/account',
      icon: (<UserIcon fontSize="small" />),
      title: 'Tài Khoản',
      class: account,
      fun: accountActive
    }
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Box
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
        sx={{
          backgroundColor: '#111827',
          width: '279px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          
          <Box sx={{ px: 2 }}>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <div className='wrapperItemsSideBar'>
          {items.map((item) => (
            <Link className={item.class ? 'itemSideBarActive' : 'linkItemSideBar'}
              key={item.title}
              to={item.href}
              onClick={item.fun}
            >
              {item.icon} {item.title}
            </Link>
          ))}
          </div>
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
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
            <img style={{backgroundColor: 'white'}}
              alt="Go to pro"
              src="https://curnonwatch.com/_next/static/media/logo.cc5d661a.svg"
            />
          </Box>
          <Link
            to="/"
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Go to website!
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon fontSize="medium" sx={{ color: 'black'}} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
