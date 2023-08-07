import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {getUserPage} from "../../api/user";
import React, {useEffect, useState} from "react";
import {numberToString} from "../../common/fCommon";

 const TotalCustomers = (props) => {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        fetUserId();
    }, [])

    const fetUserId = () => {
        getUserPage(
            {
                page: 1,
                limit: 10,
                keyword: ""
            }
        ).then(res => {
            const {data} = res.data;
            if (data) {
                setTotal(data?.totalElements)
            }
        })
    }

    return (
        <Card {...props}>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{justifyContent: 'space-between'}}
                >
                    <Grid item>
                        <Typography
                            sx={{fontWeight: '1000'}}
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            TOTAL CUSTOMERS
                        </Typography>
                        <Typography
                            sx={{fontWeight: '1000'}}
                            color="textPrimary"
                            variant="h4"
                        >
                            {numberToString(total)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <PeopleIcon/>
                        </Avatar>
                    </Grid>
                </Grid>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        alignItems: 'center',*/}
                {/*        display: 'flex',*/}
                {/*        pt: 2*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ArrowUpwardIcon color="success"/>*/}
                {/*    <Typography*/}
                {/*        variant="body2"*/}
                {/*        sx={{*/}
                {/*            mr: 1,*/}
                {/*            fontWeight: '1000'*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        16%*/}
                {/*    </Typography>*/}
                {/*    <Typography*/}
                {/*        sx={{fontWeight: '1000'}}*/}
                {/*        color="textSecondary"*/}
                {/*        variant="caption"*/}
                {/*    >*/}
                {/*        Since last month*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
            </CardContent>
        </Card>
    );
}
export default TotalCustomers;
