//import Head from "next/head";
import React from 'react';
//import styled from "@emotion/styled";
//import GlobalStyles from "./prebuilt/GlobalStyles";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {Helmet} from "react-helmet";

// Learning
// To best leverage Stripe’s advanced fraud functionality,
// include this script on every page, not just the checkout page.
// This allows Stripe to detect anomalous behavior that may be indicative
// of fraud as customers browse your website.
// Note: This is why we are adding it to a Layout component.



// TIP
// call loadStripe outside of a component
// in that way there's no chance it will get
// called more times than it needs to

const HotdogPinLayoutContainer = ({ children, title }) => {
  return (

    <>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
    </>
  );
};
export default HotdogPinLayoutContainer;
