import React from "react";
import styled from "styled-components";

// Styled Components for the Button
const Button = styled.button`
  background-color: #0073e6; /* Professional blue */
  color: white;
  font-size: 1.1rem;
  border: none;
  width: 50% !important;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #005bb5;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
  }
`;

const BuyButton = ({ onClick, label = "Buy Now" }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default BuyButton;
