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

export default function AsyncInterview() {
  const [meeting, initMeeting] = useDyteClient();
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
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [videoLink, setVideoLink] = useState({ width: "50%", height: "auto" });
  const [mute, setMute] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [timer, setTimer] = useState(0);
  const [count, setcount] = useState(0);
  const [isAnsweringTime, setIsAnsweringTime] = useState(false);
  const timerRef = useRef(null);
  const { id } = useParams();

  const gapFillerVideo =
    "https://res.cloudinary.com/dipn71lt0/video/upload/v1719574930/m1kequc0sgtyirrcnzs8.mp4";

  const { meeting } = useDyteMeeting();

  console.log(gapFillerVideo, "gapfiller");
  const mobile_number = Cookies.get("mobile_number");

  const interviewId = localStorage.getItem("interviewId");

  console.log(interviewId, "meeting id");
  //  const interviewId = localStorage.getItem("interviewId");
  // useEffect(() => {
  //   const get = async () => {
  //     const data = { data: interviewId };
  //     const response = await axios.post(
  //       `${API_URLS.InnoviewBaseUrl}/api/meetings/conflicts`,
  //       data,
  //       headers
  //     );
  //     const getRandomElement = (array) =>
  //       array[Math.floor(Math.random() * array.length)];

  //     const getUniqueRandomValues = (values, num) => {
  //       // Shuffle the values array
  //       const shuffled = values.sort(() => 0.5 - Math.random());

  //       // Return the first 'num' unique values
  //       return shuffled.slice(0, num);
  //     };

  //     const values = Object.values(response.data.QuestionText).flat();
  //     console.log(values, "values");
  //     // Get 5 unique random values
  //     const randomValues = getUniqueRandomValues(values, 5);
  //     // const randomValues = Object.values(response.data. QuestionText).map(getRandomElement);
  //     console.log(randomValues);

  //     setVideo(randomValues);
  //     console.log(video);
  //   };
  //   get();
  // }, []);
  useEffect(() => {
    const get = async () => {
      const data = { data: interviewId };
      const response = await axios.post(
        `${API_URLS.InnoviewBaseUrl}/api/meetings/conflicts`,
        data,
        headers
      );
      await meeting.recording.start();
      // Function to get unique random values from a list
      const getUniqueRandomValues = (array, num) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };

      // Flatten the arrays of question IDs
      const allQuestionIds = response.data.QuestionText.flatMap(
        (item) => item[1]
      );

      // Get 5 unique random values
      const randomValues = getUniqueRandomValues(allQuestionIds, 5);

      setVideo(randomValues);
      console.log(randomValues);
    };

    get();
  }, [interviewId]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  useEffect(() => {
    console.log("chk the video is null ");

    const v = async () => {
      if (count == 5 && timer == 0) {
        console.log("no videos", count);

        await setSavedNotes((prevNotes) => [...prevNotes, note]);

        await pageBack();
      }
    };
  }, [count, timer]);

  useEffect(() => {
    socket.current = io(`${API_URLS.InnoviewBaseUrl}`); // Adjust the URL if needed

    function requestVideoLink(key) {
      socket.current.emit("requestVideo", key);
    }
    requestVideoLink(video[count]);
    // requestVideoLink(count);
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

  const handleSaveNote = () => {
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
    // Stop the camera
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      console.log("Camera stopped");
    } else {
      console.log("No media stream found.");
    }

    console.log(data);
    const response = await axios.post(
      `${API_URLS.InnoviewBaseUrl}/api/interview/answers`,
      data,
      headers
    );
    console.log(response.data);
    meeting.self.disableVideo();
    meeting.self.disableAudio();
    await meeting.recording.stop();
    // const authToken = id;
    navigate("/interview-details");
  };
  // const active = useDyteSelector((m) => m.participants.active).toArray();

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
          <aside className="col-lg-6 h-100 d-flex align-items-center mt-5">
            <video
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
                    : "https://res.cloudinary.com/dipn71lt0/video/upload/v1719574930/m1kequc0sgtyirrcnzs8.mp4"
                  : videoLink == null
                  ? ""
                  : videoLink
              }
              onEnded={handleVideoEnded}
              style={{
                borderRadius: "20px",
                marginLeft: "250px",
                width: "500px",
                height: "300px",
              }}
            />
          </aside>

          <main className="col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column gap-2 mt-5">
            <div
              className="position-relative aspect-ratio-4/3 w-60 max-w-540px h-100"
              style={{ marginright: "250px", width: "500px" }}
            >
              <DyteParticipantTile
                participant={meeting.self}
                className="position-relative aspect-ratio-4/3 w-100 max-w-540px h-100"
              >
                <DyteRecordingIndicator
                  meeting={meeting}
                  className="position-absolute left-1 top-1"
                />
                <DyteAudioVisualizer
                  participant={meeting.self}
                  size="lg"
                  className="position-absolute top-3 end-3"
                />
                <DyteAvatar participant={meeting.self} />
              </DyteParticipantTile>
            </div>
          </main>
          <div className="container">
            <div className="box">
              <p>{note}</p>
            </div>
            <div className="box">
              <h2>Your answers are recording </h2>
              {savedNotes.map((n, index) => (
                <p key={index}>
                  {index + 1} : {n}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
