import React, { useState } from "react";
import { styles } from "./style";

const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={props.myStyle}>
      <div
        className="transition-3"
        style={{
          ...styles.avatarHello,
          ...{ opacity: hovered ? "1" : "0" },
        }}
      >
        Hey it's siri!!!
      </div>

      <div
        className="transition-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => props.onClick && props.onClick()}
        style={{
          ...styles.chatWithMeButton,
          ...{
            border: hovered
              ? "0.05rem solid #bfc9ffd4"
              : "0.1rem solid #e5e2ea",
          },
          ...{ transform: hovered ? "scale(1.1)" : "scale(1)" },
        }}
      />
    </div>
  );
};

export default Avatar;
