##Hotdog Pins Payment Intents Friction Log

Purpose & Logger's Notes

Friction logs are great tools to illuminate even the tiniest areas where tools -- apis, packages, tutorials -- might be ambiguous, confusing, or hard to use. In contrast to a bug list, a friction log should have a point of view and context for the issues being presented.

In this friction log, I am documenting the process of using Stripe's Payments Intents API from the standpoint of an Engineer, Stripe's hero persona. I will describe what is good and what can be improved about creating a PaymentIntent and logging successful PaymentsIntents using Stripe's API documentation.

I will use a template commonly used at Google and elsewhere.

## Note -- please feel free to ask questions and comment on this log and I will respond as soon as possible.

## Logger/Tester:

Beau Babst, Candidate for Product Manager, Connect at Stripe

## Environment:

react@16.13.1 // Create-React-App, not ejected, testing locally in Chrome v83 on Mac OSX 10.15
stripe-js@1.7.0
react-stripe-js@1.1.2
stripe@8.68.0
dotenv@8.2.0
react-helmet@6.1.0
express@4.17.1
[optional]stripe cli 1.4.4


## Bootstrap

## Date

July 5th, 2020

## Log Subject

Stripe PaymentsIntents API


##Scenario

I am testing from the perspective of a user running an e-commerce business that sells Hotdog Pins for $12. I have global buyers. I am creating a PaymentIntents integration to support one-time payments for my fabulously popular HotDog Pins.

##Outline

I will document the process from the standpoint of an engineer building a PaymentIntents integration for the first time. As the focus here is on the PaymentsIntents integration, I will start this log at the point of starting that integration, which is after I have created a functioning React app.

/// DELETE ME (At this point, describe all the steps, searches, hiccups, reactions, etc below.)


1. Installing the Stripe CLI
2. Creating a PaymentIntent on the server
3. Collecting payment method details on the client
4. Submitting the payment to Stripe from the client
5. Asynchronously fulfill the customer's order
6. Running through Test Cases on Stripe.com

## Installing the Stripe CLI
## Creating a PaymentIntent on the server
## Collecting payment method details on the client
## Submitting the payment to Stripe from the client
## Asynchronously fulfill the customer's order
## Running through Test Cases on Stripe.com



//// Notes

// TIP
// use the cardElements onChange prop to add a handler
// for setting any errors:

// Learning
  // A common ask/bug that users run into is:
  // How do you change the color of the card element input text?
  // How do you change the font-size of the card element input text?
  // How do you change the placeholder color?
  // The answer to all of the above is to use the `style` option.
  // It's common to hear users confused why the card element appears impervious
  // to all their styles. No matter what classes they add to the parent element
  // nothing within the card element seems to change. The reason for this is that
  // the card element is housed within an iframe and:
  // > styles do not cascade from a parent window down into its iframes
