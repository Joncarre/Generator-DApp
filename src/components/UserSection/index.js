import { React } from 'react';
import { useForm } from 'react-hook-form';
import { generatorAddress, requestAccount } from '../../App.js';
import { ethers } from 'ethers';
import Generator from '../../artifacts/contracts/Generator.sol/Generator.json';
import './messagesInfo.css'
import {
    Container,
    FormButton,
    FormButton1,
    FormButton2,
    Form,
    FormH1,
    FormWrap1,
    FormWrap2
} from './UserElements'
import {
    FormContent,
    FormLabel,
    FormInput,
    FormError
} from '../Register/RegisterElements'

const UserSection = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const {
        register: register2,
        reset: reset2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 }
    } = useForm();

    async function async_createAInstance(data) { 
        if (typeof window.ethereum !== 'undefined') {
          await requestAccount()
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner()
          const contract = new ethers.Contract(generatorAddress, Generator.abi, signer);
          console.log("async_createAInstance: " + data.p_value, data.q_value, data.numInstances);
          const transaction = await contract.createAInstance(
            data.p_value,
            data.q_value,
            6659948276,
            data.numInstances,
            {gasLimit: 12000000})
          await transaction.wait()
        }
    }

    async function async_getInstance(data) {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const contract = new ethers.Contract(generatorAddress, Generator.abi, provider);
          try {
            const signer = provider.getSigner();
            console.log("async_getInstance: " + data.orcid)
            const result = await contract.connect(signer).getInstance(data.orcid);
            console.log(result);
          } catch (err) {
            console.log("Error: ", err)
          }
        }    
    }

    async function async_getAllInstances(data) {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const contract = new ethers.Contract(generatorAddress, Generator.abi, provider);
          try {
            const signer = provider.getSigner();
            console.log("async_getAllInstances: " + data.orcid);
            const result = await contract.connect(signer).getAllInstances(data.orcid);
            console.log(result);
          } catch (err) {
            console.log("Error: ", err)
          }
        }    
    }

    async function async_createBInstance(data) { 
        if (typeof window.ethereum !== 'undefined') {
          await requestAccount()
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner()
          const contract = new ethers.Contract(generatorAddress, Generator.abi, signer);
          console.log("async_createBInstance: " + data.p_value, data.q_value, data.numInstances);
          const transaction = await contract.createBInstance(
            data.p_value, 
            data.q_value,
            3534535345,
            data.numInstances,
            {gasLimit: 12000000})
          await transaction.wait()
        }
    }

    return (
        <Container>
            <FormWrap1>
                <FormContent>
                    <Form key={1} onSubmit={handleSubmit(async_createAInstance)}>
                        <FormH1>Create a new instance</FormH1>
                        <span class="field-tip">
                            <FormLabel>First parameter</FormLabel>
                            <span class="tip-content">The "p" value indicates the probability of generating a new proposition symbol</span>
                        </span> 
                            <FormInput {...register("p_value", { 
                                required: true,
                                max: 99,
                                min: 1,
                                pattern: /^[0-9\b]+$/
                            })} type="number" name="p_value" placeholder="p value"/>
                                {errors?.p_value?.type === "required" && <FormError>Field required</FormError>}
                                {errors?.p_value?.type === "max" && <FormError>Integer number between [1, 99]</FormError> }
                                {errors?.p_value?.type === "min" && <FormError>Integer number between [1, 99]</FormError> }
                                {errors?.p_value?.type === "pattern" && <FormError>Numerical characters only</FormError> }
                        <span class="field-tip">
                            <FormLabel>Second parameter</FormLabel>
                            <span class="tip-content">The "q" value indicates the probability of generating a new clause</span>
                        </span> 
                            <FormInput {...register("q_value", { 
                                required: true,
                                max: 99,
                                min: 1,
                                pattern: /^[0-9\b]+$/
                            })} type="number" name="q_value" placeholder="q value"/>
                                {errors?.q_value?.type === "required" && <FormError>Field required</FormError>}
                                {errors?.q_value?.type === "max" && <FormError>Integer number between [1, 99]</FormError> }
                                {errors?.q_value?.type === "min" && <FormError>Integer number between [1, 99]</FormError> }
                                {errors?.q_value?.type === "pattern" && <FormError>Numerical characters only</FormError> }
                        <span class="field-tip">
                            <FormLabel>Number of instances</FormLabel>
                            <span class="tip-content">Enter the number of instances you would like to generate</span>
                        </span> 
                            <FormInput {...register("numInstances", { 
                                required: true,
                                max: 10,
                                min: 1,
                                pattern: /^[0-9\b]+$/
                            })} type="number" name="numInstances"/>
                                {errors?.numInstances?.type === "required" && <FormError>Field required</FormError>}
                                {errors?.numInstances?.type === "max" && <FormError>Integer number between [1, 10]</FormError> }
                                {errors?.numInstances?.type === "min" && <FormError>Integer number between [1, 10]</FormError> }
                                {errors?.numInstances?.type === "pattern" && <FormError>Numerical characters only</FormError> }
                        <div>
                            <FormButton1 id="submit1" type="submit"  value="A generator"/>
                            <FormButton2 id="submit2" type="submit"  value="B generator"/>
                        </div>
                    </Form>
                </FormContent>
            </FormWrap1>
            <FormWrap2>
                <FormContent>
                    <Form key={2} onSubmit={handleSubmit2(async_getAllInstances)}>
                        <FormH1>Search for instances</FormH1>
                        <FormLabel>ORCID</FormLabel>
                        <FormInput {...register2("orcid", { 
                            required: true,
                            minLength: 16, 
                            maxLength: 16,
                            pattern: /^[0-9\b]+$/
                        })} type="number" name="orcid"/>
                            {errors2?.orcid?.type === "required" && <FormError>Field required</FormError>}
                            {errors2?.orcid?.type === "minLength" && <FormError>It must be a number of 16 digits</FormError> }
                            {errors2?.orcid?.type === "maxLength" && <FormError>It must be a number of 16 digits</FormError> }
                            {errors2?.orcid?.type === "pattern" && <FormError>Numerical characters only</FormError> }
                        <FormButton type="submit" value="Get instances"/>
                    </Form>
                </FormContent>
            </FormWrap2>
        </Container>
    )
}

export default UserSection;
