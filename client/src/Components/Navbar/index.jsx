import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useSelector } from "react-redux";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate=useNavigate()
  return (
    <Box position={'static'} display={"flex"} justifyContent={"space-between"} sx={{backgroundColor:'#DE8F5F',padding:'0 10%'}}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Typography
          component={"h1"}
          sx={{ fontSize: "28px", lineHeight: "80px",color:'#A94A4A' }}
        >
          Jewel Nest
        </Typography>
        <Button variant="text" sx={{fontSize:'16px',color:'white'}} color="white" onClick={()=>navigate('/')}>
          Home
        </Button>
        <Button variant="text" sx={{fontSize:'16px',color:'white'}} color="white" onClick={()=>navigate('/"/products/all/all-category"')}>
          Products
        </Button>
        <Button variant="text" sx={{fontSize:'16px',color:'white'}} color="white" onClick={()=>navigate('/about')}>
          About
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <TextField sx={{width:'300px',color:'white'}} id="demo-helper-text-misaligned-no-helper" label={<SearchIcon sx={{color:'white'}}/> }/>
        <ShoppingCartIcon sx={{color:'white',cursor:'pointer'}}/>
        {token?<AccountCircleIcon sx={{color:'white',cursor:'pointer'}}/>:<LoginIcon sx={{color:'white',cursor:'pointer'}}/>}
      </Box>
    </Box>
  );
};

export default Navbar;
