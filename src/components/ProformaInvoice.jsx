import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import API_URLS from '../config';
import axios from 'axios'; 

const ProformaInvoice = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [quotationDate, setQuotationDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const FabUrl = API_URLS.innofabapi;  
  
  const PhoneNumberValue= Cookies.get("mobile_number");
  // const PhoneNumberValue =PhoneNumberValue1.replace('+91', '')

  useEffect(() => {
    setIsLoading(true);
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch the amount from the backend
    fetch(`${FabUrl}/api/viewpi/${PhoneNumberValue}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalAmount(data.price); 
        setIsLoading(false); // Assuming the API response has an 'amount' field
      })
      .catch((error) => {
        console.error('Error fetching total amount:', error);
        setIsLoading(false); 
      });

    // Calculate the date for the Quotation valid till field (+2 day from the current date)
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setQuotationDate(formattedDate);
  }, []);

  const handleCheckout = async (amount) => {
    try {
      // Construct the payload for the API request
      const payload = {
        amount: amount, // Pass the payment amount
        PhoneNumber: PhoneNumberValue,
        
      };
      const Payment= API_URLS.payment;
      // Make a POST request to the /initiate-payment API
      const response = await axios.post(`${Payment}/initiate-payment`, payload);

      // Extract the data from the response
      const responseData = response.data;

      // Handle the response data as needed
      console.log("Response from /initiate-payment:", responseData);

      // Redirect to the PhonePe payment page if needed
      if (responseData && responseData.url) {
        window.location.href = responseData.url;
      } else {
        console.error("URL not found in the response");
        alert("URL not found in the response. Please try again later.");
      }
    } catch (error) {
      // Handle API error
      console.error("Error calling /initiate-payment API:", error);
      alert("Error calling /initiate-payment API. Please try again later.");
    }
   
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      {isLoading ? (
        <CircularProgress /> // Display CircularProgress while loading
      ) : (
        <Card variant="outlined" style={{ width: '400px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Total amount to pay
            </Typography>
            <Typography variant="h4" gutterBottom>
              {totalAmount}
            </Typography>
  
            <Typography variant="h6" gutterBottom>
              Quotation valid till
            </Typography>
            <Typography variant="body1" gutterBottom>
              {quotationDate}
            </Typography>
  
            <Button
              variant="contained"
              color="primary"
              onClick={()=>handleCheckout(totalAmount)}              
              style={{ marginTop: '16px' }}
            >
              Pay Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
  
};

export default ProformaInvoice;
