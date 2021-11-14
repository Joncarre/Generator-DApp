import React from 'react'
import { 
    Container, 
    Form, 
    FormButton
 } from './RegisterElements';

 import {
    FormInput, 
    FormWrap,
    FormH1,
    FormLabel,
    FormContent
 } from '../Signin/SigninElements'

const Register = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form action="#">
                            <FormH1>Register your information</FormH1>
                            <FormLabel htmlFor='for'>Name</FormLabel>
                            <FormInput type='text'/>
                            <FormLabel htmlFor='for'>ORCID</FormLabel>
                            <FormInput type='text'/>
                            <FormButton type='submit'>Register</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default Register;
