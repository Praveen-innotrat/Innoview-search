import React, { useState } from "react";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import "react-internet-meter/dist/index.css";
import Header from "../../Header/Header";
import ScheduleForm from "./ScheduleForm";
const App = () => {
  const [wifiSpeed, setWifiSpeed] = useState(null);

  // The console.log here won't log immediately as the speed is updated by the component later.
  // console.log(wifiSpeed, "wifi"); // This runs during every render, not when speed changes.

  return (
    <div className="schedule-interview-tab">
      <Header />
      <h3>Please Schedule your Interview</h3>
      <div className="form-section">
        <ScheduleForm />
      </div>
      {/* <ReactInternetSpeedMeter
        txtSubHeading="Your internet connection seems slow!"
        txtMainHeading="Checking your speed..."
        outputType="alert"
        pingInterval={4000} // Time interval between each ping
        thresholdUnit="megabyte" // Unit of the threshold (MB)
        threshold={100} // Speed threshold in MB
        imageUrl="https://via.placeholder.com/150"
        downloadSize="1781287" // Download size for the speed test
        callbackFunctionOnNetworkDown={(speed) =>
          console.log(`Internet speed is down: ${speed} Mbps`)
        }
        callbackFunctionOnNetworkTest={(speed) => {
          setWifiSpeed(speed);
          console.log(`wifi : ${speed} Mbps`); // Log speed when it's updated
        }}
        fallbackImageUrl="https://via.placeholder.com/150/ff0000/000000?text=Error"
      />

      {wifiSpeed !== null ? (
        <p>Current Internet Speed: {wifiSpeed} Mbps</p>
      ) : (
        <p>Testing your internet speed...</p>
      )} */}
    </div>
  );
};

export default App;
