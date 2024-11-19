import React from "react";
import styled from "@emotion/styled";
// import { Button } from "../styles/Button";
import video from "../../../assets/robotics.mp4"
import { Box } from "@mui/material";
import Navbar from "../../layout-components/Navbar";

const Wrapper = styled.div`
  .imageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 0;
    img {
      max-width: 100%;
      height: 50rem;
    }
  }

  .InfoContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    padding: 4rem 4rem 4rem 0rem;

    h2 {
      font-size: 2.7rem;
      font-weight: 600;
    }

    li {
      font-size: 1.4rem;
      font-weight: 600;
      list-style-type: square;
      margin-bottom: 0.6rem;
    }

    .price {
      font-size: 2rem;
      font-weight: 700;
      color: #00000082;
    }

    .CouponContainer {
      .btn {
        background-color: ${({ theme }) => theme.colors.black};
        color: #fff;
        margin-left: 1rem;
        height : 3rem;
        padding : 0.5rem 1rem;

        &:hover{
          transform : scale(0.96);
        }
      }

      .Input {
        max-width: auto;
        height: 3rem;
        padding: 0rem 1rem;
      }
    }

    .CartButton {
      .AddButton {
        height: 3rem;
        display : flex;
        justify-content: center;
        align-items: center;
        padding: 0.3rem 0.8rem;
        background-color: lightgray;
        color: black;
        border: none;
        &:hover {
          transform: scale(0.95);
          background-color: #f0e6e6;
          border: 0.1rem solid gray;
        }
      }
    }
  }

  @media (max-width: ${({theme})=> theme.media.mobile}){
    .grid{
      grid-gap : 0.5rem;
    }
    .imageContainer {
      padding : 2rem 0;
      img{
      height : 30rem;
    }
  }
    .InfoContainer{
      padding : 0 3.2rem;
    }
  }
`;
const VideoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.down("sm")]:{
    marginBottom: "4rem",
    marginTop: "2rem"

}
}))

const Video = styled("video")(({ theme }) => ({
  width: "80%",
  height: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "70%",
    height: "100%",
    
  },
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)",
  borderRadius: "1rem",

}))

const Course4 = () => {
  return (
    <>
    <Box sx={{
      marginBottom: "6rem"
    }}>
      <Navbar/>
    </Box>
      <Wrapper>
        <div className="grid grid-two-columns">
          
          <VideoContainer>
            <Video src={video} controls/>
          </VideoContainer>
          {/* <div className="imageContainer">
            <img src="/images/services/roboticCourse.jpg" alt="NotFound" />
          </div> */}

          <div className="InfoContainer">
            <h2>Mechatronics for Robotics Design</h2>
            <ul>
            <li>
              Industrial and household applications in military, factory shop
              floor, rehabilitation, medical / healthcare etc.
            </li>
            <li>
              Robot mechanisms; Kinematics - coordinate transformations, Direct
              (forward) / Inverse Kinematics, Jacobians, Statics, Trajectory
              Planning, D - H convention{" "}
            </li>
            <li>
              Electrical actuators DC, BLDC / Servo motors, Sensors (tactile,
              haptics, proximity) and it's integration, Motion planning and
              linear (Motor) Control - PWM, feedback and torque control
            </li>
            <li>
              Perception, Simultaneous Localisation and mapping, path planning
              and network algorithms for rout management
            </li>
            <li>
              Use of machine (deep / reinforecment learnng) in robotics towards
              congnitive capabilities
            </li>
            <li>
              System level algorithms for redundancy check and resolution of
              redundancy in robots
            </li>
            <li>
              Standards, Compliances and Operationg Systems involved in
              robotics, vision / camera systems for robotics, application of
              RADAR / LIDAR in robotics
            </li>
            <li>
              Self managed, cable driven & pneumatically actuated flexible
              robots
            </li>
            <li>Modeling and Simulation of wheeled mobile robots</li>
            </ul>
            <div className="price">&#8377; 2999</div>
            <div className="CouponContainer">
              <input placeholder="Use FIRST10" className="Input" />
              <button className="btn">Apply</button>
            </div>

            <div className="CartButton">
              <div className="AddButton">ADD TO CART</div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Course4;
