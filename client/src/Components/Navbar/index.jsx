import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import SearchResult from "./SearchResult";
import fetchData from "../../Utils/fetchData";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchProducts, setSearchProducts] = useState();
  const [searchCategories, setSearchCategories] = useState();
  const [searchInp, setSearchInp] = useState();

  const handleSearch = async (e) => {
    setSearchInp(e.target.value);
    const responsePor = await fetchData(
      `products?populate=*&filters[title][$contains]=${e.target.value}`
    );
    const responseCat = await fetchData(
      `categories?populate=*&filters[title][$contains]=${e.target.value}`
    );
    setSearchProducts(responsePor.data);
    setSearchCategories(responseCat.data);
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".searchInp")) {
        setSearchInp("");
        setSearchProducts([]);
        setSearchCategories([]);
      }
    });
  }, []);
  const porItem = searchProducts?.map((e, index) => (
    <SearchResult
      id={e.id}
      img={e.image[0]?.url}
      title={e.title}
      type={"product"}
      key={index}
    />
  ));
  const catItem = searchCategories?.map((e, index) => (
    <SearchResult
      id={e.id}
      img={e.image[0]?.url}
      title={e.title}
      type={"category"}
      key={index}
    />
  ));

  return (
    <Box
      id={"navbar"}
      position={"static"}
      display={"flex"}
      justifyContent={"space-between"}
      sx={{ backgroundColor: "#DE8F5F", padding: "0 8%", height: "80px" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Typography
          component={"h1"}
          sx={{ fontSize: "28px", color: "#A94A4A" }}
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
          onClick={() => navigate("/blog")}
        >
          Blog
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
      <Box width={'300px'} sx={{position:'relative'}}>
      <FormControl variant="standard " className="searchInp" sx={{width:'100%'}}>
        <InputLabel htmlFor="input-with-icon-adornment">
          Search
        </InputLabel>
        <Input
          onChange={handleSearch}
          value={searchInp}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Stack sx={{
        // border:"1px solid #3D2C2E",
        position:'absolute',
        width:'100%',
        height:searchInp?'400px':'0px',
        borderRadius:'0 0 5px 5px',
        overflowY:'scroll',
        backgroundColor:'#fff2ce',
        zIndex:'1000',
        transition:'all .5s'
      }}>
        <Typography variant="body1" textAlign={'center'}>Categories</Typography>
        {catItem}
        <Divider/>
        <Typography variant="body1" textAlign={'center'}>Products</Typography>

        {porItem}
      </Stack>
      </Box>
        <Tooltip title="Cart">
          <IconButton>
            <ShoppingCartIcon
              onClick={() => navigate("/cart")}
              sx={{ color: "white", cursor: "pointer" }}
            />
          </IconButton>
        </Tooltip>
        {token ? (
          <Tooltip title="Profile">
            <IconButton>
              <AccountCircleIcon
                onClick={() => navigate("/profile")}
                sx={{ color: "white", cursor: "pointer" }}
              />
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
