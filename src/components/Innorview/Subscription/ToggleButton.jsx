import Button from "@mui/material/Button";

const ToggleButton = ({ isAnnual, onToggle }) => {
  return (
    <Button
      sx={{
        backgroundColor: "#034aac",
        color: "white",
        "&:hover": {
          backgroundColor: "#0560fd",
        },
      }}
      variant="outlined"
      onClick={onToggle}
    >
      {isAnnual ? "Switch to Monthly" : "Switch to Annual"}
    </Button>
  );
};

export default ToggleButton;
