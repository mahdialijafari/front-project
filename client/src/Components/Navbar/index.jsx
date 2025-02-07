import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Tooltip,
  Dialog,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slices/AuthSlice";
import SearchResult from "./SearchResult";
import fetchData from "../../Utils/fetchData";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchInp, setSearchInp] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // Mobile search dialog

  const handleSearch = async (e) => {
    setSearchInp(e.target.value);
    const responsePor = await fetchData(
      `products?populate=*&filters[title][$contains]=${e.target.value}`
    );
    const responseCat = await fetchData(
      `categories?populate=*&filters[title][$contains]=${e.target.value}`
    );
    setSearchProducts(responsePor.data || []);
    setSearchCategories(responseCat.data || []);
  };

  useEffect(() => {
    const closeSearch = (e) => {
      if (!e.target.closest(".searchInp")) {
        setSearchInp("");
        setSearchProducts([]);
        setSearchCategories([]);
      }
    };
    window.addEventListener("click", closeSearch);
    return () => window.removeEventListener("click", closeSearch);
  }, []);

  const porItem = searchProducts.length
    ? searchProducts.map((e, index) => (
        <SearchResult id={e.id} img={e.image[0]?.url} title={e.title} type={"product"} key={index} />
      ))
    : null;

  const catItem = searchCategories.length
    ? searchCategories.map((e, index) => (
        <SearchResult id={e.id} img={e.image[0]?.url} title={e.title} type={"category"} key={index} />
      ))
    : null;

    const cartLength=useSelector(state=>state.cart.items).length
  return (
    <AppBar position="static" sx={{ backgroundColor: "#DE8F5F", padding: "0 4%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" ,alignItems:'center'}}>
        
        {/* Left Section - Logo & Buttons */}
        <Stack direction="row" spacing={0} alignItems="center" sx={{ flexGrow: 1, gap: 3 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            sx={{ display: { xs: "block", lg: "none" }, color: "white" }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography component="h1" sx={{ fontSize: { xs: "20px", md: "24px" }, color: "#A94A4A" }}>
            Jewel Nest
          </Typography>

          {/* Navigation Buttons */}
          <Stack direction="row" spacing={0} sx={{ display: { xs: "none", lg: "flex" } }}>
            <Button sx={{ color: "white" }} onClick={() => navigate("/")}>Home</Button>
            <Button sx={{ color: "white" }} onClick={() => navigate("/products/all/all-category")}>Products</Button>
            <Button sx={{ color: "white" }} onClick={() => navigate("/blog")}>Blog</Button>
            <Button sx={{ color: "white" }} onClick={() => navigate("/about")}>About Us</Button>
          </Stack>
        </Stack>

        {/* Search Box - Full on Large Screens, Icon on Small Screens */}
        <Box sx={{ position: "relative", width: "300px", display: { xs: "none", md: "block" } }}>
          <FormControl variant="standard" className="searchInp" sx={{ width: "100%" }}>
            <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
            <Input
              onChange={handleSearch}
              value={searchInp}
              id="input-with-icon-adornment"
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
            />
          </FormControl>
          <Stack
            sx={{
              position: "absolute",
              width: "100%",
              height: searchInp ? "400px" : "0px",
              borderRadius: "0 0 5px 5px",
              overflowY: "scroll",
              backgroundColor: "#E17564",
              zIndex: "1000",
              transition: "all .5s",
            }}
          >
            {porItem || catItem ? (
              <>
                <Typography variant="body1" color="#3D2C2E" textAlign="center">{catItem ? "Categories" : ""}</Typography>
                {catItem}
                <Divider />
                <Typography variant="body1" color="#3D2C2E" textAlign="center">{porItem ? "Products" : ""}</Typography>
                {porItem}
              </>
            ) : (
              searchInp && <Typography textAlign="center" color="#3D2C2E">Nothing Found</Typography>
            )}
          </Stack>
        </Box>

        {/* Mobile Search Icon */}
        <Tooltip title="Search">
          <IconButton sx={{ display: { xs: "block", md: "none" }, color: "white" }} onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </IconButton>
        </Tooltip>

        {/* Icons Section */}
        <Stack direction="row" spacing={0} sx={{ alignItems: "center" }}>
          <Tooltip title="Cart">
            <IconButton onClick={() => navigate("/cart")} sx={{ color: "white" }}>
            <Badge badgeContent={cartLength} color="warning">
              <ShoppingCartIcon sx={{color:'white'}} />
          </Badge>
            </IconButton>
          </Tooltip>
          {token ? (
            <Tooltip title="Profile">
              <IconButton onClick={() => navigate("/profile")} sx={{ color: "white" }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Login">
              <IconButton onClick={() => navigate("/auth")} sx={{ color: "white" }}>
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}

          {token && (
            <Tooltip title="Logout">
              <IconButton onClick={() => dispatch(logout())} sx={{ color: "red" }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Toolbar>

      {/* Mobile Search Dialog */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)}>
        <Box sx={{ padding: 2, width: "100%",backgroundColor: "#E17564" ,color:'white'}}>
          <FormControl fullWidth>
            <InputLabel>Search</InputLabel>
            <Input value={searchInp} onChange={handleSearch} startAdornment={<SearchIcon />} />
          </FormControl>
          {porItem || catItem ? (
              <>
                <Typography variant="body1" color="#3D2C2E" textAlign="center">{catItem ? "Categories" : ""}</Typography>
                {catItem}
                <Divider />
                <Typography variant="body1" color="#3D2C2E" textAlign="center">{porItem ? "Products" : ""}</Typography>
                {porItem}
              </>
            ) : (
              searchInp && <Typography textAlign="center" color="#3D2C2E">Nothing Found</Typography>
            )}
        </Box>
      </Dialog>
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250, backgroundColor: "#E17564", height: "100vh", padding: 2 }}>
          {/* Close Button */}
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "white", float: "right" }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: "white", paddingBottom: 2 }}>
            Menu
          </Typography>
          <Button fullWidth sx={{ color: "white" }} onClick={() => {navigate("/")
            setMobileOpen(false)
          }}>
            Home
          </Button>
          <Button fullWidth sx={{ color: "white" }} onClick={() => {navigate("/products/all/all-category")
            setMobileOpen(false)
          }}>
            Products
          </Button>
          <Button fullWidth sx={{ color: "white" }} onClick={() => {navigate("/blog")
            setMobileOpen(false)
          }}>
            Blog
          </Button>
          <Button fullWidth sx={{ color: "white" }} onClick={() => {navigate("/about")
            setMobileOpen(false)
          }}>
            About Us
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;





