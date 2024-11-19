import React, { useState } from 'react'
import styled from "@emotion/styled";
import { Button } from '../../styles/Button';
import MyModal from '../MyModal';
import { Typography } from '@mui/material';

const Wrapper = styled.div`
padding : 1rem 0;
margin-left: 13rem;
.section-hero-data{
    display:flex;
    flex-direction : column;
    justify-content : center;
}

.btn{
    max-width : 13rem;
    display : flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
}

.hero-top-data{
    text-transform : uppercase;
    font-weight : 500;
    font-size : 1.3rem;
    color : ${({ theme }) => theme.colors.helper};
}

.hero-heading{
    text-transform : uppercase;
    font-size : 3.7rem;
    font-weight : 800;
    margin-top : 1rem;
    
}

.hero-paragraph{
    margin-top: 1rem;
    margin-bottom : 1.5rem;
    max-width : 50rem;
    font-weight : 500;
    letter-spacing : 0.1rem;
    
    
    
}

.section-hero-image{
    display : flex;
    justify-content : center;
    align-items : center;
}
.section-hero-image img{
    max-width : 85%;
}
@media (max-width : ${({ theme }) => theme.media.mobile}){
    margin-left : auto;
}

`



const HeroSection = () => {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    return (
       
        <Wrapper>
            <div className="container grid grid-two-columns">
                <div className="section-hero-data">
                    <p className="hero-top-data para">A broad selection of courses</p>
                  
                  <Typography variant='h1' fontSize={"4rem"}>
                  INTERNSHIP PROGRAMME
                  </Typography>
                    
                    
                    <p className="hero-paragraph">The only way to do great work is to love what you do. If you haven't found it yet, keep looking.Don't settle. As with all matters of the heart, you'll know when you find it.</p>
                    
                    <div className="btn-div">
                        {/* <Button className="enroll-btn">
                            <NavLink to="/registration"> Enroll Now</NavLink>
                        </Button> */}
                        <Button onClick={() => setShowModal(true)} className="certificate-btn">
                            Certificate
                            {console.log("clicked")}
                        </Button>
                        <Button>
                            <a href="#ourprogrammes">Our Programmes</a>
                        </Button>
                    </div>
                </div>
                <div className="section-hero-image">
                    <img src="./images/services/hero-section.png" alt="NotFound" />
                </div>
            </div>
            {showModal && <MyModal closeModal={closeModal} />}
        </Wrapper>
        
    )
}

export default HeroSection
