import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../Store/Slices/AuthSlice";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      id={"navbar"}
      position={"static"}
      display={"flex"}
      justifyContent={"space-between"}
      sx={{ backgroundColor: "#DE8F5F", padding: "0 8%" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Typography
          component={"h1"}
          sx={{ fontSize: "28px", lineHeight: "80px", color: "#A94A4A" }}
        >
          Jewel Nest
        </Typography>
        <Button
          variant="text"
          sx={{ fontSize: "16px", color: "white" }}
          color="white"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="text"
          sx={{ fontSize: "16px", color: "white" }}
          color="white"
          onClick={() => navigate("/products/all/all-category")}
        >
          Products
        </Button>
        <Button
          variant="text"
          sx={{ fontSize: "16px", color: "white" }}
          color="white"
          onClick={() => navigate("/about")}
        >
          About Us
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <TextField
          sx={{ width: "300px", color: "white" }}
          id="demo-helper-text-misaligned-no-helper"
          label={<SearchIcon sx={{ color: "white" }} />}
        />
        <Tooltip title="Cart">
      <IconButton>
      <ShoppingCartIcon onClick={()=>navigate('/cart')} sx={{ color: "white", cursor: "pointer" }} />
      </IconButton>
    </Tooltip>
        {token ? (
          <Tooltip title="Profile">
            <IconButton>
              <AccountCircleIcon sx={{ color: "white", cursor: "pointer" }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Login">
            <IconButton>
              <Button onClick={() => navigate("/auth")}>
                <LoginIcon sx={{ color: "white", cursor: "pointer" }} />
              </Button>
            </IconButton>
          </Tooltip>
        )}
        {token && (
          <Tooltip title="Logout">
            <IconButton>
              <LogoutIcon
                color="error"
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(logout())}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
