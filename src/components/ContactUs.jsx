import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Navbar from "./layout-components/Navbar";
import Footer from "./layout-components/StickyFooter";
import { NavLink } from "react-router-dom";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const ContactContainer = styled("div")(({ theme }) => ({
  display: "flex", // Display content in a row
  flexDirection: "column", // Change to column layout for address and mobile details
  alignItems: "center", // Center the content horizontally
  padding: "2rem", // Adjust the padding as needed
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add shadow for separation
  flex: 1, // Allow the content to expand and fill available space
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem", // Adjust the font size
  fontWeight: "bold",
  color: "blue",
  textAlign: "center",
  marginBottom: theme.spacing(3),
}));

const Content = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: "1.6",
  fontFamily: "'Roboto Slab', serif",
  textAlign: "justify",
}));

const Address = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "600",
  marginTop: theme.spacing(2),
  textAlign: "center", // Center the address
}));

const Links = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "600",
  marginTop: theme.spacing(2),
  textAlign: "center", // Center the links
}));

const ContactUs = () => {
  return (
    <>
      <PageContainer>
        <Navbar />
        <ContactContainer>
          <Title variant="h1">Contact Us</Title>
          <Content variant="body1">
            At Innotrat Labs - we are building a next-generation conversational AI-enabled Virtual Assistant for Embedded Product Developers. That's our flagship platform from Innotrat Labs. We address an industrial problem statement like the scarcity of industry-ready experts in end-to-end Embedded Product Development. Our platform uses a virtual metahuman-enabled teaching assistant for upskilling users, enabling them to be research, industry, and job-ready. We are transforming the way embedded engineers approach circuit design by leveraging the power of AI. With our innovative technology, we empower engineers to upskill and design circuits quickly and easily through simple conversations with our metahuman bot.
          </Content>
          <Address>
            Address: 2nd & 3rd Floor, CTEF: INNOVEX, CIPET: SARP-LARPM, Patia, Bhubaneswar, Odisha 751024
          </Address>
          <Links>
            Contact: <span style={{ color: "blue", textDecoration: "underline" }}>+91 9176190201</span>
            <br />
            Email ID -{" "}
            <span style={{ color: "blue", textDecoration: "underline" }}>
              <NavLink to="mailto:satya@innotrat.com">satya@innotrat.com</NavLink>
            </span>
          </Links>
        </ContactContainer>
        {/* Add your content components below */}
      </PageContainer>
      <Footer />
    </>
  );
};

export default ContactUs;
