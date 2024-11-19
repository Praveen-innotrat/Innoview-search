import React, { useEffect } from "react";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import AdminMeetingUI from "./AdminMeetingUI";

export default function AdminMeeting() {

  const [meeting, initMeeting] = useDyteClient();
  

  useEffect(() => {
    initMeeting({
      authToken:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6ImE3ZjY4MmNlLTFmYzMtNDA5MC1iODhiLWU4NGRhYmFhNTU2NyIsIm1lZXRpbmdJZCI6ImJiYjI0MzFhLTMzNTAtNGVlNC04ZDZiLTVlOTRmZTgyYTcyNCIsInBhcnRpY2lwYW50SWQiOiJhYWFiNWRmZi01ZWY4LTQyNmYtYTAwYS1lNmY3YjAzODhkNzciLCJwcmVzZXRJZCI6Ijg5ZDE3NmY5LTJiYzktNDA1Mi04NzY0LTZhNjU1OWU4OGVlMCIsImlhdCI6MTcxNTE2OTkwOCwiZXhwIjoxNzIzODA5OTA4fQ.pbZD_m-FOM6eEBkSLypXlRcTVUbAqmUHiWJ0USNBseADIvvokVIOyYozd8P8tQXY0ISJpBNkn3RB4TbtG8yx4D6755GKqlHCkdeUTVltas-VJ3QkuSUxsn6Dlz_WJ9qSQnUhYSKDWgZBhtMqqIG3I3ugemUQoLYU_6EUpuS7sV6IgakLrmtGdQFRqR3AeHx6kO-2R8hzqeUQbO5Ldetqvm7ID0OrqgSiBI-NcdFHqe4Xk6sJNAltW3Nca3eY1g9YK9cLZ6lKX8bACKtFzaXLVxKlN9BxqkRYkcMqQxR0iu-WWj5Q2sJMXAp2jSEwKnJlzUMu8KBSYYd3YbJWceTaQg",
      // authToken:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6ImE3ZjY4MmNlLTFmYzMtNDA5MC1iODhiLWU4NGRhYmFhNTU2NyIsIm1lZXRpbmdJZCI6ImJiYmRmMTJkLTI2MDYtNDk3OS04YTUyLWJkNWViNzlmYTk0MyIsInBhcnRpY2lwYW50SWQiOiJhYWE2NDY2NS03M2IzLTRjMmMtOGExNC02ZTZlNDU2ZWUwOTQiLCJwcmVzZXRJZCI6Ijg5ZDE3NmY5LTJiYzktNDA1Mi04NzY0LTZhNjU1OWU4OGVlMCIsImlhdCI6MTcxNDQ2MDI2OCwiZXhwIjoxNzIzMTAwMjY4fQ.RpgTGfD86PICA_pFx-6CPuBGVfeqY0PnBTUw6trehywI3ENVlx3H01WV5LoidzcJzn2EgF4OojxtUKCRjrf1JW2KkmGfuX4Pa5X_yp5ZD47HcuLtOr46s_tOvP9KxPMRqFRiFBN_JiCyZGK4B0b_TuvE8-AzjJ5Zc1BInesgmPkM3d9ToJr3iR9DOmzXlKjbJMkLCyjB67AnfsoQhaUbNpL-pnlLFvt1PYwMFBzv3j_TczxnfSZ1LBuv9QRTma6Ufs76R1S1Pwg7gZ5xvUHvzNI3-Y1-sPvnHjT_1felQ-GLhwq2lu3q46uCtOM8FXEXk8qdna5gdvVSGrFthbNrPg",
      defaults: {
        audio: false,
        video: false,
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
        <AdminMeetingUI />
      </DyteProvider>
    </div>
  );
}
