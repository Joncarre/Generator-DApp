import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    min-height: 692px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(
        108deg,
        rgba(23, 32, 42) 0%,
        rgba(21, 67, 96) 100%
    );
`;

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`;

export const Icon = styled(Link)`
    margin-left: 32px; 
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;

    @media screen and (mad-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }

    &:hover {
        color: #fff;
    }
`;

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (mad-width: 480px) {
        padding: 10px;
    }
`;

export const Form = styled.form`
    background: #1b2631;
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 60px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`;

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const FormInput = styled.input`
    font-family: "Montserrat", Sans-serif;
    padding: 16px 36px;
    margin-bottom: 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
`;

export const FormButton = styled.input`
    font-family: monospace, monospace;
    background: #1A5276;
    padding: 18px 0px;
    margin-top: 15px;
    border-radius: 5px;
    border: 3px solid #1A5276;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;

    &:hover{
        transition: all 0.3s ease-in-out;
        border: 3px solid #1A5276;
        color: #1A5276;
        background: #fff;
    }
`;

export const FormError = styled.p`
  font-family: monospace, monospace;
  color: #d4ac0d;
  font-size: 14px;
  margin: 0 0 0 0;
  &::before {
    display: inline;
    content: "??? ";
  }   
`;



