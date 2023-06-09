import React from 'react'
import {Box, Button, Divider, IconButton, Typography} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { shades } from '../../theme';

import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
} from '../../state';

import {useNavigate} from 'react-router-dom';

const Flexbox = styled(Box)`
display: flex;
justify-content: space-between;
align-items: center;
`;

const CartMenu = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart.cart);
    const isCartOpen = useSelector((state)=>state.cart.isCartOpen);
    const totalPrice = cart.reduce((total, item)=>{
        return total + item.count * item.attributes.price;
    }, 0);

    return (
        
        <Box
            //OVERLAY
            display={isCartOpen? 'block' : 'none'}
            backgroundColor="rgba(0,0,0,0.4)"
            position="fixed"
            zIndex="10"
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow ="auto"
           
        >
            {/*MODEL*/}
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor="white"
               
            >
                <Box 
                    padding="30px"
                    overflow="auto"
                    height="100%"
                    
                >
                    {/* HEADER */}
                    <Flexbox mb="15px">
                        <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
                        <IconButton onClick={()=> dispatch(setIsCartOpen({}))}>
                            <CloseIcon/>
                        </IconButton>
                    </Flexbox>
                    <Box>
                        {cart.map((item)=>(
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <Flexbox padding="15px 0">
                                    <Box flex="1 1 40%">
                                        <img alt={item?.name}
                                            width="123px"
                                            height="164px"
                                            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                        
                                        />
                                    </Box>
                                    <Box flex="1 1 60%">

                                        {/* ITEM NAME */}


                                        <Flexbox mb="5px">
                                            <Typography fontWeight="bold">
                                                {item.attributes.name}
                                            </Typography>
                                            <IconButton onClick={()=> dispatch(removeFromCart({id: item.id}))}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </Flexbox>
                                        <Typography>{item.attributes.shortDescription}</Typography>

                                        {/*Amount*/}


                                        <Flexbox m="15px 0">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid ${shades.neutral[500]}`}
                                            >
                                            <IconButton onClick={()=> dispatch(decreaseCount({id: item.id}))}>
                                                <RemoveIcon/>
                                            </IconButton>      
                                            <Typography>{item.count}</Typography> 

                                            <IconButton onClick={()=> dispatch(increaseCount({id: item.id}))}>
                                                <AddIcon/>
                                            </IconButton>     

                                            </Box>

                                            {/* PRICE */}
                                            <Typography fontWeight="bold">$&nbsp;{item.attributes.price}</Typography>
                                        </Flexbox>
                                    </Box>
                                </Flexbox>
                                <Divider/>
                            </Box>
                        ))}
                    </Box>

                    { /* ACTIONS TOTAL PRICE AND BUTTON */}

                    <Box m="20px 0">

                        <Flexbox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">$&nbsp;{totalPrice}</Typography>
                        </Flexbox>

                        <Button
                            sx={{
                                backgroundColor: shades.primary[500],
                                "&:hover":{backgroundColor: shades.neutral[500], color:shades.primary[800]},
                                color:"white",
                                borderRadius:"5px",
                                minWidth:"100%",
                                padding:"20px 40px",
                                margin:"20px 0",
                                fontWeight:800,
                            }}

                            onClick={
                                ()=> {
                                    navigate('/checkout');
                                    dispatch(setIsCartOpen({}));
                                }
                            }
                        >
                           
                           CHECKOUT&nbsp;&nbsp;&nbsp;<ShoppingCartCheckoutIcon/>
                        </Button>
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}
export default CartMenu;