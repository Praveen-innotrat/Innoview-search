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
    console.log(meeting, "meeting");
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

  const gapFillerVideo =
    "https://res.cloudinary.com/dpfcfb009/video/upload/v1725512137/gapVideo_niuxd1.mp4";

  const { meeting } = useDyteMeeting();
  const mobile_number = Cookies.get("mobile_number");

  const interviewId = localStorage.getItem("interviewId");

  // console.log(interviewId, "meeting id");673efbaba91cc4b83ad7424e

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
        console.log("Socket disconnected on unmount");
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
        console.log("Tab is visible again");
      }
    };
    if (tabSwitchCount > 1) {
      navigate("/interview-details");
      // socket.current.disconnect();

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
    });

    // socket.current.emit("initialVideoRequest");

    return () => {
      clearInterval(timerRef.current);
      socket.current.disconnect();
      stopMeeting();
    };
  }, [video]);

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
    // console.log(response.data);

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
    meeting.recording.stop();
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
                        : "https://res.cloudinary.com/dpfcfb009/video/upload/v1725512137/gapVideo_niuxd1.mp4"
                      : videoLink == null
                      ? ""
                      : videoLink
                  }
                  onEnded={handleVideoEnded}
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
        </div>
      </div>
    </div>
  );
}
