import React, { useEffect } from "react";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import AsyncMeetingUI from "./AsyncMeetingUI";

export default function AsyncMeeting() {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    initMeeting({
      authToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6ImE3ZjY4MmNlLTFmYzMtNDA5MC1iODhiLWU4NGRhYmFhNTU2NyIsIm1lZXRpbmdJZCI6ImJiYjViNTM2LWMxNTgtNDQ4Mi04YTY3LTQyMGQzNzU4YWU2MSIsInBhcnRpY2lwYW50SWQiOiJhYWE1OWU0ZS01MzYzLTQ0MzQtOTIzZS02YzllOTA2YWQ2NGYiLCJwcmVzZXRJZCI6IjgyYTdlZDhjLWZlOTAtNDcyMC05NjI3LWUzN2VjMjJkZDJiMCIsImlhdCI6MTcxNTUwMjM3NywiZXhwIjoxNzI0MTQyMzc3fQ.UyYloFtc9DLMGnXWTNfKT9UN4Gcmx9GGmJi_igFiRcvYr_7_TfUsMamDj4TcxEBK3xaPkrrfYxGvCP2ii1L26_0TURUuAckN9NkTBCRtW9M6dX5WoS_ST80v24wW5hX5srgnKtmXlix097b2xvMSnRlqnZ6klg9s4tHclh9Dfkz-8PK2XKESMMYsaHdmuwRaZe7RcMhTMn5Chr3GNIaE2M1n2Derr3j3jpj99MtLuv-WnF7ABQRYdeIIQ1O53FZhL48BdBdP6BukdL0Ay87PFOU-8DkFkhZjF8Jr-xBHna8tmFJfBn8pbsk5gGLHRjY1tafvXQ-paSOuRuVZRTfpjA",
      defaults: {
        audio: true,
        video: true,
      },
    });

    // initMeeting1({
    //   authToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6ImE3ZjY4MmNlLTFmYzMtNDA5MC1iODhiLWU4NGRhYmFhNTU2NyIsIm1lZXRpbmdJZCI6ImJiYjZkOGQyLWI2ZTItNDJlOS1hYmFkLTljNDZiZjQzOTI3NCIsInBhcnRpY2lwYW50SWQiOiJhYWEzMjY0NC1hMzQ3LTQwM2MtYmI5ZS1lOGQ5MDdlYWQyMjkiLCJwcmVzZXRJZCI6Ijg5ZDE3NmY5LTJiYzktNDA1Mi04NzY0LTZhNjU1OWU4OGVlMCIsImlhdCI6MTcxMzk0OTExOCwiZXhwIjoxNzIyNTg5MTE4fQ.XBgxongcXdwqSDohA-RlngKQk_UaIlcq7DwbEUSCKZFGV7-rucPxeiWkLUdSNuAhDOjQChwrvnEjHpIn-tpG7AEWCJ2G3r7l63QoRD5G8oBoxuIAkunUXxFtl4SAJVCoJ4v5XHlk_Ga2oqTc8Dv2tjLN5q2En9QuzR6iQcCKqZAcU-E4sy85vy4D6uZnGG5ObSRkpmJH2N-AE46TtyWKJJYou7nP1cDJTZz9KFkYx5BZ9pa7PcJVtZ3R-RgxKWHA5r0-XrSnpLf5i8YIhoooCEJVzk-OwUiELC0KVfC2r1NbjJSVuYUDH22f3bAwqcL4u-ScbimQLxMvD03V38f48Q",
    //   defaults: {
    //     audio: false,
    //     video: false,
    //   },
    // });
  }, []);

  return (
    <div>
      <DyteProvider value={meeting}>
        <AsyncMeetingUI />
      </DyteProvider>
    </div>
  );
}
