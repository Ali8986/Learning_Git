import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CancelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background: linear-gradient(
    135deg,
    rgba(255, 144, 129, 0.9),
    rgba(255, 99, 71, 0.9)
  );
  color: #fff;
  font-family: "Arial", sans-serif;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const Message = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  max-width: 500px;
  text-align: center;
  line-height: 1.5;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Button = styled.button`
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 150px;

  ${(props) =>
    props.primary
      ? `
      background-color: #FF6B6B;
      color: white;
      &:hover {
        background-color: #FF3B3B;
        box-shadow: 0 6px 12px rgba(255, 59, 59, 0.3);
      }
    `
      : `
      background-color: #3498db;
      color: white;
      &:hover {
        background-color: #2980b9;
        box-shadow: 0 6px 12px rgba(52, 152, 219, 0.3);
      }
    `}
`;

const Cancel = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/checkout"); // Navigate back to homepage
  };

  return (
    <CancelWrapper>
      <Title>Transaction Canceled</Title>
      <Message>
        We're sorry, but it seems like your transaction was unsuccessful. Please
        try again, or go back to the homepage for further assistance.
      </Message>
      <ButtonContainer>
        <Button onClick={handleHome}>Order Again</Button>
      </ButtonContainer>
    </CancelWrapper>
  );
};

export default Cancel;
