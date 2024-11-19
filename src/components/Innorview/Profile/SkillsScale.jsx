import React from "react";
import { Typography, Container, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/system";

const SkillScale = ({ skills }) => {
  const totalProgress = skills.reduce(
    (total, skill) => total + skill.progress,
    0
  );
  const averageProgress = totalProgress / skills.length;

  const maxStars = 5; // Maximum number of stars

  const starCount = Math.ceil((averageProgress / 100) * maxStars);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < maxStars; i++) {
      const filled = i < starCount;
      stars.push(
        <StarIcon key={i} sx={{
          color: filled ? "#f50057" : "#000000",
        }} color={filled ? "primary" : "disabled"} />
      );
    }
    return stars;
  };

  return (
    <Box>
      <Typography variant="h6">Skill Level:</Typography>
      <Stack direction="row" spacing={1}>
        {renderStars()}
      </Stack>
    </Box>
  );
};

export default SkillScale;
