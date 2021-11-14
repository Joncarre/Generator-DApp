import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Generator from './artifacts/contracts/Generator.sol/Generator.json'
import Navbar from "./components/Navbar/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Home from "./pages";
import SigninPage from "./pages/signin";
import RegisterPage from "./pages/register";

// Update with the contract address logged out to the CLI when it was deployed 
const generatorAddress = "0xb77AA0D2656b1356FFdaC36568ADc9f1a23F6DEC"

function App() {
  const [researcher, setResearcher] = useState({
    orcid: null,
    registered: null,
    idInstance: null
  })

  const [instance, setInstance] = useState({
    id: null,
    chain: null,
    size: null,
    dateCreated: null,
    solution: null,
    solved: null,
    dateSolution: null
  })

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

    async function async_setResearcher() {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(generatorAddress, Generator.abi, signer);
        const transaction = await contract.setResearcher(researcher)
        await transaction.wait()
      }
    }

    async function async_getResearcher() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(generatorAddress, Generator.abi, provider);
        try {
          const signer = provider.getSigner()
          const result = await contract.connect(signer).getResearcher()
          console.log(result)
        } catch (err) {
          console.log("Error: ", err)
        }
      }    
    }

  return (
    <div className="App">
      <h3>Set information</h3>
      <button onClick={async_setResearcher}>Set researcher</button>
      <input onChange={e => setResearcher(e.target.value)} placeholder="" />
      <h3>Get information</h3>
      <button onClick={async_getResearcher}>Get researcher</button>
    </div>
     /* <Router>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/signin' component={SigninPage} exact />
          <Route path='/register' component={RegisterPage} exact />
        </Switch>
      </Router>
    */
  );
}

export default App;
