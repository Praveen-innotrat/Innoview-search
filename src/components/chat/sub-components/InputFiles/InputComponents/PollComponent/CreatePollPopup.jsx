// CreatePollPopup.js
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./CreatePollPopup.css";

const CreatePollPopup = ({ onClose, onSubmit }) => {
  const [pollData, setPollData] = useState({
    question: "",
    options: [{ value: "", type: "text", votes: 0 }],
  });

  const handleClose = () => {
    onClose();
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...pollData.options];
    updatedOptions[index].value = value;
    setPollData({ ...pollData, options: updatedOptions });
  };

  const handleAddOption = () => {
    setPollData({
      ...pollData,
      options: [...pollData.options, { value: "", type: "text", votes: 0 }],
    });
  };

  const handleRemoveOption = (index) => {
    if (pollData.options.length > 1) {
      const updatedOptions = [...pollData.options];
      updatedOptions.splice(index, 1);
      setPollData({ ...pollData, options: updatedOptions });
    }
  };

  const handleQuestionChange = (e) => {
    setPollData({ ...pollData, question: e.target.value });
  };

  const handleVote = (index) => {
    const updatedOptions = [...pollData.options];
    updatedOptions[index].votes += 1;
    setPollData({ ...pollData, options: updatedOptions });
  };

  const calculatePercentage = (votes, totalVotes) => {
    if (totalVotes === 0) {
      return 0;
    }
    return (votes / totalVotes) * 100;
  };

  const getTotalVotes = () => {
    return pollData.options.reduce((total, option) => total + option.votes, 0);
  };

  const handleSubmit = () => {
    // Call the parent component's function to submit the poll data
    onSubmit(pollData);
    // Close the pop-up after submitting
    onClose();
  };

  return (
    <div className="create-poll-popup">
      <div>
        <label>
          Question:
          <input
            type="text"
            value={pollData.question}
            onChange={handleQuestionChange}
          />
        </label>
      </div>
      <div>
        <label>Options:</label>
        {pollData.options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option.value}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button onClick={() => handleVote(index)}>Vote</button>
            {pollData.options.length > 1 && (
              <button onClick={() => handleRemoveOption(index)}>Remove</button>
            )}
            <div
              className="percentage-bar"
              style={{
                width: `${calculatePercentage(option.votes, getTotalVotes())}%`,
              }}
            ></div>
          </div>
        ))}
        <button onClick={handleAddOption}>Add Option</button>
      </div>
      <button onClick={handleSubmit}>Submit Poll</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default CreatePollPopup;
