import React from 'react'
import { 
    Container, 
    Form, 
    FormButton, 
    FormInput, 
    FormWrap,
    FormH1,
    FormLabel,
    FormContent,
    Icon,
    Text
 } from './SigninElements';

const SignIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form action="#">
                            <FormH1>Sign in your account</FormH1>
                            <FormLabel htmlFor='for'>ORCID</FormLabel>
                            <FormInput type='email'/>
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password'/>
                            <FormButton type='submit'>Continue</FormButton>
                            <Text>Forgot password</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn;
