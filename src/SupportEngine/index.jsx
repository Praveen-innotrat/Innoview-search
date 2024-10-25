import React, { useState } from "react";
import Avatar from "./Avatar";
import SupportWindow from "./SupportWindow";

const SupportEngine = () => {
    const [visible, setVisible]= useState(false);
  return (
    <div>
        <SupportWindow visible={visible}/>
      <Avatar
      onClick={() => setVisible(true)}
      myStyle={{ position: "fixed", bottom: "24px", right: "24px" }} />
    </div>
  );
};

export default SupportEngine;
