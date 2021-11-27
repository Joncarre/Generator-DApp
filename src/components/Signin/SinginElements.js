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
        rgba(77, 86, 86) 0%,
        rgba(151, 154, 154) 100%
    );
`;

export const FormButton = styled.input`
    font-family: monospace, monospace;
    background: #979A9A;
    padding: 18px 0px;
    margin-top: 15px;
    border-radius: 5px;
    border: 3px solid #979A9A;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;

    &:hover{
        transition: all 0.3s ease-in-out;
        border: 3px solid #979A9A;
        color: #979A9A;
        background: #fff;
    }
`;