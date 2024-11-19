import { DyteAvatar, DyteMeeting, DyteSetupScreen,DyteAudioVisualizer, DyteParticipantTile } from '@dytesdk/react-ui-kit';
import { useDyteMeeting } from '@dytesdk/react-web-core';


export default function AsyncMeetingUI() {
  const { meeting } = useDyteMeeting();

  return (
   
    <div style={{width:"500px", height:"500px"}}>
        <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={false} >

        </DyteMeeting>
    </div>

    );
}