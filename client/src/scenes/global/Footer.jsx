import {Box, Typography, useTheme} from '@mui/material';
import {shades} from '../../theme';
import logo from '../../logo.png';


const Footer = () => {
    const { palette:{neutral}}=useTheme();

  return (
    <>
        <Box
        mt="70px"
        p="40px 0"
        backgroundColor={neutral.light}
    >
        <Box
            width="80%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap="30px"
            columnGap="clamp(20px,30px,40px)"
        >
            <Box width="clamp(20%,30%,40%)">
                <Typography variant="h4" fontWeight="bold" mb="30px" color={shades.secondary[500]}>
                <img src={logo} alt="logo" style={{width:"180px",height:"70px",objectFit:"contain"}}/>
                </Typography>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas maiores inventore commodi, possimus placeat repellendus dolorum! Et veritatis debitis, voluptas non nostrum vero aliquam cumque? Tempora nobis accusamus aliquam inventore?
                </div>
            </Box>
            <Box>
                <Typography variant='h4' fontWeight="bold" mb="30px">About Us</Typography>
                <Typography mb="30px">Our Store</Typography>
                <Typography mb="30px">Terms & Conditions</Typography>
                <Typography mb="30px">Privacy Policy</Typography>
            </Box>

            <Box>
                <Typography variant='h4' fontWeight="bold" mb="30px">Customer Care</Typography>
                <Typography mb="30px">Help Center</Typography>
                <Typography mb="30px">Track Your Order</Typography>
                <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
                <Typography mb="30px">Returns & Refunds</Typography>
            </Box>

            <Box width="clamp(20%,25%,30%)">
                <Typography variant="h4" fontWeight="bold" mb="30px" color={shades.secondary[500]}>
                    Contact Us
                </Typography>
                <Typography mb="30px">50 North Whatever Blvd, Toronto, ON M24 4JE</Typography>
                <Typography mb="30px">Email: nayanbastola777@gmail.com</Typography>
                <Typography mb="30px">(222)-333-4444</Typography>
            </Box>

        </Box>
    </Box>
    
     <Box
     mt="0"
     p="20px 0"
     backgroundColor="#fdbfcd"
    >
        <div style={{textAlign:"center"}}>
            Copyright © {new Date().getFullYear()}{" Developed By: Nayan Bastola"}
        </div>

 </Box>
    </>
  )
}

export default Footer