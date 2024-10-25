// InputFiles.js
import React, { useRef, useState } from "react";
import "./InputFiles.css";
// import CreatePollPopup from "./CreatePollPopup";
import ImagesVideosComponent from "./InputComponents/ImagesVideosComponent/ImagesVideosComponent";
import DocumentsComponent from "./InputComponents/DocumentsComponent/DocumentsComponent";
import PollComponent from "./InputComponents/PollComponent/PollComponent";

const InputFiles = ({ onFilesSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    onFilesSelect(selectedFiles);
  };

  const handlePollSubmit = (pollData) => {
    // Handle poll data submission, you can customize this according to your needs
    console.log("Poll data submitted:", pollData);
  };

  return (
    <div className="input-files-container">
      <ImagesVideosComponent onFilesSelect={handleFileChange} />
      <DocumentsComponent onFilesSelect={handleFileChange} />
      <PollComponent onSubmit={handlePollSubmit} />
    </div>
  );
};

export default InputFiles;






































// import React, { useRef, useState } from "react";
// import "./InputFiles.css";

// import ImagesVideosComponent from "./InputComponents/ImagesVideosComponent/ImagesVideosComponent";
// import DocumentsComponent from "./InputComponents/DocumentsComponent/DocumentsComponent";
// // import CameraComponent from "./InputComponents/CameraComponent/CameraComponent";
// import PollComponent from "./InputComponents/PollComponent/PollComponent";



// const InputFiles = ({ onFilesSelect }) => {
//   const fileInputRef = useRef(null);
//   const [selectedContacts, setSelectedContacts] = useState([]);

//   const handleFileChange = (e) => {
//     const selectedFiles = e.target.files;
//     onFilesSelect(selectedFiles);

//   };

//   return (
//     <div className="input-files-container">
//       <ImagesVideosComponent onFilesSelect={handleFileChange} />
//       <DocumentsComponent onFilesSelect={handleFileChange} />
     
//       {/* <CameraComponent onFilesSelect={handleFileChange} /> */}
//       <PollComponent onFilesSelect={}/>
//     </div>
//   );
// };

// export default InputFiles;






































// import React from "react";
// import "./InputFiles.css";
// import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
// import DescriptionIcon from "@mui/icons-material/Description";
// import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import LocalSeeIcon from "@mui/icons-material/LocalSee";
// import InsertChartIcon from "@mui/icons-material/InsertChart";

// const inputs = [
//   {
//     id: 1,
//     name: "Images & Videoes",
//     Img: <PhotoLibraryIcon fontSize="large" />,
//   },

//   {
//     id: 2,
//     name: "Documents",
//     Img: <DescriptionIcon  fontSize="large" />,
//   },
//   {
//     id: 3,
//     name: "Contacts",
//     Img: <RecentActorsIcon fontSize="large" />,
//   },

//   {
//     id: 4,
//     name: "Camera",
//     Img: <LocalSeeIcon fontSize="large" />,
//   },

//   {
//     id: 4,
//     name: "Poll",
//     Img: <InsertChartIcon fontSize="large" />,
//   },
// ];

// const InuptFiles = () => {
//   return (
//     <div className="input-files-container">
//       {inputs.map((input) => (
//         <div className="input-file-item">
//           <div className="input-file-icon">{input.Img}</div>
//           <div className="">
//             <label>{input.name}
//             <input type="file" id="file-input" name={inputs.name} style={{ display: "none" }} />
//             </label>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InuptFiles;
