import React, { useState, useEffect } from "react";
import "./Interview.css";
import {
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdScreenShare,
  MdStopScreenShare,
  MdCallEnd,
} from "react-icons/md";
import Header from "../../Header/Header";
// import MeetingEnded from './MeetingEnded'; // Importing the component to show when meeting ends

const Interview = () => {
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [muteAudio, setMuteAudio] = useState(false);
  const [muteVideo, setMuteVideo] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(interval);
        setIsCallEnded(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleEndCall = () => {
    setIsCallEnded(true);
  };

  const handleScreenShare = () => {
    setIsScreenSharing((prevState) => !prevState);
    // Logic for screen sharing
  };

  const handleAudioMute = () => {
    setMuteAudio((prevState) => !prevState);
    // Logic for muting audio
  };

  const handleVideoMute = () => {
    setMuteVideo((prevState) => !prevState);
    // Logic for muting video
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const renderTimerSlider = () => {
    let sliderColor;
    if (timer > 600) {
      sliderColor = "green";
    } else if (timer > 300) {
      sliderColor = "yellow";
    } else {
      sliderColor = "red";
    }
    return (
      <div
        className={`timer-slider ${sliderColor}`}
        style={{ width: `${(timer / 900) * 100}%` }}
      />
    );
  };

  return (
    <div className="interview-container">
      <Header/>
      <h1>Interview </h1>
      {isCallEnded ? (
        // <MeetingEnded />
        <h1>Meetting Ended</h1>
      ) : (
        <>
          <>
            <div className="timer">{formatTime(timer)}</div>
            {renderTimerSlider()}
          </>
          <div className="video-panel">
            <div className="interviewer-video">
              {/* Render interviewer's video */}
            </div>
            <div className="user-video">{/* Render user's video */}</div>
          </div>
          <div className="controls">
            <div className="icon-bar">
              <MdMic
                onClick={handleAudioMute}
                className={`icon ${muteAudio ? "muted" : ""}`}
              />
              <MdVideocam
                onClick={handleVideoMute}
                className={`icon ${muteVideo ? "muted" : ""}`}
              />
              <MdScreenShare
                onClick={handleScreenShare}
                className={`icon ${isScreenSharing ? "active" : ""}`}
              />
              <MdCallEnd onClick={handleEndCall} className="icon" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Interview;
