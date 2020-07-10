import React from 'react';
import FormField from "./FormField.js";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="First and Last Name"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="user@example.com"
        required
      />
      <FormField
        name="line1"
        label="Address1"
        type="text"
        placeholder="123 Main St."
        required
      />
      <FormField
        name="line2"
        label="Address2"
        type="text"
        placeholder="Apt 1"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="Springfield"
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        placeholder="Idaho"
        required
      />
      <FormField
        name="postal_code"
        label="ZIP"
        type="text"
        placeholder="12345"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
