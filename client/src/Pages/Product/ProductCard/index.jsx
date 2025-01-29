import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, image, title, description, price, category }) => {
    const navigate=useNavigate()
  return (
    <Card
      sx={{
        backgroundColor: '#fff2ce',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
        height: '550px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ height: 180, objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
      />
      <CardContent>
        <Typography
          variant="h5"
          sx={{ color: '#E17564', fontWeight: 'bold', marginBottom: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#4A4A4A', marginBottom: 2 }}
        >
          {description.split(' ').slice(0, 16).join(' ')} ...
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#E17564', fontWeight: '600' }}>
            Category:
          </Typography>
          <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
            {category[0]?.title}  {category.length>1?` and ${category[1].title}`:''}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{ color: '#E17564', fontWeight: 'bold', marginBottom: 1 }}
        >
          ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', padding: 2, marginTop: 'auto' }}>
        <Button
        onClick={()=>navigate(`/product-details/${id}/${title.replaceAll(' ','-')}`)}
          variant="contained"
          sx={{
            backgroundColor: '#E17564',
            color: 'white',
            '&:hover': {
              backgroundColor: '#D16458',
            },
            borderRadius: '8px',
          }}
        >
          More Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
