import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../Chats/Chats.css";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AddIcon from "@mui/icons-material/Add";
import InuptFiles from "../InputFiles/InuptFiles";
import Cookies from "js-cookie";
import API_URLS from "../../../../config.js";
import ResponseImage from "../Image.js";
import ResponseVideo from "../Video.js";
import ResponseAudio from "../Audio.js";
import ResponseText from "../Text.js";
import { Typography } from "@mui/material";
import Loader from "../../../../assets/Loader.gif";

const Chats = ({ sidebarExpanded }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const inputRef = useRef(null);

  const [fabRes, setFabRes] = useState("");

  let data;
  
  if (fabRes.Response !== undefined) {
    data = JSON.parse(fabRes.Response);
  } 
  console.log(data);

  console.log(fabRes.error);

  // const [innofabRes, setInnofabRes] = useState({});

  let query;

  // const [Toggle, setToggle] = useState(false);

  // let innfabUrl

  const [error, setError] = useState(false);

  const innofabRes = () => {
    const getData = async () => {
      const res = await axios.get(
        "https://api.innotrat.com:5000/dict?_id=64b52e1cba62e5ba32fd56b8"
      );

      setFabRes(res.data);
      
    };
    getData();

    

    return (
      <>
       
      </>
    );
  };

  const url = "/extractTags";

  const chatApi = API_URLS.base + url;

  // console.log(query);

  const Response = () => {
    return (
      <>
        <></>
        {query.Response === "No matching data found in collection" && (
          <span className="bot-span">
            "We have noted your query, in the next 1-2 business days, we will
            update with the required response & keep you posted."
          </span>
        )}

        <>
          {error && (
            <span className="bot-span">
              "We have noted your query, in the next 1-2 business days, we will
              update with the required response & keep you posted."
            </span>
          )}
        </>

        <>
          {query &&
            Object.entries(query).map(([key, value]) => {
              return value && value.length > 0 && key !== "Tags" ? (
                <ResponseText
                  key={key}
                  text={value}
                  uniqueId={query.UniqueId}
                />
              ) : (
                <React.Fragment key={key} />
              );
            })}
        </>

        <>
          {query?.Image?.length > 0 && query.Image ? (
            <ResponseImage text={query.Image} />
          ) : null}
          {query?.Video?.length > 0 && query.Video ? (
            <ResponseVideo src={query.Video} />
          ) : null}

          {query?.Audio?.length > 0 && query.Audio ? (
            <ResponseAudio src={query.Audio} />
          ) : null}
        </>

        <>
          {query.Response ===
            `https://api.innotrat.com:5000/dict?_id=64b52e1cba62e5ba32fd56b8` &&
            innofabRes()}
        </>
      </>
    );
  };

  const handleUserInput = async () => {
    let newChatHistory = [
      ...chatHistory,
      { type: "user", content: userInput },
      {
        type: "bot",
        content: (
          <Typography key="loading">
            <img style={{ height: "50px" }} src={Loader} alt="" />
          </Typography>
        ),
      },
    ];

    setChatHistory(newChatHistory);

    try {
      const response = await axios.post(
        chatApi,
        {
          query: userInput,
          mobile_number: Cookies.get("mobile_number"),
        },
        {
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": "application/json",
            Authorization: Cookies.get("token"),
          },
        }
      );

      query = response.data;

      newChatHistory = [
        ...chatHistory,
        { type: "user", content: userInput },
        { type: "bot", content: Response() },
      ];

      setChatHistory(newChatHistory);

      // console.log("chatHistory : ", chatHistory);
    } catch (error) {
      // console.error("Error fetching user API:", error);
      setError(true);
    }
  };

  useEffect(() => {
    // Scroll to the latest message after the chat history is updated
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chatHistory]); // Trigger the effect whenever chatHistory changes

  const handleClick = async () => {
    // await handleUserInput();

    // console.log("userInput : ", userInput);

    setIsClicked(!isClicked);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0 || e.target.value.trim().length > 0) {
        e.preventDefault();

        handleUserInput();
      }
      setUserInput("");
    }
  };

  useEffect(() => {
    inputRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="chat-history-area">
        {chatHistory.map((item, index) => (
          <div key={index} className={`chat-message ${item.type}`}>
            <>{item.content}</>
          </div>
        ))}
        <div ref={inputRef} />
      </div>
      <div
        className="chat-field-area"
        style={
          sidebarExpanded ? { width: "calc(100vw - 17%)" } : { width: "99%" }
        }
      >
        <div className="chat-field-input">
          <input
            type="text"
            className="chat-field-input-field"
            placeholder="Type Something ......"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="chat-field-icon-div">
          <KeyboardVoiceIcon
            sx={{ fontSize: 30 }}
            style={{ cursor: "pointer" }}
          />

          <AddIcon
            sx={{ fontSize: 35 }}
            className={`add-icon ${isClicked ? "clicked" : ""}`}
            onClick={handleClick}
          />
          {isClicked && (
            <div className="additional-options">
              <InuptFiles className="chat-field-input-body" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
