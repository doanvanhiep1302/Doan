import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Search as SearchIcon } from '../icons/search';
import { Link } from 'react-router-dom';



export const ProductListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Sản phẩm
      </Typography>
      <Box sx={{ m: 1 }}>
      <Typography
        sx={{ m: 1 }}
        variant="h6"
      >
        Tổng sản phẩm: 18
      </Typography>
      </Box>
      <Link
      to="/admin/product/addProduct">
      <Box sx={{ m: 1 }}>
        <Button
          color="primary"
          variant="contained"
        >
          Thêm sản phẩm
        </Button>
      </Box>
      </Link>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: '100%' }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search product"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
