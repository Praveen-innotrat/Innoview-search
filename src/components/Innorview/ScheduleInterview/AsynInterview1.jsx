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

export default function AsyncInterview() {
  const [meeting, initMeeting] = useDyteClient();
  const { id } = useParams();

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
  const [videoLink, setVideoLink] = useState();
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

  useEffect(() => {
    handleListen();
  }, [isListening]);

  useEffect(() => {
    console.log("chk the video is null ");
    if (count == 1) {
      console.log("no videos", count);
      pageBack();
    }
  }, [count]);

  useEffect(() => {
    socket.current = io("https://socket-io-backend-wvgb.onrender.com");
    // socket.current = io("http://localhost:3006");

    socket.current.on("videoLink", (newVideoLink) => {
      setVideoLink(newVideoLink);
      setMute(true);
      setIsAnsweringTime(false);
      clearInterval(timerRef.current);
      setTimer(0);
    });

    socket.current.emit("initialVideoRequest");

    return () => {
      clearInterval(timerRef.current);
      socket.current.disconnect();
      stopMeeting();
    };
  }, []);

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
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  const startAnsweringTime = () => {
    setIsAnsweringTime(true, () => {
      setSavedNotes([...savedNotes, note]);
      setNote("");
    });
    setIsListening(true);
    setMute(false);
    setTimer(60);

    const c = count;
    setcount(c + 1);
    console.log(count);

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          setIsListening(false);
          socket.current.emit("nextVideoRequest");

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

  const interviewId = localStorage.getItem("interviewId");
  console.log(interviewId, "interview id");
  console.log(videoLink, "Video link");

  const mediaStreamRef = useRef(null);

  // const pageBack = async () => {
  //   console.log("i m from pageback ");
  //   console.log(savedNotes, "savednotes");
  //   const data = {
  //     interviewId: interviewId,
  //     answers: savedNotes,
  //   };
  //   // Stop the camera
  //   if (mediaStreamRef.current) {
  //     mediaStreamRef.current.getTracks().forEach((track) => track.stop());
  //     mediaStreamRef.current = null;
  //     console.log("Camera stopped");
  //   } else {
  //     console.log("No media stream found.");
  //   }

  //   console.log(data);
  //   const response = await axios.post(
  //     "http://localhost:4000/api/interview/answers",
  //     data,
  //     headers
  //   );
  //   console.log(response.data);
  //   // meeting.self.stop();
  //   const authToken = id;
  //   navigate("/interview-details");
  // };

  const pageBack = async () => {
    console.log("i m from pageback ");
    console.log(savedNotes, "savednotes");

    // Stop the meeting to turn off the camera
    // stopMeeting();
    // Ensure the camera and audio are turned off before navigating
    if (meeting && meeting.self) {
      // Stop all media tracks
      if (meeting.self.localAudioTrack) {
        const audioStream = meeting.self.localAudioTrack.stream;
        if (audioStream) {
          audioStream.getTracks().forEach((track) => track.stop());
        }
      }
      if (meeting.self.localVideoTrack) {
        const videoStream = meeting.self.localVideoTrack.stream;
        if (videoStream) {
          videoStream.getTracks().forEach((track) => track.stop());
        }
      }

      // Disconnect from the meeting if possible
      if (meeting.disconnect) {
        meeting.disconnect(); // Ensure this method exists
      }
    }

    const data = {
      interviewId: interviewId,
      answers: savedNotes,
    };
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/interview/answers",
        data,
        headers
      );
      console.log(response.data);

      // Navigate to the next page after stopping the meeting
      const authToken = id;
      navigate("/interview-details");
    } catch (error) {
      console.error("Error submitting interview answers:", error);
    }
  };

  const active = useDyteSelector((m) => m.participants.active).toArray();

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

// import React from "react";
// import {
//   DyteAudioVisualizer,
//   DyteAvatar,
//   DyteParticipantTile,
//   DyteRecordingIndicator,
// } from "@dytesdk/react-ui-kit";
// import {
//   DyteProvider,
//   useDyteClient,
//   useDyteMeeting,
//   useDyteSelector,
// } from "@dytesdk/react-web-core";
// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import Header from "../../Header/Header";
// import "./AsyncInterview.css";
// import io from "socket.io-client";
// import CountdownTimer from "./CountdownTimer";

// export default function AsyncInterview() {
//   const [meeting, initMeeting] = useDyteClient();
//   const { id } = useParams();

//   useEffect(() => {
//     const authToken = id;

//     if (!authToken) {
//       return alert("authToken was not passed");
//     }

