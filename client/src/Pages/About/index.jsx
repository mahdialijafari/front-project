import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import fetchData from '../../Utils/fetchData';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const [aboutDetails,setAboutDetails]=useState()
    useEffect(()=>{
        (async()=>{
            const response=await fetchData('abouts?populate=*')
            setAboutDetails(response.data[0])
        })()
    },[])
    
    const navigate=useNavigate()
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            backgroundColor: '#fff2ce',
            borderRadius: '15px',
            padding: '50px 30px',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: '700',
                fontSize: '3rem',
                color: '#E17564',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '20px',
                [theme => theme.breakpoints.down('sm')]: {
                  fontSize: '2.5rem',
                },
              }}
            >
              Welcome to Jewel Nest
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#333', fontSize: '1.2rem', marginBottom: '30px' }}
            >
              {aboutDetails?.welcomeDescription}
            </Typography>
            <Button
            onClick={()=>navigate('/#category-section')}
              variant="contained"
              sx={{
                backgroundColor: '#E17564',
                color: '#fff',
                padding: '15px 30px',
                borderRadius: '30px',
                textTransform: 'uppercase',
                fontWeight: '600',
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: '#d1645a',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                },
                [theme => theme.breakpoints.down('sm')]: {
                  padding: '12px 25px',
                },
              }}
            >
              Explore Our Collection
            </Button>
          </motion.div>
        </Box>

        <Grid spacing={4} sx={{ marginTop: '50px' }}>
          {/* Left Text Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  padding: '30px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  marginBottom:'20px'
                }}
              >
                <Typography variant="h4" sx={{ color: '#E17564', fontWeight: 'bold' }}>
                  Our Story
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#333', marginTop: '20px', lineHeight: 1.8 }}
                >
                  {aboutDetails?.aboutDescription}
                </Typography>
                
              </Box>
            </motion.div>
          </Grid>

          {/* Right Image Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Box
                sx={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  width:'100%',
                  height:'100%',
                  '& img': {
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    transform: 'scale(1.05)',
                  },
                  '&:hover img': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box
                component={'img'}
                  src={import.meta.env.VITE_BASE_URL+aboutDetails?.image?.url} 
                  alt='about image'
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Call to Action Section */}
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '50px 30px',
            backgroundColor: '#E17564',
            color: '#fff',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: '700', letterSpacing: '1px' }}>
            Join the Jewel Nest Family
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '20px' }}>
            Explore our exclusive range of jewelry and find the perfect piece that resonates with
            your style and elegance. Let Jewel Nest be part of your journey to sparkle and shine.
          </Typography>
          <Button
          onClick={()=>navigate('/products/all/all-category')}
            variant="contained"
            sx={{
              backgroundColor: '#E17564',
              color: '#fff',
              padding: '15px 30px',
              borderRadius: '30px',
              textTransform: 'uppercase',
              fontWeight: '600',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#d1645a',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
              },
              [theme => theme.breakpoints.down('sm')]: {
                padding: '12px 25px',
              },
            }}
          >
            Start Shopping
          </Button>
        </Box>

        {/* Mission Section */}
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '50px 30px',
            backgroundColor: '#fff2ce',
            color: '#333',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: '700', color: '#E17564' }}>
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginTop: '20px', lineHeight: 1.8 }}
          >
            {aboutDetails?.missionDescription}
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About;
