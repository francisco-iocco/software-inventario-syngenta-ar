import { styled } from "styled-components";

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  width: 100%;

  button[type="submit"] {
    background-color: ${({ action }) =>
      action === "add" ? "darkgreen" : "#613fe5"};
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 1.3em;
    padding: 10px 20px;
    
    &[disabled] {
      background-color: #eee;
    }
  }
`;

export const GadgetDetails = styled.div`
  border-radius: 10px;
  box-shadow: #f5f5f5 0px 0px 20px 0px;

  p {
    font-size: 1.3em;
    padding: 5px 0;
    text-align: center;
  }

  img {
    border-bottom: 3px solid #000;
    border-radius: 0 0 10px 10px;
    height: 150px;
    object-fit: cover;
    width: 100%;
  }
`;

export const UserInput = styled.div`
  display: flex;
  font-size: 1.2em;
  width: 100%;
`;

export const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  position: relative;
  width: 30%;

  span {
    background-color: #eee;
    border-radius: 5px;
    padding: 5px 10px;
  }

  p {
    bottom: 0;
    position: absolute;
    transform: translateY(100%);
  }
`;

export const InputContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 40%;

  div:nth-child(2) {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    -moz-appearance: textfield;
    appearance: textfield;
    border: 2px solid #000;
    font-size: 1.3em;
    height: 40px;
    outline: none;
    text-align: center;
    width: 40px;
  }

  p {
    bottom: 0;
    color: #ff0000;
    position: absolute;
    transform: translateY(110%);
  }
`;
