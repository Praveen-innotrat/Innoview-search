import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Navbar from "../layout-components/Navbar";
import Footer from "../layout-components/StickyFooter";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const PageSection = styled("div")(({ theme }) => ({
  display: "flex", // Display content in a row
  flexDirection: "column", // Change to column layout for content
  alignItems: "center", // Center the content horizontally
  padding: "2rem", // Add padding for content
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add shadow for separation
  flex: 1, // Allow the content to expand and fill available space
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "blue",
  textAlign: "center",
  marginBottom: theme.spacing(3),
}));

const Content = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: "1.6",
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  lineHeight: "1.6",
  marginBottom: theme.spacing(2),
  textAlign: "justify",
  padding: "0rem 2rem",
  fontFamily: "'Roboto Slab', serif",
  fontWeight: "400",
  letterSpacing: "0.07rem",
}));

const RefundPolicy = () => {
  return (
    <>
      <PageContainer>
        <Navbar />
        <PageSection>
          <Title variant="h1">Refund Policy</Title>
          <Content variant="body1">
            <Paragraph>
              <strong>1.</strong> For the return of product(s) damaged at the time of delivery, the shipping charges shall be borne by the Company. However, for the return of any other product(s) for any other reasons, it shall be the responsibility of the User to arrange for the return of such canceled product(s), and the shipping charges shall be borne by such User.
              <br /><br />
              <strong>2.</strong> We request you not to accept any product package that seems to be tampered with, opened, or damaged at the time of delivery. The products must be returned in the same condition as delivered by the Company. Any products returned showing signs of any use or damage in any manner shall not be accepted for return.
              <br /><br />
              <strong>3.</strong> All requests for the return of products must be placed within 7 (seven) days from the date of delivery. Please note that no refunds shall be claimed or will be entertained post 7 (seven) days from the date of delivery.
              <br /><br />
              <strong>DISCLAIMER:</strong> <span style={{ color: "red" }}>THIS WEBSITE, THE SERVICES ARE PROVIDED ON AN "AS IS" BASIS WITH ALL FAULTS AND WITHOUT ANY WARRANTY OF ANY KIND. THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH REGARD TO THE WEBSITE, PRODUCTS AND THE SERVICES, INCLUDING WITHOUT LIMITATION, ALL IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, TIMELINESS. PERFORMANCE, COMPLETENESS, SUITABILITY AND NON-INFRINGEMENT. ADDITIONALLY, THE COMPANY SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SITE, OR THE SERVICES. YOUR USE OF ANY INFORMATION OR MATERIALS ON THIS WEBSITE/APPLICATION/SERVICES/PRODUCTS IS ENTIRELY AT YOUR OWN RISK, FOR WHICH WE SHALL NOT BE LIABLE. IT SHALL BE YOUR OWN RESPONSIBILITY TO ENSURE THAT SERVICES PROVIDED BY US MEET YOUR SPECIFIC REQUIREMENTS.</span>
            </Paragraph>
          </Content>
        </PageSection>
        {/* Add your content components below */}
      </PageContainer>
      <Footer />
    </>
  );
};

export default RefundPolicy;
