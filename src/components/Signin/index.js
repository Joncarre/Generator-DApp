import { React } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { generatorAddress, requestAccount } from '../../App.js';
import { ethers } from 'ethers';
import Generator from '../../artifacts/contracts/Generator.sol/Generator.json';
import {
    Container,
    FormButton
} from './SinginElements'
import {
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormError
} from '../Register/RegisterElements'

const SignIn = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    async function async_checkPass(data) {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const contract = new ethers.Contract(generatorAddress, Generator.abi, provider);
          try {
            const signer = provider.getSigner();
            const result = await contract.connect(signer).checkPass(data.secret);
            if(result){
                console.log("es true");
              } else {
                console.log("es false");
              }
          } catch (err) {
            console.log("Error: ", err)
          }
        }    
      }

    return (
        <Container>
            <FormWrap>
                <FormContent>
                    <Form onSubmit={handleSubmit(async_checkPass)}>
                        <FormH1>Access to information</FormH1>
                        <FormLabel>Password from email</FormLabel>
                        <FormInput {...register("secret", { 
                            required: true,
                            minLength: 10, 
                            maxLength: 10,
                            pattern: /^[0-9\b]+$/
                        })} type="number" name="secret"/>
                            {errors?.secret?.type === "required" && <FormError>This field is required</FormError>}
                            {errors?.secret?.type === "minLength" && <FormError>It must be a number of 10 digits</FormError> }
                            {errors?.secret?.type === "maxLength" && <FormError>It must be a number of 10 digits</FormError> }
                            {errors?.secret?.type === "pattern" && <FormError>Numerical characters only</FormError> }
                        <FormButton type="submit"/>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    )
}

export default SignIn;