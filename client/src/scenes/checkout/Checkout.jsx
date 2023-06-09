import {useSelector} from 'react-redux';
import {Box, Button, Stepper, Step, StepLabel} from '@mui/material';
import {Formik} from 'formik';
import {useState} from 'react';
import * as Yup from 'yup';
import {shades} from '../../theme';

import Shipping from './Shipping';
import Payment from './Payment';

import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(
  "pk_test_51NFMiZBwfVIsVrXNJ2137j7TKB6rlhktRox4HlXjoQvM5EOYj4Kk5AM189pxRpMkDKXx2nDAo9aDAPNW9vS8OXzs00wEjCGQGl"
);
const initialValues = {
  billingAddress:{
    firstName:'',
    lastName:'',
    country:'',
    street1:'',
    street2:'',
    city:'',
    state:'',
    zipCode:'',
  },
  shippingAddress:{
    isSameAddress:true,
    firstName:'',
    lastName:'',
    country:'',
    street1:'',
    street2:'',
    city:'',
    state:'',
    zipCode:'',
  },
  email:'',
  phoneNumber:'',
}

const checkoutSchema = [
  Yup.object().shape({
    billingAddress: Yup.object().shape({
      firstName:Yup.string().required("required"),
      lastName:Yup.string().required("required"),
      country:Yup.string().required("required"),
      street1:Yup.string().required("required"),
      street2:Yup.string(),
      city:Yup.string().required("required"),
      state:Yup.string().required("required"),
      zipCode:Yup.string().required("required"),
    }),
    shippingAddress: Yup.object().shape({
      isSameAddress:Yup.boolean(),
      firstName:Yup.string().when("isSameAddress",{
        is:false,
        then:Yup.string().required("required"),
      }),
      lastName:Yup.string().when("isSameAddress",{
        is:false,
        then:Yup.string().required("required"),
      }),
      country:Yup.string().when("isSameAddress",{
        is:false,
        then:Yup.string().required("required"),
      }),
      street1:Yup.string().when("isSameAddress",{
        is:false,
        then:Yup.string().required("required"),
      }),
      street2:Yup.string(),
      city:Yup.string().when("isSameAddress",{
        is:false,
        then:Yup.string().required("required"),
      }),
      state:Yup.string().when("isSameAddress",{
        is:false,
        then:Yup.string().required("required"),
      }),
      zipCode:Yup.string().when("isSameAddress",{
        is:false,
        then:Yup.string().required("required"),
      }),
    }),
  }),
  Yup.object().shape({
    email:Yup.string().required("required"),
    phoneNumber:Yup.string().required("required"),
  })
]
const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state)=>
    state.cart.cart
  )
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async(values, actions)=>{
    setActiveStep(activeStep + 1);

     // COPYING BILLING ADDRESS TO SHIPPING ADDRESS
    if(isFirstStep && values.shippingAddress.isSameAddress){
      actions.setFieldValue("shippingAddress",{
        ...values.billingAddress,
        isSameAddress:true,
      })
  }

    if(isSecondStep){
      makePayment(values);
    }
    
    actions.setTouched({});

    }

  async function makePayment(values){
    const stripe = await stripePromise;
    const requestBody ={
      userName:[values.firstName, values.lastName].join(" "),
      email:values.email,
      products:cart.map(({id,count})=>({
        id,
        count,
      }))
    };
    const response = await fetch('http://localhost:1337/api/orders',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(requestBody)
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId:session.id,
    });
  }
  return (
   <Box width="80%" m="100px auto">
    <Stepper activeStep={activeStep} sx={{m:"20px 0"}}>
      <Step>
        <StepLabel>Billing</StepLabel>
      </Step>
      <Step>
        <StepLabel>Payment</StepLabel>
      </Step>
    </Stepper>
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema[activeStep]}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        })=>(
          <form onSubmit={handleSubmit}>
            {isFirstStep && (
              <Shipping
                values = {values}
                errors = {errors}
                touched = {touched}
                handleBlur = {handleBlur}
                handleChange = {handleChange}
                setFieldValue = {setFieldValue}
              >
              </Shipping>
            )}
             {isSecondStep && (
              <Payment
                values = {values}
                errors = {errors}
                touched = {touched}
                handleBlur = {handleBlur}
                handleChange = {handleChange}
                setFieldValue = {setFieldValue}
              >
              </Payment>
            )}

            <Box display="flex" justifyContent="space-between" gap="50px">
              {isSecondStep &&(
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[200],
                    boxShadow:"none",
                    color: "white",
                    borderRadius: 'none',
                    padding:'15px 40px',
                  }}
                >Back</Button>
                
              )}
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow:"none",
                    color: "white",
                    borderRadius: 'none',
                    padding:'15px 40px',
                  }}
                >{isFirstStep ? "Next" : "Place Order"}</Button>
            </Box>
          </form>
        )}

      </Formik>
    </Box>
   </Box>
  )
}

export default Checkout