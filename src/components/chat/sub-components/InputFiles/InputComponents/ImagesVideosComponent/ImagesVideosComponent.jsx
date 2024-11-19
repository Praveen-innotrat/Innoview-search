import React, { useRef } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const ImagesVideosComponent = ({ onFilesSelect }) => {
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
        <PhotoLibraryIcon fontSize="large" />
      </div>
      <div>
        <label>
          Images & Videos
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef}
            accept="image/*,video/*"
            multiple
          />
        </label>
      </div>
    </div>
  );
};

export default ImagesVideosComponent;
