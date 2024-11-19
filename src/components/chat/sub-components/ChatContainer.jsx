import React, { useState } from "react";
import "./ChatContainer.css";
import ChatLogo from "../../../assets/chatlogo.png";
import ChatWrite from "../../../assets/Chatwrite.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Chats from "./Chats/Chats";

const ChatContainer = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [menu, setMenu] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div
      className={`chat-container ${sidebarExpanded ? "expanded" : "collapsed"}`}
    >
      <div
        className={`chat-sidebar ${sidebarExpanded ? "expanded" : "collapsed"}`}
        style={sidebarExpanded ? { margin: "5px" } : { margin: "0px" }}
      >
        <div
          className="chat-header"
          style={sidebarExpanded ? { display: "flex" } : { display: "none" }}
        >
          <div className="chat-header-logo">
            <img src={ChatLogo} alt="" />
          </div>
          <span className="chat-heading">New Chat</span>
          <div className="chat-header-write">
            <img src={ChatWrite} alt="" />
          </div>
        </div>

        <div
          className="chat-history"
          style={sidebarExpanded ? { display: "flex" } : { display: "none" }}
        >
          <span className="chat-history-time">Time</span>
          <span className="chat-history-item">Name</span>
        </div>

        <>
          {sidebarExpanded ? (
            <ArrowBackIosIcon
              className="active-icon"
              style={{ left: "13%" }}
              sx={{ fontSize: 30 }}
              onClick={toggleSidebar}
            />
          ) : (
            <ArrowForwardIosIcon
              className="active-icon"
              style={{ left: "1%" }}
              sx={{ fontSize: 30 }}
              onClick={toggleSidebar}
            />
          )}
        </>
      </div>
      <div className="chat-field">
        <div
          className="chat-field-header"
          style={sidebarExpanded ? { display: "none" } : { display: "flex" }}
        >
          <input type="text" placeholder="Search......" />

          <div className="chat-field-icon">
            <SearchIcon fontSize="large" style={{ cursor: "pointer" }} />
            <MenuIcon
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={handleMenu}
            />
            <div
              className="chat-field-menu"
              style={menu ? { display: "flex" } : { display: "none" }}
            >
              {/* <MenuIcon
                fontSize="large"
                style={{ cursor: "pointer" }}
                onClick={handleMenu}
              /> */}
              <span>Select Messages</span>
              <span>Clear Chat</span>
              <span>Delete Chat</span>
            </div>
          </div>
        </div>

        <Chats sidebarExpanded={sidebarExpanded} />
      </div>
    </div>
  );
};

export default ChatContainer;

// const ChatContainer = () => {
//   const [sidebarExpanded, setSidebarExpanded] = useState(true);
//   const [menu, setMenu] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarExpanded(!sidebarExpanded);
//   };

//   const handleMenu = () => {
//     setMenu(!menu);
//   };

//   return (
//     <div className={`main-container ${sidebarExpanded ? "expanded" : "collapsed"}`}>
//       <div className={`sidebar ${sidebarExpanded ? "expanded" : "collapsed"}`} style={sidebarExpanded ? { margin: "5px" } : { margin: "0px" }}>
//       <div
//           className="chat-header"
//           style={sidebarExpanded ? { display: "flex" } : { display: "none" }}
//         >
//           <div className="chat-header-logo">
//             <img src={ChatLogo} alt="" />
//           </div>
//           <span className="chat-heading">New Chat</span>
//           <div className="chat-header-write">
//             <img src={ChatWrite} alt="" />
//           </div>
//         </div>

//         <div
//           className="chat-history"
//           style={sidebarExpanded ? { display: "flex" } : { display: "none" }}
//         >
//           <span className="chat-history-time">Time</span>
//           <span className="chat-history-item">Name</span>
//         </div>
//         <ArrowIcon expanded={sidebarExpanded} onClick={toggleSidebar} />
//       </div>
//       <div className="chat-field">
//       <div
//           className="chat-field-header"
//           style={sidebarExpanded ? { display: "none" } : { display: "flex" }}
//         >
//           <input type="text" placeholder="Search......" />

//           <div className="chat-field-icon">
//             <SearchIcon fontSize="large" style={{ cursor: "pointer" }} />
//             <MenuIcon
//               fontSize="large"
//               style={{ cursor: "pointer" }}
//               onClick={handleMenu}
//             />
//             <div
//               className="chat-field-menu"
//               style={menu ? { display: "flex" } : { display: "none" }}
//             >
//               {/* <MenuIcon
//                 fontSize="large"
//                 style={{ cursor: "pointer" }}
//                 onClick={handleMenu}
//               /> */}
//               <span>Select Messages</span>
//               <span>Clear Chat</span>
//               <span>Delete Chat</span>
//             </div>
//           </div>
//         </div>

//         <div
//           className="chat-field-input"
//           style={
//             sidebarExpanded ? { width: "calc(100vw - 15%)" } : { width: "100%" }
//           }
//         >
//           <input type="text" placeholder="Type Something ......" />
//           <KeyboardVoiceIcon fontSize="large" style={{ cursor: "pointer" }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ArrowIcon = ({ expanded, onClick }) => (
//   <>
//     {expanded ? (
//       <ArrowBackIosIcon className="active-icon" style={{ left: "13%" }} sx={{ fontSize: 30 }} onClick={onClick} />
//     ) : (
//       <ArrowForwardIosIcon className="active-icon" style={{ left: "1%" }} sx={{ fontSize: 30 }} onClick={onClick} />
//     )}
//   </>
// );

// export default ChatContainer;
