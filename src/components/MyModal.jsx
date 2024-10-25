import { Close } from "@mui/icons-material";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
// import { useAccordionButton } from "react-bootstrap";

const ImageContainer = styled.div`
  position: relative;
  .wrapper{
     /* background-color: #7e7ecd; */
    position : fixed;
    z-index : 999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0; 
  }
    .wrapper-container {
      position: fixed;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      max-width: 80rem;
      /* height : 50rem; */
      background-color: #e9d5d5;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      padding : 5rem;
    
    .close-btn .close {
      position: absolute;
      top: 2%;
      right: 2%;
      font-size: 3.2rem;
    }
    .image img {
      max-width: 60rem;
    }
  }
`;

const MyModal = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
     document.body.style.overflowY = "scroll";
    };
  },[]);

  return (
    <>
      <ImageContainer>
        <div className="wrapper" onClick={closeModal}>
          <div className="wrapper-container">
            <div className="close-btn">
              <Close className="close" onClick={closeModal} />
            </div>
            <div className="image">
              <img
                src="./images/services/certificate_of_completion.jpg"
                alt="completed"
              />
            </div>
          </div>
        </div>
        <div></div>
      </ImageContainer>
    </>
  );
};

export default MyModal;
