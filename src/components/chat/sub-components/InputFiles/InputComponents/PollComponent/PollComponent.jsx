// PollComponent.js
import React, { useState } from "react";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import CreatePollPopup from "./CreatePollPopup";

const PollComponent = ({ onSubmit }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    // setIsPopupOpen(false);
    // isPopupOpen && setIsPopupOpen(false);
    setIsPopupOpen((prev)=>!prev)

    console.log(isPopupOpen);
    // setIsPopupOpen(false);
    // console.log(isPopupOpen);
  };

  const handlePollDataSubmit = (pollData) => {
    // Call the parent component's function to submit the poll data
    onSubmit(pollData);
    // Close the pop-up after submitting
  };

  return (
    <div className="input-file-item" onClick={handleOpenPopup}>
      <div className="input-file-icon">
        <InsertChartIcon fontSize="large" />
      </div>
      <div>
        <label>
          Poll
          {isPopupOpen && (
            <CreatePollPopup
              onClose={handleClosePopup}
              onSubmit={handlePollDataSubmit}
            />
          )}
        </label>
      </div>
    </div>
  );
};

export default PollComponent;









// import React, { useState } from "react";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import CreatePollPopup from "./CreatePollPopup";

// const PollComponent = ({ onFilesSelect }) => {
//   const [isPopupOpen, setPopupOpen] = useState(false);

//   const handleOpenPopup = () => {
//     setPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//   };

//   const handlePollDataSubmit = (pollData) => {
//     // Call the parent component's function to submit the poll data
//     onFilesSelect(pollData);
//     // Close the pop-up after submitting
//     setPopupOpen(false);
//   };

//   return (
//     <div className="input-file-item" onClick={handleOpenPopup}>
//       <div className="input-file-icon">
//         <InsertChartIcon fontSize="large" />
//       </div>
//       <div>
//         <label>
//           Poll
//           {isPopupOpen && (
//             <CreatePollPopup onClose={handleClosePopup} onFilesSelect={handlePollDataSubmit} />
//           )}
//         </label>
//       </div>
//     </div>
//   );
// };

// export default PollComponent;
