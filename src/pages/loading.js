import React from "react";

const BouncingDotsLoader = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // background: "#ececff", // Set to 100% of the viewport height
  };

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    animation: "bouncing-loader 4.2s infinite alternate", // Increased animation duration
  };

  const dotStyle = {
    width: "16px",
    height: "16px",
    margin: "3px 6px",
    borderRadius: "50%",
  
    backgroundColor:"#ADD8E6",
    opacity: "2",
    animation: "bouncing-loader 1.2s infinite alternate", // Increased animation duration
  };

  const keyframes = `
    @keyframes bouncing-loader {
      to {
        opacity: 0.1;
        transform: translateY(-16px);
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={loaderContainerStyle}>
        <div style={loaderStyle}>
          <div style={dotStyle}></div>
          <div style={dotStyle}></div>
          <div style={dotStyle}></div>
        </div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
