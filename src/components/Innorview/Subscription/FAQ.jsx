import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

const faqData = [
  {
    question: "About Plan",
    answer: "Each plan is designed to meet the needs of our customers.",
  },
  {
    question: "Refund Policy",
    answer:
      "We have a 30-day refund policy. If you are not satisfied with our service, you can get a full refund within 30 days of your purchase.",
  },
  // Add more FAQ items as needed
];
const FAQ = () => {
  
  return <>
  <div>
      {faqData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMore sx={{
             color: "#ffffff",
             backgroundColor: "#034aac",
            //  backgroundImage:
            //    "linear-gradient(to bottom right, #FF5722, #F50057)",
            borderRadius: "100%",
          }} />}>
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  
  </>;
};

export default FAQ;
