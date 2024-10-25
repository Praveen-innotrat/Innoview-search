import React, { useState } from "react";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import "react-internet-meter/dist/index.css";

const App = () => {
  const [wifiSpeed, setWifiSpeed] = useState(null);

  return (
    <div>
      <h1>Internet Speed Test</h1>
      <ReactInternetSpeedMeter
        txtSubHeading="Internet is too slow"
        outputType="alert"
        customClassName={null}
        txtMainHeading="Oops..."
        pingInterval={4000}
        thresholdUnit="megabyte"
        threshold={100}
        imageUrl="https://via.placeholder.com/150"
        downloadSize="1781287"
        callbackFunctionOnNetworkDown={(speed) =>
          console.log(`Internet speed is down ${speed}`)
        }
        callbackFunctionOnNetworkTest={(speed) => setWifiSpeed(speed)}
        fallbackImageUrl="https://via.placeholder.com/150/ff0000/000000?text=Error" // Fallback image URL
      />

      {wifiSpeed && <p>Current WiFi Speed: {wifiSpeed} Mbps</p>}
    </div>
  );
};

export default App;
