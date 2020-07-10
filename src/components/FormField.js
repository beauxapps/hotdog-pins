import React from 'react';

const FormField = ({ label, type, name, placeholder, required }) => {
  return (
    <div className="FormFieldContainer">
      <label className="inputLabel" htmlFor={name}>{label}</label>
      <input className="inputField" name={name} type={type} placeholder={placeholder} required />
    </div>
  );
};

export default FormField;
