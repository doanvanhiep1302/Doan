import {Box, Container, Grid} from '@mui/material';
import {Budget} from './Dashboards/budget';
import {TasksProgress} from './Dashboards/taskProcess';
import TotalCustomers from './Dashboards/totalCustomer';
import {TotalProfit} from './Dashboards/totalProfit';
import Chart from './Dashboards/Chart';
import {DashboardLayout} from './Dashboards/DashboardLayout';
import {useEffect, useState} from "react";
import {getOrderHistory} from "../api/order-hitory";
import LatestOrders from "./Dashboards/lastOrder.";
import {getAllProduct} from "../api/product";

const HomePage = () => {
    const [listOrderHistory, setListOrderHistory] = useState([]);
    const [listHistory, setListHistory] = useState([]);
    const [listAllProduct, setListAllProduct] = useState([]);

    const fetchOrderHistory = () => {
        getOrderHistory().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                console.log(data);
                const newData = data.map(item=>{
                    return {...item, date: new Date(item.updateTime).getTime()}
                })
                console.log(newData);
                setListOrderHistory(newData);
                setListHistory(newData)
            }
        })
    }

    const filterDate = (date) => {
        console.log(date, listAllProduct, listOrderHistory);
        let newDate
        if(date.start && date.end) {
            newDate = listHistory.filter(item=>item.date>= date.start && item.date <= date.end)
        } else if(date.start && !date.end) {
            newDate = listHistory.filter(item=>item.date>= date.start)
        } else if(!date.start && date.end) {
            newDate = listHistory.filter(item=>item.date <= date.end)
        } else {
            newDate = [...newDate]
        }
        console.log(newDate);
        setListOrderHistory(newDate)
    }

    useEffect(() => {
        fetchOrderHistory();
    }, [])

    useEffect(() => {
        getAllProduct().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setListAllProduct(data);
            }
        })
    }, [])

    function onFetchOrderHistory() {
        fetchOrderHistory();
    }

    return (<>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    mt: 3,
                    backgroundColor: '#f9fafc'
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={6}
                            sm={6}
                            xl={6}
                            xs={12}
                        >
                            <Budget listOrderHistory={listOrderHistory}/>
                        </Grid>
                        <Grid
                            item
                            xl={6}
                            lg={6}
                            sm={6}
                            xs={12}
                        >
                            <TotalCustomers/>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Chart listOrderHistory={listOrderHistory} listAllProduct={listAllProduct}/>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <LatestOrders listOrderHistory={listOrderHistory} filterDate={filterDate}
                                          onFetchOrderHistory={onFetchOrderHistory}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
HomePage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
)
export default HomePage;