import React from 'react';
import { Button } from '../ButtonElements';
import { 
    InfoContainer, 
    InfoWrapper, 
    InfoRow, 
    Column1, 
    Column2, 
    Img, 
    ImgWrap,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    primary,
    dark
} from './InfoElements';

const InfoSection = ({lightBg, id, imgStart, img, topLine, lightText, headline, darkText, description, buttonLabel, alt}) => {
    return (
        <div>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                                <BtnWrap>
                                    <Button 
                                    to="home" 
                                    smooth={true} 
                                    duration={500} 
                                    spy={true} 
                                    exact="true" 
                                    offset={-80}

                                    >{buttonLabel}</Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt}></Img>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </div>
    )
}

export default InfoSection;
