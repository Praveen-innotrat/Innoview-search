import React from "react";
import {
  DyteAudioVisualizer,
  DyteAvatar,
  DyteParticipantTile,
  DyteSpinner,
  DyteMeeting,
  DyteSpotlightGrid,
  DyteMixedGrid,
  DyteRecordingIndicator,
} from "@dytesdk/react-ui-kit";
import {
  DyteProvider,
  useDyteClient,
  useDyteMeeting,
  useDyteSelector,
} from "@dytesdk/react-web-core";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./AsyncInterview.css";
import io from "socket.io-client";
import CountdownTimer from "./CountdownTimer";
import axios from "axios";
import Cookies from "js-cookie";
import API_URLS from "../../../config";
import { toast } from "react-toastify";
import youtube from "../../../assets/youtube.png";
import innoview_bot_bg from "../../../assets/innoview_bot_bg.png";
import Swal from "sweetalert2";

export default function AsyncInterview() {
  const [meeting, initMeeting] = useDyteClient();
  const [direction, setDirection] = useState(null); // 0 = Rewind, 1 = Forward
  const [seconds, setSeconds] = useState(0); // Time to adjust playback
  const { id } = useParams();
  console.log(id, "auth id");
  useEffect(() => {
    const authToken = id;

    if (!authToken) {
      return alert("authToken was not passed");
    }

    initMeeting({
      authToken,
      defaults: {
        audio: true,
        video: true,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({ initMeeting });
  }, [initMeeting]);

  return (
    <>
      <DyteProvider value={meeting}>
        <Interview />
      </DyteProvider>
    </>
  );
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-IN";

function Interview() {
  const socket = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [videoLink, setVideoLink] = useState({ width: "50%", height: "auto" });
  const [mute, setMute] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [questionId, setQuestionId] = useState();
  const [savedNotes, setSavedNotes] = useState([]);
  const [timer, setTimer] = useState(0);
  const [count, setcount] = useState(0);
  const [isAnsweringTime, setIsAnsweringTime] = useState(false);
  const timerRef = useRef(null);
  const [active, setActive] = useState(false);
  const { id } = useParams();
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [customRange, setCustomRange] = useState(null);
  const [isDefaultLoop, setIsDefaultLoop] = useState(false);

  // const gapFillerVideo =
  //   "https://res.cloudinary.com/dpfcfb009/video/upload/v1725512137/gapVideo_niuxd1.mp4";
  const gapFillerVideo =
    "https://res.cloudinary.com/dpfcfb009/video/upload/v1732165590/Interviewer_Live_Response_n6rlf0.mp4";

  const { meeting } = useDyteMeeting();

  console.log(gapFillerVideo, "gapfiller");
  const mobile_number = Cookies.get("mobile_number");

  const interviewId = localStorage.getItem("interviewId");

  console.log(interviewId, "meeting id");

  useEffect(() => {
    meeting.recording.start();
  }, []);
  useEffect(() => {
    const get = async () => {
      try {
        const data = { data: interviewId };
        const response = await axios.post(
          `${API_URLS.InnoviewBaseUrl}/api/meetings/conflicts`,
          data,
          headers
        );

        console.log(response.data);

        if (response.data.attended || !response.data.token) {
          navigate("/interview-details");
          window.location.reload();
        }
        // await meeting.recording.start();

        // const getRandomElement = (array) =>
        //   array[Math.floor(Math.random() * array.length)];

        // const getUniqueRandomValues = (values, num) => {
        //   // Shuffle the values array
        //   const shuffled = values.sort(() => 0.5 - Math.random());

        //   // Return the first 'num' unique values
        //   return shuffled.slice(0, num);
        // };

        // const values = Object.values(response.data.QuestionText).flat();
        // console.log(values, "values");
        // // Get 5 unique random values
        // const randomValues = getUniqueRandomValues(values, 5);
        // // const randomValues = Object.values(response.data. QuestionText).map(getRandomElement);
        // console.log(randomValues);

        // setVideo(randomValues);
        // console.log(video);

        const excludeValues = new Set([499, 386, 387]);
        const excludeRanges = [
          { min: 201, max: 300 },
          { min: 421, max: 470 },
          { min: 521, max: 600 },
        ];

        const isExcluded = (value) => {
          // Check if the value is in the excludeValues set
          if (excludeValues.has(value)) return true;

          // Check if the value falls within any of the excluded ranges
          return excludeRanges.some(
            (range) => value >= range.min && value <= range.max
          );
        };

        const getUniqueRandomValues = (min, max, num) => {
          // Create an array of numbers from min to max, excluding specific values and ranges
          const values = Array.from(
            { length: max - min + 1 },
            (_, i) => i + min
          ).filter((value) => !isExcluded(value));

          // Shuffle the array
          const shuffled = values.sort(() => Math.random() - 0.5);

          // Return the first 'num' unique values
          return shuffled.slice(0, num);
        };

        const getRandomValue = (min, max) => {
          // Generate a single random number between min and max, ensuring it's not excluded
          let value;
          do {
            value = Math.floor(Math.random() * (max - min + 1)) + min;
          } while (isExcluded(value));
          return value;
        };

        // Define the ranges and number of unique values
        const range1Min = 1;
        const range1Max = 600;
        const range2Min = 1801;
        const range2Max = 1845;
        const num = 5;

        // Get 5 unique random values from the range 330-400
        const randomValues = getUniqueRandomValues(range1Min, range1Max, num);

        // Get 1 random value from the range 201-220
        const random6thValue = getRandomValue(range2Min, range2Max);

        // Define the special values
        const fromVideo = "introVideo";
        const endVideo = "endVideo";

        // Add the special values and random values to the video array
        const videoArray = [
          fromVideo,
          ...randomValues,
          random6thValue,
          endVideo,
        ];

        console.log(videoArray); // Output array with introVideo, random values, and endVideo

        // Save the values to the video state
        setVideo(videoArray);
        console.log(video);
      } catch (error) {
        // Show an error toast message if something goes wrong
        toast.error("Failed to retrieve random values. Please try again.", {
          autoClose: 5000,
        });
        console.error(error);
      }
    };

    get();
  }, [interviewId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is switched (hidden)
        setTabSwitchCount((prevCount) => prevCount + 1);
        console.log(tabSwitchCount, "count of tab swirching");

        Swal.fire({
          title: "Warning!",
          text: "You switched tabs! Please focus on the test. This is your last warning.",
          icon: "warning",
          confirmButtonText: "I Understand",
          allowOutsideClick: false,
        });
      } else {
        console.log("Tab is visible again");
      }
    };
    if (tabSwitchCount > 1) {
      navigate("/interview-details");
      window.location.reload();
    }

    const handleBeforeUnload = (event) => {
      console.log("sxdcfgvhujikoljh");
      const message =
        "You have unsaved changes. Are you sure you want to leave?";
      event.preventDefault(); // Standard for modern browsers
      event.returnValue = message; // Required for most browsers
      return message; // For some older browsers
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  useEffect(() => {
    handleListen();
  }, [isListening]);

  useEffect(() => {
    console.log("chk the video is null ");

    const v = async () => {
      if (count == 8 && timer == 0) {
        console.log("no videos", count);

        await setSavedNotes((prevNotes) => [...prevNotes, note]);

        await pageBack();
      }
    };
    v();
  }, [count, timer]);

  useEffect(() => {
    socket.current = io(`${API_URLS.InnoviewBaseUrl}`); // Adjust the URL if needed

    function requestVideoLink(key) {
      socket.current.emit("requestVideo", key);
    }
    requestVideoLink(video[count]);
    // requestVideoLink(count);
    setQuestionId(video[count]);
    socket.current.on("videoLink", (newVideoLink) => {
      // setVideoLink(newVideoLink);
      console.log(newVideoLink, "video");
    });
    socket.current.on("videoLink", (videoLink) => {
      setVideoLink(videoLink);
      console.log(videoLink, "video");
      setMute(true);
      setIsAnsweringTime(false);
      clearInterval(timerRef.current);
      setTimer(0);
      setCustomRange(null);
      setIsDefaultLoop(false);
    });

    // socket.current.emit("initialVideoRequest");

    return () => {
      clearInterval(timerRef.current);
      socket.current.disconnect();
      stopMeeting();
    };
  }, [video]);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    // Listen for messages from the WebSocket
    console.log("BEfore listen:::");
    ws.onmessage = ({ data }) => {
      console.log("After listen:::");
      try {
        // Check if data is valid and parse it
        if (!data || typeof data !== "string") {
          console.error("Invalid data received from socket:", data);
          return;
        }

        const parsedData = JSON.parse(data); // Parse the JSON string
        console.log("parsedData", parsedData);
        const { start, stop } = parsedData;

        if (start === undefined || stop === undefined) {
          console.error("Missing start or stop in received data:", parsedData);
          return;
        }

        const newStartTime = parseFloat(start); // Convert start time to a number
        const newEndTime = parseFloat(stop) + 1; // Convert stop time to a number

        if (!isNaN(newStartTime) || !isNaN(newEndTime)) {
          setCustomRange({ start: newStartTime, stop: newEndTime });
          console.log("Newstart:::", newStartTime);
          console.log("EndTime:::", newEndTime);
          setIsDefaultLoop(false);
          //console.error("Invalid start or stop values:", { start, stop });
          //return;
        }

        // Update state with the new range
        // Ensure default loop is off for custom range
        console.log("videoRef.current::", videoRef.current);
        if (videoRef.current && videoRef.current.src === gapFillerVideo) {
          console.log("update start time");
          videoRef.current.currentTime = newStartTime; // Jump to the new start time
          videoRef.current.play(); // Ensure playback starts
        }
      } catch (error) {
        console.error("Error parsing data from socket:", data, error);
      }
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (videoRef.current && direction !== null && seconds > 0) {
  //     const currentTime = videoRef.current.currentTime;

  //     if (direction === 1) {
  //       // Forward the video
  //       videoRef.current.currentTime = currentTime + seconds;
  //     } else if (direction === 0) {
  //       // Rewind the video
  //       videoRef.current.currentTime = Math.max(0, currentTime - seconds); // Avoid negative time
  //     }
  //   }
  // }, [seconds, direction]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        // console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        handleSaveNote();
        // console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      // console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = async () => {
    setQuestionId(video[count]);
    var data1 = {
      question_id: questionId,
    };
    console.log(data1);

    const getdata = await axios.post(
      "https://api2.innotrat.in/api/question",
      data1
    );
    console.log(getdata.data);

    var data = {
      user_response: note,
      question_id: questionId,
    };

    const get1 = await axios.post(
      "https://api2.innotrat.in/api/evaluate",
      data
    );
    console.log(get1.data);

    var data = {
      question_id: questionId,
      question_text: getdata.data.question_text,
      similarity_percentage: get1.data.similarity_percentage,
      interviewId: interviewId,
      answers: note,
    };

    const response = await axios.post(
      `${API_URLS.InnoviewBaseUrl}/api/interview/update`,
      data,
      headers
    );
    console.log(response.data);

    if (note) {
      setSavedNotes((prevNotes) => [...prevNotes, note]);
      setNote("");
    }
  };

  const startAnsweringTime = () => {
    setIsAnsweringTime(true, () => {
      setSavedNotes([...savedNotes, note]);
      setNote("");
    });
    setIsListening(true);
    setMute(false);
    setTimer(60);

    var c = count;
    setcount(c + 1);
    console.log(count);

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          setIsListening(false);
          // socket.current.emit(video[count]);
          console.log(count, "count");

          function requestVideoLink(key) {
            socket.current.emit("requestVideo", key);
          }
          requestVideoLink(video[count + 1]);

          // socket.current.emit(count);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleVideoEnded = () => {
    console.log("FIller video ended");
    if (videoRef.current.src === gapFillerVideo) {
      console.log("Entering here");
      setCustomRange(null);
      setIsDefaultLoop(false);
    }

    startAnsweringTime();
  };
  const stopMeeting = () => {
    if (meeting && meeting.self) {
      // Stop audio and video tracks
      if (meeting.self.localAudioTrack) {
        meeting.self.localAudioTrack.stop();
      }
      if (meeting.self.localVideoTrack) {
        meeting.self.localVideoTrack.stop();
      }
    }
  };
  const usertoken = Cookies.get("token");
  const headers = {
    headers: { authorization: `${usertoken}` },
  };

  console.log(interviewId, "interview id");
  console.log(videoLink, "Video link");

  const mediaStreamRef = useRef(null);

  const pageBack = async () => {
    // console.log("i m from pageback ");
    console.log(savedNotes, "savednotes");
    const data = {
      interviewId: interviewId,
      answers: savedNotes,
    };

    console.log(data);
    const response = await axios.post(
      `${API_URLS.InnoviewBaseUrl}/api/interview/answers`,
      data,
      headers
    );
    console.log(response.data);
    meeting.self.disableVideo();
    meeting.self.disableAudio();
    // await meeting.recording.stop();
    // const authToken = id;

    const handleBeforeUnload = (event) => {
      console.log("sxdcfgvhujikoljh");
      const message =
        "You have unsaved changes. Are you sure you want to leave?";
      event.preventDefault(); // Standard for modern browsers
      event.returnValue = message; // Required for most browsers
      return message; // For some older browsers
    };

    window.removeEventListener("beforeunload", handleBeforeUnload);
    navigate("/interview-details");
    window.location.reload();
  };
  // const active = useDyteSelector((m) => m.participants.active).toArray();

  // useEffect(() => {
  //   const handleMouseMove = () => {
  //     if (!active) {
  //       alert("Please keep your mouse on the box to activate the page.");
  //     }
  //   };

  //   const handleKeyDown = () => {
  //     if (!active) {
  //       alert("Please keep your mouse on the box to activate the page.");
  //     }
  //   };

  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [active]);

  // const handleMouseEnter = () => {
  //   setActive(true);
  // };

  // const handleMouseLeave = () => {
  //   if (active) {
  //     setActive(false);
  //     alert("Please keep your mouse on the box to activate the page.");
  //   }
  // };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.src === gapFillerVideo) {
      const currentTime = videoRef.current.currentTime;

      console.log("currentTime:::::", currentTime);
      console.log("customRange:::::", customRange);
      console.log("IsDefaultLoop", isDefaultLoop);

      if (customRange) {
        console.log("CAme in to custom range:::");
        const { start, stop } = customRange;

        // Custom range logic
        if (currentTime >= stop) {
          setCustomRange(null); // Clear custom range
          setIsDefaultLoop(true); // Resume default loop
          videoRef.current.currentTime = 0; // Reset to start of default loop
          videoRef.current.play();
        }
        return; // Exit to avoid executing default/free logic
      }

      if (currentTime > 32 && !isDefaultLoop) {
        // Activate default loop after 31 seconds
        setIsDefaultLoop(true);
      }

      if (isDefaultLoop) {
        // Default loop logic: Loop between 0 and 27 seconds
        if (currentTime > 27) {
          videoRef.current.currentTime = 0; // Reset to start of default loop
          videoRef.current.play();
        }
      }
    }
  };
  return (
    <div className="interview">
      <Header />

      <div className="container-fluid  min-vh-100">
        <div className="row">
          {isAnsweringTime && (
            <div className="timer">
              <h2>Answer Time Remaining: {timer}s</h2>
              <CountdownTimer duration={60} />
            </div>
          )}

          <>
            <div
              className="card"
              style={{
                marginLeft: "10%",
                width: "500px",
                height: "280px",
                top: "130px",
                background: "none",
                border: "none",
                // position: "absolute",
              }}
            >
              <img
                src={innoview_bot_bg}
                style={{
                  marginLeft: "10%",
                  width: "500px",
                  height: "280px",
                  // top: "130px",
                  position: "absolute",
                  borderRadius: "10px",
                }}
              />
              <aside
                style={{
                  width: "500px",
                  height: "300px",
                  top: "0px",
                  padding: 0,
                  position: "absolute",
                }}
                className="col-lg-6 h-100 d-flex align-items-center"
              >
                <video
                  ref={videoRef}
                  controls={false}
                  autoPlay
                  playsInline
                  style={{
                    marginLeft: "10%",
                    width: "500px",
                    height: "280px",
                    position: "absolute",
                  }}
                  loop={
                    timer > 0
                      ? videoLink == "null"
                        ? false
                        : true
                      : videoLink
                      ? false
                      : false
                  }
                  src={
                    timer > 0
                      ? videoLink == null
                        ? " "
                        : //: "https://res.cloudinary.com/dpfcfb009/video/upload/v1725512137/gapVideo_niuxd1.mp4"
                          "https://res.cloudinary.com/dpfcfb009/video/upload/v1732165590/Interviewer_Live_Response_n6rlf0.mp4"
                      : videoLink == null
                      ? ""
                      : videoLink
                  }
                  //src={gapFillerVideo}
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleTimeUpdate}
                />
              </aside>
            </div>

            <main
              style={{ width: "50%" }}
              className="col-lg-6 h-100  d-flex align-items-center justify-content-center flex-column gap-2 mt-5"
            >
              <div
                className="position-relative aspect-ratio-4/3 w-60 max-w-540px h-100"
                style={{ marginright: "250px", width: "500px", top: "100px" }}
              >
                <DyteParticipantTile
                  participant={meeting.self}
                  className="position-relative aspect-ratio-4/3 w-100 max-w-540px h-100"
                >
                  <DyteRecordingIndicator
                    meeting={meeting}
                    className="position-absolute left-0 top-0 start-0"
                  />
                  <DyteAudioVisualizer
                    participant={meeting.self}
                    size="lg"
                    className="position-absolute top-0 end-0"
                  />
                  <DyteAvatar participant={meeting.self} />
                </DyteParticipantTile>
              </div>
            </main>
          </>

          <div className="container">
            {/* <div className="box">
              <p>{note}</p>
            </div> */}
            {/* <div className="box">
              <h2>Your answers are recording </h2>
              {savedNotes.map((n, index) => (
                <p key={index}>
                  {index + 1} : {n}
                </p>
              ))}
            </div> */}
          </div>
          {/* 
          <div className="card-container">
            <div
              className={`card ${active ? "active" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <p>
                {active
                  ? "Page Activated"
                  : "Please keep your mouse on the box to activate the page."}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
