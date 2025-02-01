import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import notify from '../../../Utils/notify';

const Register = ({ handlePageType }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Registration failed.");
      }

      notify("success", "Registration Successful!");
      handlePageType(); 

    } catch (err) {
      setError(err.message);
      notify("error", err.message);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(45deg, #872341, #E17564)', // Gradient background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          padding: '40px',
          backgroundColor: '#fff2ce',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          marginTop: '50px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              color: '#E17564',
              fontWeight: 'bold',
              marginBottom: '30px',
            }}
          >
            Create an Account at Jewel Nest
          </Typography>
        </motion.div>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <TextField
                label="Username"
                type="text"
                name="username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                required
                InputLabelProps={{
                  required: false,  // Remove the required asterisk
                }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <TextField
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                InputLabelProps={{
                  required: false, 
                }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
                InputLabelProps={{
                  required: false,  
                }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#E17564',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#D16458',
                  },
                  padding: '15px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                }}
              >
                Register
              </Button>
            </motion.div>
          </Stack>
        </form>

        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
            Already have an account?{' '}
            <Link onClick={handlePageType} style={{ color: '#E17564', fontWeight: 'bold' }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