//     initMeeting({
//       authToken,
//       defaults: {
//         audio: true,
//         video: true,
//       },
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     console.log({ initMeeting });
//   }, [initMeeting]);

//   return (
//     <>
//       <DyteProvider value={meeting}>
//         <Interview />
//       </DyteProvider>
//     </>
//   );
// }

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();

// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = "en-IN";

// function Interview() {
//   const socket = useRef(null);

//   const [videoLink, setVideoLink] = useState("");
//   const [mute, setMute] = useState(true);
//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState(null);
//   const [savedNotes, setSavedNotes] = useState([]);
//   const [timer, setTimer] = useState(0);
//   const [isAnsweringTime, setIsAnsweringTime] = useState(false);
//   const timerRef = useRef(null);

//   const gapFillerVideo = "https://res.cloudinary.com/dipn71lt0/video/upload/v1719574930/m1kequc0sgtyirrcnzs8.mp4";

//   useEffect(() => {
//     handleListen();
//   }, [isListening]);

//   useEffect(() => {
//     socket.current = io("https://socket-io-backend-wvgb.onrender.com");
//     socket.current.on("videoLink", (newVideoLink) => {
//       console.log("Received new video link from socket:", newVideoLink);
//       setVideoLink(newVideoLink);

//       setMute(true);
//       setIsAnsweringTime(false);
//       clearInterval(timerRef.current);
//       setTimer(0);
//     });

//     socket.current.emit("initialVideoRequest");

//     return () => {
//       clearInterval(timerRef.current);
//       socket.current.disconnect();
//     };
//   }, []);

//   const handleListen = () => {
//     if (isListening) {
//       mic.start();
//       mic.onend = () => {
//         console.log("continue..");
//         mic.start();
//       };
//     } else {
//       mic.stop();
//       mic.onend = () => {
//         handleSaveNote();
//         console.log("Stopped Mic on Click");
//       };
//     }
//     mic.onstart = () => {
//       console.log("Mics on");
//     };

//     mic.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((result) => result[0])
//         .map((result) => result.transcript)
//         .join("");
//       console.log("Transcription result:", transcript);
//       setNote(transcript);
//       mic.onerror = (event) => {
//         console.log(event.error);
//       };
//     };
//   };

//   const handleSaveNote = () => {
//     setSavedNotes([...savedNotes, note]);
//     setNote("");
//   };

//   const startAnsweringTime = () => {
//     setIsAnsweringTime(true);
//     setSavedNotes([...savedNotes, note]);
//     setNote("");
//     setIsListening(true);
//     setMute(false);
//     setTimer(60);

//     timerRef.current = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer <= 1) {
//           clearInterval(timerRef.current);
//           setIsListening(false);
//           socket.current.emit("nextVideoRequest");
//           setIsAnsweringTime(false);
//           return 0;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleVideoEnded = () => {
//     console.log("Primary video ended, starting answering time...");
//     startAnsweringTime();
//   };

//   const active = useDyteSelector((m) => m.participants.active).toArray();

//   const { meeting } = useDyteMeeting();

//   return (
//     <div className="interview">
//       <Header />

//       <div className="container-fluid min-vh-100">
//         <div className="row">
//           {isAnsweringTime && (
//             <div className="timer">
//               <h2>Answer Time Remaining: {timer}s</h2>
//               <CountdownTimer duration={60} />
//             </div>
//           )}
//           <aside className="col-lg-6 h-100 d-flex align-items-center mt-5">
//             <video
//               controls={false}
//               autoPlay
//               playsInline
//               loop={isAnsweringTime}
//               src={isAnsweringTime ? gapFillerVideo : videoLink}
//               style={{ borderRadius: "20px" }}
//             />
//           </aside>

//           <main className="col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column gap-2 mt-5">
//             <div className="position-relative aspect-ratio-4/3 w-100 max-w-540px h-100">
//               <DyteParticipantTile
//                 participant={meeting.self}
//                 className="position-relative aspect-ratio-4/3 w-100 max-w-540px h-100"
//               >
//                 <DyteRecordingIndicator
//                   meeting={meeting}
//                   className="position-absolute left-1 top-1"
//                 />
//                 <DyteAudioVisualizer
//                   participant={meeting.self}
//                   size="lg"
//                   className="position-absolute top-3 end-3"
//                 />
//                 <DyteAvatar participant={meeting.self} />
//               </DyteParticipantTile>
//             </div>
//           </main>
//           <div className="container">
//             <div className="box">
//               <p>{note}</p>
//             </div>
//             <div className="box">
//               <h2>Notes</h2>
//               {savedNotes.map((n, index) => (
//                 <p key={index}>
//                   {index + 1} : {n}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
