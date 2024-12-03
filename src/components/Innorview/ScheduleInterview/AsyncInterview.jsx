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
  const { id } = useParams();
  console.log(id, "auth_id");
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
    // console.log({ initMeeting });
    // console.log(meeting, "meeting");
    if (!meeting) {
      return;
    }
    meeting.join();
    window.meeting = meeting;
  }, [meeting]);

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
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [videoLink, setVideoLink] = useState({ width: "50%", height: "auto" });
  const [mute, setMute] = useState(true);

  const [isListening, setIsListening] = useState(false);
  const [isListeningSocket, setIsListeningSocket] = useState(false);
  const [note, setNote] = useState(null);
  const [noteSocket, setNoteSocket] = useState(null);
  const [questionId, setQuestionId] = useState();
  const [savedNotes, setSavedNotes] = useState([]);
  const [timer, setTimer] = useState(0);
  const [count, setcount] = useState(0);
  const [isAnsweringTime, setIsAnsweringTime] = useState(false);
  const timerRef = useRef(null);
  const [active, setActive] = useState(false);
  const { id } = useParams();
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  // console.log(isListeningSocket, noteSocket, "note");
  const socketRef = useRef(null); // Use useRef to keep WebSocket persistent

  const [isRepeat, setIsRepeat] = useState(false);
  console.log(isRepeat, "repeat");

  //Aarthi's changes
  const videoRef = useRef(null);
  const [customRange, setCustomRange] = useState(null);
  const [isDefaultLoop, setIsDefaultLoop] = useState(false);
  //
  console.log(videoLink, "videoLink");
  const gapFillerVideo =
    "https://res.cloudinary.com/dpfcfb009/video/upload/v1732165590/Interviewer_Live_Response_n6rlf0.mp4";

  const { meeting } = useDyteMeeting();
  const mobile_number = Cookies.get("mobile_number");

  const interviewId = localStorage.getItem("interviewId");

  // console.log(interviewId, "meeting id");673efbaba91cc4b83ad7424e

  useEffect(() => {
    if (meeting && meeting.recording) {
      const recordingState = meeting.recording.state;

      console.log("Recording State:", recordingState);

      if (recordingState === "NOT_RECORDING") {
        meeting.recording
          .start()
          .then(() => console.log("Recording started successfully"))
          .catch((error) => console.error("Error starting recording:", error));
      } else {
        console.warn("Cannot start recording: Current state:", recordingState);
      }
    }
  }, [meeting]);

  //Aarthi's change
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

  //Aarthi's changes
  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      // console.log("Connected to the WebSocket server");
    };

    // Listen for messages from the WebSocket
    // console.log("BEfore listen:::");
    ws.onmessage = ({ data }) => {
      // console.log("After listen:::");
      try {
        // Check if data is valid and parse it
        if (!data || typeof data !== "string") {
          console.error("Invalid data received from socket:", data);
          return;
        }

        const parsedData = JSON.parse(data); // Parse the JSON string
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
        console.log("videos", videoRef.current);
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
  //

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

        console.log(videoArray, "videos"); // Output array with introVideo, random values, and endVideo

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
    // Initialize the socket connection
    socket.current = io(`${API_URLS.InnoviewBaseUrl}`); // Adjust the URL if needed

    // Listen for browser navigation (back/forward)
    const handleNavigation = async () => {
      if (socket.current) {
        socket.current.disconnect();
        stopMeeting();
      }
    };

    // Listen to `popstate` (browser back/forward)
    window.addEventListener("popstate", handleNavigation);

    // Listen to `beforeunload` (page refresh or close)
    window.addEventListener("beforeunload", handleNavigation);

    // Cleanup on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        // console.log("Socket disconnected on unmount");
      }
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("beforeunload", handleNavigation);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is switched (hidden)
        setTabSwitchCount((prevCount) => prevCount + 1);

        Swal.fire({
          title: "Warning!",
          text: "You switched tabs! Please focus on the test. This is your last warning.",
          icon: "warning",
          confirmButtonText: "I Understand",
          allowOutsideClick: false,
        });
      } else {
        // console.log("Tab is visible again");
      }
    };
    if (tabSwitchCount > 3) {
      navigate("/interview-details");
      // socket.current.disconnect();

      window.location.reload();
    }

    const handleBeforeUnload = (event) => {
      // console.log("sxdcfgvhujikoljh");
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
    const v = async () => {
      if (count == 8 && timer == 0) {
        // console.log("no videos", count);

        await setSavedNotes((prevNotes) => [...prevNotes, note]);

        await pageBack();
      }
    };
    v();
  }, [count, timer]);

  useEffect(() => {
    if (isRepeat && videoRef.current && videoRef.current.src !== videoLink) {
      try {
        videoRef.current.src = videoLink;
        videoRef.current.load();

        videoRef.current.oncanplay = () => {
          videoRef.current
            .play()
            .then(() => console.log("Video restarted successfully"))
            .catch((error) => console.error("Error playing video:", error));
          setIsRepeat(false);
        };
      } catch (error) {
        console.error("Error restarting video:", error);
      }
    }
  }, [isRepeat, videoLink]);

  useEffect(() => {
    socket.current = io(`${API_URLS.InnoviewBaseUrl}`); // Adjust the URL if needed

    function requestVideoLink(key) {
      console.log(key, "key");
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

  const startAnsweringTime = () => {
    setIsAnsweringTime(true, () => {
      setSavedNotes((prevNotes) => [...prevNotes, note]); // Save the current note
      setNote(""); // Reset the input note
      setNoteSocket(null);
    });

    // Activate listening states
    setIsListening(true);
    setIsListeningSocket(true);
    setMute(false);
    setTimer(60); // Initialize the timer to 60 seconds

    const updatedCount = count + 1;
    setcount(updatedCount);

    // Timer logic
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current); // Stop the timer
          setIsListening(false); // End listening
          setIsListeningSocket(false);

          // Emit a request for the next video link based on the updated count
          const requestVideoLink = (key) => {
            console.log(key, "videos");
            if (socket.current) {
              socket.current.emit("requestVideo", key);
            }
          };

          requestVideoLink(video[updatedCount]); // Request the next video
          return 0; // Ensure timer stops at 0
        }
        return prevTimer - 1; // Decrement timer
      });
    }, 1000); // Update every second
  };

  // WebSocket connection setup
  // WebSocket connection setup
  useEffect(() => {
    if (isListeningSocket) {
      // Establish WebSocket connection
      socketRef.current = new WebSocket("ws://localhost:8765");

      socketRef.current.onopen = () => {
        // console.log("Connected to WebSocket server.");
      };

      socketRef.current.onmessage = (event) => {
        try {
          // Parse the incoming WebSocket message
          const parsedData = JSON.parse(event.data); // Parse the JSON string
          console.log(parsedData, "repeat");

          const { start, stop } = parsedData;

          if (start === undefined || stop === undefined) {
            console.error(
              "Missing start or stop in received data:",
              parsedData
            );
            return;
          }

          const newStartTime = parseFloat(start); // Convert start time to a number
          const newEndTime = parseFloat(stop) + 1; // Convert stop time to a number

          if (!isNaN(newStartTime) && !isNaN(newEndTime)) {
            setCustomRange({ start: newStartTime, stop: newEndTime });
            console.log("New start:", newStartTime);
            console.log("EndTime:", newEndTime);
            setIsDefaultLoop(false); // Turn off loop for custom range
          }

          // Update video playback if necessary
          if (videoRef.current && videoRef.current.src === gapFillerVideo) {
            console.log("Update start time");
            videoRef.current.currentTime = newStartTime; // Jump to the new start time
            videoRef.current.play(); // Ensure playback starts
          }

          // Check for specific start and stop times
          if (parsedData.start === 29 && parsedData.stop === 31) {
            console.log("Setting isRepeat to true");
            setIsRepeat(true); // Trigger video restart
            setIsListening(false); // Stop listening for WebSocket messages
            setTimer(60); // Set the timer to 60 (or whatever your logic is for the restart)
            setNote(null); // Clear previous note
            setNoteSocket(null); // Clear socket-related note if needed
            setMute(true); // Set mute state if necessary
            setIsAnsweringTime(false); // Reset answering time state
            clearInterval(timerRef.current); // Clear previous timer
            setTimer(0); // Reset timer to 0
            setCustomRange(null); // Clear any custom range
            setIsDefaultLoop(false); // Reset loop setting
          }
        } catch (error) {
          console.error("Error parsing data from socket:", event.data, error);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      // Cleanup on unmount or when WebSocket disconnects
      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [isListeningSocket]);

  // Handle microphone listening and sending data
  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        mic.start(); // Keep the microphone running for continuous recognition
      };
    } else {
      mic.stop();
      mic.onend = () => {
        handleSaveNote(); // Stop and save the note
      };
    }

    mic.onstart = () => {
      console.log("Microphone started");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(" ");

      // Update the transcript state (plain transcript without timestamps)
      setNote(transcript);

      // Send each word with its timestamp to WebSocket server
      const currentTime = videoRef.current.currentTime;
      const wordsWithTimer = transcript.split(" ").map((word, index) => {
        return {
          word,
          timerValue: currentTime, // Adjust this based on your actual logic for 'timer'
        };
      });

      // Send each word with timer as a JSON object to the WebSocket server
      wordsWithTimer.forEach((wordWithTimer, idx) => {
        if (
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        ) {
          socketRef.current.send(JSON.stringify(wordWithTimer)); // Send the word and its timer as a JSON object
          console.log("Sent word:", wordWithTimer);

          // Clear `noteSocket` after sending the last word
          if (idx === wordsWithTimer.length - 1) {
            setTimeout(() => {
              setNoteSocket(null); // Clear after all words are sent
            }, 100);
          }
        } else {
          console.error(
            "WebSocket is not open. Failed to send word:",
            wordWithTimer
          );
        }
      });
    };

    mic.onerror = (event) => {
      console.error(event.error);
    };
  };

  // ws://localhost:8765

  const handleSaveNote = async () => {
    try {
      setQuestionId(video[count]);

      const data1 = {
        question_id: questionId,
      };

      // Check for introVideo or endVideo
      if (
        data1.question_id === "introVideo" ||
        data1.question_id === "endVideo"
      ) {
        return; // Exit early for introVideo or endVideo
      }

      // First API call: Fetch question details
      const getdata = await axios.post(
        "https://api2.innotrat.in/api/question",
        data1
      );

      // Second API call: Evaluate the user response
      const data2 = {
        user_response: note,
        question_id: questionId,
      };

      const get1 = await axios.post(
        "https://api2.innotrat.in/api/evaluate",
        data2
      );

      // Third API call: Update the interview data
      const data3 = {
        question_id: questionId,
        question_text: getdata.data.question_text,
        similarity_percentage: get1.data.similarity_percentage,
        interviewId: interviewId,
        answers: note,
      };

      const response = await axios.post(
        `${API_URLS.InnoviewBaseUrl}/api/interview/update`,
        data3,
        headers
      );

      // Save note locally if it exists
      if (note) {
        setSavedNotes((prevNotes) => [...prevNotes, note]);
        setNote("");
        setNoteSocket(null);
      }
    } catch (error) {
      console.error("Error in handleSaveNote:", error);
    }
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

  const mediaStreamRef = useRef(null);

  const pageBack = async () => {
    // console.log("i m from pageback ");
    // console.log(savedNotes, "savednotes");
    const data = {
      interviewId: interviewId,
      answers: savedNotes,
    };

    // console.log(data);
    const response = await axios.post(
      `${API_URLS.InnoviewBaseUrl}/api/interview/answers`,
      data,
      headers
    );
    // console.log(response.data);
    meeting.self.disableVideo();
    meeting.self.disableAudio();
    meeting.recording.stop();
    // const authToken = id;

    const handleBeforeUnload = (event) => {
      // console.log("sxdcfgvhujikoljh");
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

  return (
    <div className="async-interview">
      <Header />

      <div className="async-interview-content">
        {/* Timer Section */}
        {isAnsweringTime && (
          <div className="async-timer-wrapper">
            <h2 className="async-timer-title">
              Answer Time Remaining: {timer}s
            </h2>
            <CountdownTimer duration={60} />
          </div>
        )}

        {/* Interview Cards */}
        <div className="async-card-section">
          <div className="async-video-card">
            <img
              src={innoview_bot_bg}
              alt="Bot Background"
              className="async-video-bg"
            />
            <video
              className="async-video-player"
              ref={videoRef}
              controls={false}
              autoPlay
              playsInline
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
                      gapFillerVideo
                  : videoLink == null
                  ? ""
                  : videoLink
              }
              //src={gapFillerVideo}
              onEnded={handleVideoEnded}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>

          <main className="async-participant-section">
            <div className="async-participant-tile">
              <DyteParticipantTile
                className="DyteParticipantTile"
                participant={meeting.self}
              >
                <DyteRecordingIndicator
                  meeting={meeting}
                  className="async-recording-indicator"
                />
                <DyteAudioVisualizer
                  participant={meeting.self}
                  size="lg"
                  className="async-audio-visualizer"
                />
                <DyteAvatar participant={meeting.self} />
              </DyteParticipantTile>
            </div>
          </main>
        </div>

        {/* Response Section */}
        <div className="async-response-section">
          <div className="async-response-title">
            <strong>Your Response Speech to Text</strong>
          </div>
          <div className="async-response-content">
            <div className="response-ans">{note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
