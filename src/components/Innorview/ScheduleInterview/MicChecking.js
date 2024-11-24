import React, { useEffect, useState } from "react";
import voiceActivityDetection from "voice-activity-detection";

const VoiceActivityMonitor = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const startDetection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log("Stream object:", stream);

        if (!stream || !stream.getAudioTracks().length) {
          throw new Error("No audio tracks available in stream.");
        }

        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        console.log("AudioContext state:", audioContext.state);

        const source = audioContext.createMediaStreamSource(stream);
        voiceActivityDetection(audioContext, source, {
          onVoiceStart: () => setIsSpeaking(true),
          onVoiceStop: () => setIsSpeaking(false),
        });
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startDetection();

    return () => {
      // Cleanup resources if necessary
    };
  }, []);

  return <div>{isSpeaking ? "Speaking" : "Silent"}</div>;
};

export default VoiceActivityMonitor;
