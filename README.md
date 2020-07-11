
# Hotdog Pins README

**Hotdog Pins eCommerce Stripe Integration Take Home Assignment** 

**Beau Babst, Candidate for Product Manager, Connect Role 2020** 


![HotDog Pins-min](https://user-images.githubusercontent.com/7648723/87211720-b3df5c00-c2cf-11ea-9ffd-53d42d603661.gif)


## Description

This is a simple single page React app (created with create-react-app, stripe APIs, a bit of bootstrap, and an express server (express server uses express.json, morgan for logging, and a few other packages).
There is a friction log detailing the experience of an engineer -- the testing persona -- in the Friction Log file in this repo. 
I designed a little hotdog badge for fun at the top in illustrator. :)

## Installation

- clone this repo
- open terminal and cd into the project directory `cd hotdog-pins`
- checkout the master branch `git checkout master`
- install dependencies `npm install`
- start the app `npm start`
- cd into the api folder & start the server `cd api && node server.js`

## Environment Variables

I have included environment variables in the api > .env file. These will let your local instance of this app communicate with the demo account I've setup. However, since you don't have my email address and password to login to the stripe dashboard, you won't be able to view the stripe dashboard to verify output. 
Setup a Stripe.com account (presumably you already have one). 

Grab your Test API Keys from the Dashboard. 

Edit the .env file, substituting your test API keys into the variables. 

Restart your server.

## Usage

Go to localhost:3000 in your browser and you should see the hotdog pins ecommerce store.

* Change the quantity of the hotdog pins being ordered (0 to 1000). 
* Enter any billing details (these aren't validated or required or sent to stripe's billing details object).
* Enter payment information (https://stripe.com/docs/payments/accept-a-payment)
* Alternately, if you have added your own stripe account in the environment variables, you can view successful or unsuccessfull tests at https://stripe.com/docs/payments/accept-a-payment.

Test Cards (with any exp and ccv):

- `4242424242424242` -- no required authentication
- `4000002500003155` -- requires authentication
- `4000000000009995` -- declines codes for insufficient_funds

## Logs

View logs of payments on the server in "access.log" -- only 200 status codes are logged. 

## Webhooks 

The server has a webhook endpoint. You can test this integration 

