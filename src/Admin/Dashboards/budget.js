import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import {numberToString} from "../../common/fCommon";

export const Budget = ({listOrderHistory}) => {

  return (<Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
          sx={{fontWeight: '1000'}}
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            BUDGET
          </Typography>
          <Typography
          sx={{fontWeight: '1000'}}
            color="textPrimary"
            variant="h4"
          >
            {numberToString(listOrderHistory && listOrderHistory.length && listOrderHistory.map(item => item?.price || 0).reduce((a, b) => a + b,0))}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>

    </CardContent>
  </Card>
);
}
