import './App.css';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Generator from './artifacts/contracts/Generator.sol/Generator.json'
import Navbar from "./components/Navbar/index";
import Sidebar from "./components/SideBar";
import Home from "./pages";
import RegisterPage from "./pages/register";
import UserSection from './components/UserSection';
import SigninPage from './pages/signin';

// Update with the contract address logged out to the CLI when it was deployed 
export const generatorAddress = "0x92d120f6a15c72a0557f19d04fbCBe685D3F23ab";

// request access to the user's MetaMask account
export async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function App() {
  return (
      <Router>
        <Switch >
          <Route path='/' component={Home} exact />
          <Route path='/register' component={RegisterPage} exact />
          <Route path='/singin' component={SigninPage} exact />
          <Route path='/user' component={UserSection} exact />
        </Switch>
      </Router>
  );
}

export default App;
