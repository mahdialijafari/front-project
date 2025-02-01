import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, CardMedia, TextField, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import fetchData from '../../Utils/fetchData';
import ProductDetailsSkeleton from './productDetailsSkeleton';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(); // Start with quantity 1
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetchData(`products?populate=*&filters[id][$eq]=${id}`);
      setProduct(response.data[0]);
      setQuantity(0); // Reset quantity on product load
    })();
  }, [id]);

  const handleIncrease = () => {
    if (quantity < product?.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {product ? (
        <Card
          sx={{
            backgroundColor: '#fff2ce',
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '2% 20%',
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <CardMedia
            component="img"
            image={import.meta.env.VITE_BASE_URL + product?.image[0]?.url}
            alt={product?.title}
            sx={{ height: 500, objectFit: 'cover', borderRadius: '16px', objectFit: 'contain', width: '100%' }}
          />
          <CardContent>
            <Typography
              variant="h4"
              sx={{ color: '#E17564', fontWeight: 'bold', marginBottom: 2 }}
            >
              {product?.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#4A4A4A', marginBottom: 2 }}
            >
              {product?.description}
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1" sx={{ color: '#E17564', fontWeight: '600' }}>
                Category:
              </Typography>
              <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                {product?.categories[0]?.title}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ color: '#E17564', fontWeight: 'bold', marginBottom: 2 }}
            >
              Price: ${product?.price}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="body1" sx={{ color: '#4A4A4A' }}>
                Quantity: {product?.quantity}
              </Typography>
              <IconButton
                onClick={handleDecrease}
                disabled={quantity <= 0} // Disable if quantity is 1 or less
                sx={{
                  backgroundColor: '#E17564',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#D16458',
                  },
                }}
              >
                <Remove />
              </IconButton>
              <TextField
                value={quantity}
                size="small"
                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                sx={{
                  width: '60px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
              />
              <IconButton
                onClick={handleIncrease}
                disabled={quantity >= product?.quantity} // Disable if quantity is equal to available stock
                sx={{
                  backgroundColor: '#E17564',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#D16458',
                  },
                }}
              >
                <Add />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#E17564',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#D16458',
                },
                borderRadius: '8px',
                padding: '10px',
                fontWeight: 'bold',
              }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ProductDetailsSkeleton />
      )}
    </>
  );
};

export default ProductDetails;
