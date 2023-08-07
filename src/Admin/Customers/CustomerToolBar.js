import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Search as SearchIcon } from "../icons/search";

export const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Khách Hàng
      </Typography>
      <Box sx={{ m: 1 }}>
      <Typography
        sx={{ m: 1 }}
        variant="h6"
      >
        Tổng số khách hàng: 18
      </Typography>
      </Box>
      <Link to="/admin/customer/addCustomer">
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained">
            Thêm khách hàng
          </Button>
        </Box>
      </Link>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: "100%" }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Tìm kiếm khách hàng"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
