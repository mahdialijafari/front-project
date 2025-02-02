import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #872341, #E17564)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '40px',
          backgroundColor: '#fff2ce',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#DE8F5F',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Your Cart is Empty 😔
          </Typography>
        </motion.div>

        <Typography variant="body1" sx={{ color: '#4A4A4A', marginBottom: '30px' }}>
          Looks like you haven't added anything to your cart yet. Browse our collection and find something you love!
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            component={Link}
            to="/products/all/all-category"
            variant="contained"
            sx={{
              backgroundColor: '#DE8F5F',
              color: 'white',
              '&:hover': { backgroundColor: '#D16458' },
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            Start Shopping
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default CartEmpty;
