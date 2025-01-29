import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, CardMedia, TextField, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import fetchData from '../../Utils/fetchData';
import ProductDetailsSkeleton from './productDetailsSkeleton';
// { image, title, description, price, category, initialQuantity = 1 }
const ProductDetails = () => {
  const [product,setProduct]=useState()
  const {id}=useParams()
  useEffect(()=>{
    (async()=>{
      const responde=await fetchData(`products?populate=*&filters[id][$eq]=${id}`)
      setProduct(responde.data[0])
    })()
  },[])
console.log(product)
  // const [quantity, setQuantity] = useState(initialQuantity);

  // const handleIncrease = () => setQuantity(quantity + 1);
  // const handleDecrease = () => {
  //   if (quantity > 1) setQuantity(quantity - 1);
  // };

  return (
    <>
    {product?<Card
      sx={{
        backgroundColor: '#fff2ce',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        // maxWidth: '800px',
        margin: '2% 20%',
        padding: '16px',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <CardMedia
        component="img"
        image={import.meta.env.VITE_BASE_URL+product?.image[0]?.url}
        alt={product?.title}
        sx={{ height: 500, objectFit: 'cover', borderRadius: '16px',objectFit:'contain' ,width:'100%'}}
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
            {product?.categories[0]?.title} and {product?.categories[1]?.title}
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
            // onClick={handleDecrease}
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
            // value={quantity}
            size="small"
            inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
            sx={{
              width: '60px',
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          />
          <IconButton
            // onClick={handleIncrease}
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
    </Card>:<ProductDetailsSkeleton/>}
    </>
  );
};

export default ProductDetails;
