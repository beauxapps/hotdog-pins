import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './App.css';
import HotdogPinLayoutContainer from './components/HotdogPinLayoutContainer.js'
import HotDogPinImageandTitle from './components/HotdogPinImageandTitle.js'
import HotdogPinCounter from './components/HotdogPinCounter.js'
import HotdogPinCustomerInfo from './components/HotdogPinCustomerInfo'
import HotdogPinPaymentInfo from './components/HotdogPinPaymentInfo'
import TotalPrice from './components/TotalPrice'
import { Container, Row, Col } from 'react-bootstrap';


const promise = loadStripe("pk_test_51H1hEhCWY2UY3CHFW2jVqtRJBKwVpAVP5rliO7DB1tB6GUHVcwOuOAHanHLmq5gUFbilYGnNTjITzRJeMR5SBA3B00oviZ4QGI");

const HotdogPinsOrderForm = props => {

  const [quantity, setQuantity] = useState(1);
  const fewerHotdogs = () => setQuantity(quantity => Math.max(0, quantity - 1));
  const moreHotdogs = () => setQuantity(quantity => Math.min(1000, quantity + 1));
  //entering the price in dollars here just for display. Properly handling price on the server to avoid nefariousness.
  const price = 12


  return (
    <>
    <div className="HotDogPinsOrderForm">
      <header className="App-header">
        <Container className="center">
          <HotdogPinLayoutContainer />
          <HotDogPinImageandTitle className="center" />

          <HotdogPinCounter
            onFewer={fewerHotdogs}
            quantity={quantity}
            onMore={moreHotdogs}
           />
           <TotalPrice
             quantity={quantity}
             price={price}
            />
          <HotdogPinCustomerInfo className="row center" />
          <Elements stripe={promise} className="row">
            <HotdogPinPaymentInfo
              quantity={quantity}
             />
          </Elements>

        </Container>

      </header>
      <footer className='footer mt-auto py-3 bg-dark text-white'>
        <div className='container center'>By Beau Babst, Candidate for Product Manager, Connect</div>
      </footer>
    </div>
    </>
  );
}

export default HotdogPinsOrderForm;
