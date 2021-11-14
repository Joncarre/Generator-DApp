import React, { useState, useEffect } from 'react';
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './SidebarElements';


import { connectWallet, getCurrentWalletConnected } from '../interact';

const Sidebar = ({isOpen, toggle}) => {
       // MetaMask Wallet Connection
       const [walletAddress, setWallet] = useState("");
       const [status, setStatus] = useState("");
       const [name, setName] = useState("");
       const [description, setDescription] = useState("");
       const [url, setURL] = useState("");
   
       useEffect(async () => {
           const {address, status} = await getCurrentWalletConnected();
           setWallet(address)
           setStatus(status); 
   
           addWalletListener();
       }, []);
       
       const connectWalletPressed = async () => {
           const walletResponse = await connectWallet();
           setStatus(walletResponse.status);
           setWallet(walletResponse.address);
       };
   
       function addWalletListener() {
           if (window.ethereum) {
             window.ethereum.on("accountsChanged", (accounts) => {
               if (accounts.length > 0) {
                 setWallet(accounts[0]);
                 setStatus("👆🏽 Write a message in the text-field above.");
               } else {
                 setWallet("");
                 setStatus("🦊 Connect to Metamask using the top right button.");
               }
             });
           } else {
             setStatus(
               <p>
                 {" "}
                 🦊{" "}
                 <a target="_blank" href={`https://metamask.io/download.html`}>
                   You must install Metamask, a virtual Ethereum wallet, in your
                   browser.
                 </a>
               </p>
             );
           }
         }

    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon>

                </CloseIcon>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to='dapp' onClick={toggle}>
                        Ethereum DApp
                    </SidebarLink>
                    <SidebarLink to='scalability' onClick={toggle}>
                        Scalability
                    </SidebarLink>
                    <SidebarLink to='traceability' onClick={toggle}>
                        Traceability
                    </SidebarLink>
                    <SidebarLink to='security' onClick={toggle}>
                        Security
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute id="walletButton" onClick={connectWalletPressed}>        
                        {walletAddress.length > 0 ? ("Connected: " + 
                        String(walletAddress).substring(0, 6) + "..." + 
                        String(walletAddress).substring(38)) : (<span>Connect Wallet</span>)}
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar;
