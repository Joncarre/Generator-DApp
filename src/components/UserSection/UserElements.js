import styled from 'styled-components';

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
        rgba(11, 83, 69 ) 0%,
        rgba(23, 165, 137) 100%
    );
`;

export const FormWrap1 = styled.div`
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 60%;
    }
`;

export const FormWrap2 = styled.div`
    height: 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 7%;
    }
`;

export const FormButton = styled.input`
    font-family: monospace, monospace;
    background: #117864;
    padding: 18px 0px;
    margin-top: 15px;
    border-radius: 5px;
    border: 3px solid #117864;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;

    &:hover{
        transition: all 0.3s ease-in-out;
        border: 3px solid #117864;
        color: #117864;
        background: #fff;
    }
`;

export const FormButton1 = styled.input`
    font-family: monospace, monospace;
    background: #117864;
    padding: 18px 0px;
    margin-top: 15px;
    border-radius: 5px;
    border: 3px solid #117864;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    width: 40%;
    margin-left: 5%;
    margin-right: 5%;
    float: left;

    &:hover{
        transition: all 0.3s ease-in-out;
        border: 3px solid #117864;
        color: #117864;
        background: #fff;
    }
`;

export const FormButton2 = styled.input`
    font-family: monospace, monospace;
    background: #117864;
    padding: 18px 0px;
    margin-top: 15px;
    border-radius: 5px;
    border: 3px solid #117864;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    width: 40%;
    margin-left: 5%;
    margin-right: 5%;
    float: left;

    &:hover{
        transition: all 0.3s ease-in-out;
        border: 3px solid #117864;
        color: #117864;
        background: #fff;
    }
`;

export const FormH1 = styled.h1`
    margin-bottom: 5px;
    margin-top: 0px;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
`;


export const Form = styled.form`
    background: #1b2631;
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 20px 80px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen and (max-width: 600px) {
        padding: 80px 80px;
    }
`;
