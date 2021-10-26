import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Generator from './artifacts/contracts/Generator.sol/Generator.json'

// Update with the contract address logged out to the CLI when it was deployed 
const generatorAddress = "0xE695d851089AC420a4bb5619349032Cfe21Da72b"

function App() {
  // store greeting in local state
  const [data, setData] = useState([" ", " ", " ", " "])
  const [user, setUser] = useState(0)

    // request access to the user's MetaMask account
    async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function async_solveLastInstance() {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(generatorAddress, Generator.abi, signer);
        const transaction = await contract.solveLastInstance(user)
        await transaction.wait()
      }
    }

    async function async_regResearcher() {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(generatorAddress, Generator.abi, signer);
        const transaction = await contract.regResearcher(user)
        await transaction.wait()
      }
    }

    // -----------------------------------------
    async function async_createAInstance() {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(generatorAddress, Generator.abi, signer);
        const transaction = await contract.createAInstance({
          gasLimit: 12000000
        })
        await transaction.wait()
      }
    }

    async function async_getInstance() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(generatorAddress, Generator.abi, provider);
        try {
          const signer = provider.getSigner()
          const result = await contract.connect(signer).getInstance()
          let startDate = new Date(parseInt(result[2]._hex.slice(2), 16)*1000);
          let endDate = new Date(parseInt(result[4]._hex.slice(2), 16)*1000);         
          let arrayData = [
            result[1], 
            startDate.getFullYear() + "/" + startDate.getMonth() + "/" + startDate.getDate()  + " " + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds(),
            result[3], 
            endDate.getFullYear() + "/" + endDate.getMonth() + "/" + endDate.getDate()  + " " + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds()
          ]
          setData(arrayData)
          console.log(arrayData)
        } catch (err) {
          console.log("Error: ", err)
        }
      }    
    }

  return (
    <div className="App">
      <h3>Researcher information</h3>
      <button onClick={async_regResearcher}>Set orcid</button>
      <input onChange={e => setUser(e.target.value)} placeholder="orcid" />
      <h3>Instance information</h3>
      <button onClick={async_createAInstance}>Create A instance</button>
      <button>Create B instance</button>
      <p></p>
      <button onClick={async_getInstance}>Get instance</button>
      <div>
        <p><h5>Instance: </h5>{data[0]}</p>
        <p><h5>Start date: </h5>{data[1]}</p>
        <p><h5>Solution: </h5>{data[2]}</p>
        <p><h5>Solved date: </h5>{data[3]}</p>
      </div>
      <button onClick={async_solveLastInstance}>Set solutionn</button>
      <input onChange={e => setUser(e.target.value)} placeholder="solution" />
    </div>
  );
}

export default App;
