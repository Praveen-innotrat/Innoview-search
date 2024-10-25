import { DyteAvatar, DyteMeeting, DyteSetupScreen,DyteAudioVisualizer, DyteParticipantTile } from '@dytesdk/react-ui-kit';
import { useDyteMeeting } from '@dytesdk/react-web-core';


export default function MyMeetingUI() {
  const { meeting } = useDyteMeeting();

  return (
    <div style={{height: '100vh'}} >
    
    <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={false} participant={meeting.self}> 
    <iframe width="466" height="487" src="https://www.youtube.com/embed/m_-6oy4V5zw" title="FULL MATCH: Roman Reigns vs. Dean Ambrose — WWE World Heavyweight Title Tournament Final Match" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </DyteMeeting>

            {/* <DyteParticipantTile
              participant={meeting.self}
              className="position-relative aspect-ratio-4/3 w-100 max-w-540px h-100"
            >
              <DyteAudioVisualizer
                participant={meeting.self}
                size="lg"
                className="position-absolute top-3 end-3"
              />
              <DyteAvatar participant={meeting.self} />
            </DyteParticipantTile> */}
   
    </div>
    );
}