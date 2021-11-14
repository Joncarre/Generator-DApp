import React from 'react';
import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksContainer, 
    FooterLinksWrapper, 
    FooterLinkItems, 
    FooterLinkTitle, 
    FooterLink,
    WebsiteRights 
} from './FooterElements';
import { NavLogo } from '../Navbar/NavbarElements';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                                <FooterLink to="/">Group</FooterLink>
                                <FooterLink to="/">Research</FooterLink>
                                <FooterLink to="/">Contact us</FooterLink>
                                <FooterLink to="/">Falta rellenar</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>The DApp</FooterLinkTitle>
                                <FooterLink to="/">How it works</FooterLink>
                                <FooterLink to="/">Examples</FooterLink>
                                <FooterLink to="/">FAQs</FooterLink>
                                <FooterLink to="/">Terms of Service</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <WebsiteRights>
                    J. Carrero © {new Date().getFullYear()} All rights reserved.
                </WebsiteRights>
            </FooterWrap>
        </FooterContainer>
    );
};

export default Footer;