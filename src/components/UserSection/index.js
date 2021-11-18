import { React, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { generatorAddress, requestAccount } from '../../App.js';
import { ethers } from 'ethers';
import Generator from '../../artifacts/contracts/Generator.sol/Generator.json';
import { 
    FormError
 } from '../Register/RegisterElements';

const UserSection = () => {
    const [user, setUser] = useState([" ", " ", " ", " "]);

    async function async_getResearcher(data) {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(generatorAddress, Generator.abi, provider);
            try {
                const signer = provider.getSigner()
                const result = await contract.connect(signer).getResearcher(data.orcid)
                await setUser(result);
            } catch (err) {
                console.log("Error: ", err)
            }
        }    
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <div>
            <form onSubmit={handleSubmit(async_getResearcher)}>
                <label>Test</label>
                <input {...register("orcid", { 
                    required: true,
                    minLength: 16, 
                    maxLength: 16,
                    pattern: /^[0-9\b]+$/
                })} />
                    {errors?.orcid?.type === "required" && <FormError>This field is required</FormError>}
                    {errors?.orcid?.type === "minLength" && <FormError>It must be a number of 16 digits</FormError> }
                    {errors?.orcid?.type === "maxLength" && <FormError>It must be a number of 16 digits</FormError> }
                    {errors?.orcid?.type === "pattern" && <FormError>Numerical characters only</FormError> }
                <input type="submit" />
                <p>{user[1].toString()}</p>
            </form> 
        </div>
    )
}

export default UserSection;
