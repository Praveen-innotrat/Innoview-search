import React, { Component } from 'react';

const ReDirect = () => {
 /* constructor(props) {
    super(props);
    this.state = {
      // Your form data or input values here
    };
  } */

  // Handle the form submission and redirection
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform your POST request here
      //const response = await fetch('https://innotrat.com:8080/payment_data', {
      const response = await fetch('', {
        method: 'POST',
        body: JSON.stringify(this.state), // Send your data here
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log(response);

      if (response.status === 200) {
        // If the POST request is successful, redirect to another website
        window.location.href = 'https://www.innotrat.com/';
      } else {
        // Handle errors here
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  };

//  render() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {/* Your form inputs here */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

export default ReDirect;
