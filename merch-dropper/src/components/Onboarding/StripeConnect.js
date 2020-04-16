import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import {FormContainer, ExitButton, StripeTitle, StepContainer, StripeButton, StripeSkipButton, CreateStore, ConnectionMessage} from './Styled'
import history from '../../utils/history';
import axios from 'axios';

const getSteps = () => {

    return ['Create Account', 'Connect Stripe', 'Create Store'];

}

const ConnectStripe = e => {

    e.preventDefault();
    window.location.replace('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GbPkPOEwM5cWwcBy1WX8mXq7UeB0VlxB&scope=read_write')

}

const SkipSetup = e => {

    e.preventDefault();
    history.push('/createstore');
    window.location.replace('https://master.dfgmwfkflaboy.amplifyapp.com/createstore');
}

const StripeConnect = () => {

    const [queryString, setQueryString] = useState(window.location.search);
    let stripeConnected = false;
    let stripeError = false;
    const [activeStep, setActiveStep] = useState(1);
    let userCode = '';
    const steps = getSteps();

    if(queryString.includes("error")){ stripeError = true; }

    if(queryString.includes("code=")){

        userCode = queryString.substring( queryString.indexOf('code=') + 5 );

        axios
            .post(`/api/stripe/accounts`, {
            user_code: userCode
       })
       .then((res) => {
           
        console.log(res)
         let stripeAccountNum = res.data.stripeAccount.stripe_user_id;
         axios
            .post(`/api/stripe/post`, {
                id: localStorage.getItem('token'),
                account_num: stripeAccountNum
            })
       });

       stripeConnected =true;
                
    }

    return (
        <FormContainer>
            <ExitButton onClick={SkipSetup}/>

            <StripeTitle>Connect Stripe</StripeTitle>
            <StepContainer>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </StepContainer>
            {   //For the initial setup form
                !queryString &&
                <StripeButton onClick={ConnectStripe}>Connect Stripe</StripeButton>   
            }
            {   //For the initial setup form
                (!queryString || stripeError) &&
                <StripeSkipButton onClick={SkipSetup}>Skip for now</StripeSkipButton>
            }
            {   (queryString &&  stripeConnected) &&
                <ConnectionMessage>Connection was successful!</ConnectionMessage>   
            }
            {   //If we get a user code back and the connect was successful
                (queryString &&  stripeConnected) &&
                <CreateStore onClick={SkipSetup}>Create Store</CreateStore>    
            }
            {   //If the connection was not successful
                stripeError &&
                <StripeButton onClick={ConnectStripe}>Try Again</StripeButton> 
            }
        </FormContainer>

    );
}

export default StripeConnect;