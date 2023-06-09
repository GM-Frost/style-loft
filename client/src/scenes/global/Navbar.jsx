import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Badge, Box, IconButton} from '@mui/material';
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined
} from '@mui/icons-material';

import {useNavigate} from 'react-router-dom';
import {shades} from '../../theme';

import {setIsCartOpen} from '../../state';
import logo from '../../logo.png';




const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255,255,255,0.95)"
      
      color="#5d49c2"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
          <Box
          
            width="80%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
         
          >
            <Box
              onClick={() => navigate('/')}
              sx={{'&:hover':{cursor:"pointer"},fontSize:"15px"}}
              color={shades.secondary[300]}
              sty
            >
              <img src={logo} alt="logo" style={{width:"180px",height:"70px",objectFit:"contain"}}/>
            </Box>
            <Box
              display="flex"
              justfyContent="space-between"
              columnGap="20px"
              zIndex="2"
            >
              <IconButton sx={{color:"#5d49c2"}}>
                <SearchOutlined/>
              </IconButton>

              <IconButton sx={{color:"#5d49c2"}}>
                <PersonOutline/>
              </IconButton>

              <Badge
                badgeContent={cart.length}
                color="secondary"
                invisible={cart.length === 0}
                sx={{
                  "& .MuiBadge-badge":{
                    right:5,
                    top:5,
                    padding:"0 4px",
                    height:"14px",
                    minWidth:"13px",
                  }
                }}
              >
                <IconButton 
                onClick = {()=>dispatch(setIsCartOpen({}))}
                sx={{color:"#5d49c2"}}>
                  <ShoppingBagOutlined/>
                </IconButton>
              </Badge>
              <IconButton sx={{color:"#5d49c2"}}>
                <MenuOutlined/>
              </IconButton>

            </Box>
          </Box>          
        </Box> 
   
  )
}

export default Navbar