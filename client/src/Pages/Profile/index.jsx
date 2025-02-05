import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Avatar, TextField, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { blue, brown } from "@mui/material/colors";
import notify from "../../Utils/notify";

// Styled Box for the Profile Header
const ProfileHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "#E17564", // Jewel Nest color for header
  padding: "30px",
  borderRadius: "20px",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));


const Profile = () => {
   // State for user profile data
   const {id,username,email}=useSelector(state=>state.auth?.user)
   const {token}=useSelector(state=>state.auth)
   const [profile, setProfile] = useState({
     username,
     email,
   });
   const [info,setInfo]=useState()
   const dispatch=useDispatch()
   const navigate=useNavigate()
   console.log(id)
   useEffect(()=>{
    (async()=>{
      const response=await fetchData(`users?populate=*&filters[id][$eq]=${id}`)
      setInfo(response[0])
    })()
   },[id,profile,info])


   // Handle input changes
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setProfile({ ...profile, [name]: value });
   };
 
   // Handle form submission
   const handleSubmit = async(e) => {
     e.preventDefault();
     const response=await fetchData(`users/${id}`,{
       method:"PUT",
       headers:{
         'content-type':'application/json',
         'authorization':`Bearer ${token}`
       },
       body:JSON.stringify(profile)
     })
     if(response.id){
       notify('success','update successfully')
       dispatch(login({token,user:response}))
       setInfo(response)
     }else{
       notify('error','update failed')
     }
   };
 
   // Handle account removal
   const handleRemoveAccount = async(e) => {
     e.preventDefault();
     if (window.confirm("Are you sure you want to delete your account?")) {    
       const response=await fetchData(`users/${id}`,{
         method:"DELETE",
         headers:{
           'content-type':'application/json',
           'authorization':`Bearer ${token}`
         }
       })
       if(response.id){
         notify('success','Account Deleted Successfully')
         dispatch(logout())
         navigate('/')
       }else{
         notify('error','Delete account failed')
       }
     }
   };

   console.log(info)
  return (
    <Box sx={{ backgroundColor: "#fff2ce", padding: "2% 8%", borderRadius: "20px" }}>
      {/* Profile Header */}
      <ProfileHeader>
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Avatar
            sx={{ width: 120, height: 120, bgcolor: brown[500] }}
            // src={user?.profilePicture || "/default-avatar.png"} // Profile Picture
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {info?.username}
            </Typography>
            <Typography variant="body1">{info?.email}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#DE8F5F",
            "&:hover": { backgroundColor: "#D16458" },
          }}
          onClick={() => navigate("/cart")}
        >
          View Cart
        </Button>
      </ProfileHeader>

      {/* Divider */}
      <Divider sx={{ margin: "20px 0" }} />

      {/* Profile Details Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }} component={'form'} onSubmit={handleSubmit} >
        <Typography variant="h5" fontWeight="bold">
          Profile Details
        </Typography>

        {/* Username */}
        <TextField
          fullWidth
          label="Username"
          // value={profile.username}
          onChange={handleInputChange}
          name="username"
          // disabled={!editing}
          variant="outlined"
          sx={{ backgroundColor: "#ffffff" }}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          // value={profile.email}
          onChange={handleInputChange}
          name="email"
          // disabled={!editing}
          variant="outlined"
          sx={{ backgroundColor: "#ffffff" }}
        />

        <Box sx={{ display: "flex", gap: "15px" }}>
          
            <Button
            type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#DE8F5F",
                "&:hover": { backgroundColor: "#D16458" },
              }}
              // onClick={handleSave}
            >
              Update Profile
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#DE8F5F",
                "&:hover": { backgroundColor: "#D16458" },
              }}
              onClick={handleRemoveAccount}
            >
              Delete Profile
            </Button>
         
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
