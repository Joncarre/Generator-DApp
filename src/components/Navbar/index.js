import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import { 
    Nav, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    NavBtnLink
} from './NavbarElements';
import logo from '../../images/logo.png';
import { connectWallet, getCurrentWalletConnected } from '../interact';

const Navbar = ({ toggle }) => {
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

    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])


    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
       <Nav scrollNav={scrollNav}>
           <NavbarContainer>
               <NavLogo to='/' onClick={toggleHome}>
                    <img src={logo} alt='logo' />
               </NavLogo>
               <MobileIcon onClick={toggle}>
                   <FaBars />
               </MobileIcon>
               <NavMenu>
                   <NavItem>
                       <NavLinks to='dapp'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}>Ethereum DApp</NavLinks>
                   </NavItem>
                   <NavItem>
                       <NavLinks to='scalability'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}>Scalability</NavLinks>
                   </NavItem>
                   <NavItem>
                       <NavLinks to='traceability'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}>Traceability</NavLinks>
                   </NavItem>
                   <NavItem>
                       <NavLinks to='security'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}>Security</NavLinks>
                   </NavItem>
               </NavMenu>
               <NavBtn>
                   <NavBtnLink id="walletButton" onClick={connectWalletPressed}>        
                    {walletAddress.length > 0 ? ("Connected: " + 
                    String(walletAddress).substring(0, 6) + "..." + 
                    String(walletAddress).substring(38)) : (<span>Connect Wallet</span>)}
                   </NavBtnLink>
               </NavBtn>
           </NavbarContainer>
       </Nav> 
    );
};

export default Navbar;
