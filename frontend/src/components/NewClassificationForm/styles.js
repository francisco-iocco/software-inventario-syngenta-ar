import { styled } from "styled-components";

export const Form = styled.form`
  align-items: center;
  border-radius: 15px;
  box-shadow: #f5f5f5 0px 0px 20px 0px;
  display: flex;
  flex-direction: column;
  height: 600px;
  justify-content: space-evenly;
  margin: 50px 0;
  max-width: 600px;
  width: 90%;

  & > p {
    animation: appear 2s forwards;
    font-size: 2em;
    opacity: 0;
    text-align: center;
    transform: translateY(-100%);

    &.success {
      color: darkgreen;
    }

    &.error {
      color: red;
    }

    @keyframes appear {
      0% {
        opacity: 0;
        transform: translateY(-100%);
      }
      50% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(100%);
      }
    }
  }

  & > div {
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    position: relative;
  }

  label {
    color: #aaa;
  }

  input {
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #ccc;
    display: block;
    outline: none;
    padding: 10px;

    &:focus,
    &:focus + label {
      border-color: #613fe5;
      color: #613fe5;
    }
  }

  input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type="file"] {
    display: none;

    & + label {
      border-bottom: 2px solid #ccc;
      box-shadow: #eee 0px 0px 20px 0px;
      color: #aaa;
      cursor: pointer;
      padding: 10px 20px;
      text-align: center;
      transition: background-color 0.5s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
        transform: scale(1.03);
      }
    }
  }

  button {
    background-color: transparent;
    border-bottom: 2px solid #ccc;
    border: none;
    box-shadow: #eee 0px 0px 20px 0px;
    color: #613fe5;
    font-size: 1.3em;
    outline: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.5s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.1);
      transform: scale(1.03);
    }
  }
`;

export const ImageContainer = styled.div`
  border: 2px solid ${({ $hasSrc }) => ($hasSrc ? "#613fe5" : "#eee")};
  height: 200px;
  padding: 5px;
  width: 200px;

  img {
    height: 100%;
    object-fit: cover;
    position: relative;
    width: 100%;

    &::before {
      background-color: #fff;
      content: "";
      display: block;
      height: 100%;
      position: absolute;
      width: 100%;
    }
  }
`;
