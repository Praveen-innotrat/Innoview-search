import React, { useRef } from "react";
import DescriptionIcon from "@mui/icons-material/Description";

const DocumentsComponent = ({ onFilesSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    onFilesSelect(selectedFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="input-file-item" onClick={handleButtonClick}>
      <div className="input-file-icon">
        <DescriptionIcon fontSize="large" />
      </div>
      <div>
        <label>
          Documents
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef}
            multiple
          />
        </label>
      </div>
    </div>
  );
};

export default DocumentsComponent;
