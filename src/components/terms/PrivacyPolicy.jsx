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
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
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
  // color: "black", 
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

const ParaHead = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "900",
  margin: "1rem 0rem",
  textDecoration: "underline",
}));

const PrivacyPolicy = () => {
  return (
    <PageContainer>
      <Navbar />
      <PageSection>
      <Title variant="h1">Privacy Policy</Title>
        <Content variant="body1">
          <Paragraph>
          We value your trust. In order to honour that trust, Innotrat Labs Private Limited, adheres to ethical standards in gathering, using, and safeguarding any information you provide. This privacy policy governs your use of Innotrat Labs Private, www.innotrat.com. Please read this privacy policy, Website, our services, and products. Your use of the Website or services or registrations with us through any modes or usage of any products including through SD cards, tablets or other storage/transmitting device shall signify your acceptance of this Policy and your agreement to be legally bound by the same. If you do not agree with the terms of this Policy, do not use the Website, our products or avail any of our Services.
          <ParaHead>User Provided Information</ParaHead>
          The Website products obtains the information you provide when you download and register for the Services or products. When you register with us, you generally provide (a) your name, email address, , phone number, password (b) transaction-related information, such as when you make purchases, respond to any offers,  (c) information you provide us when you contact us for help; (d) information you enter into our system when using the Services/products, such as while asking doubts, participating in discussions and taking tests. The said information collected from the users could be categorized as “Personal Information”, “Sensitive Personal Information” and “Associated Information”. Personal Information, Sensitive Personal Information and Associated Information (each as individually defined under this Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 (the “Data Protection Rules”)) shall collectively be referred to as 'Information' in this Policy. We may use the Information to contact you from time to time, to provide you with the Services, important information, required notices and marketing promotions. We will ask you when we need more information that personally identifies you (personal information) or allows us to contact you. We will not differentiate between who is using the device to access the Website or Services or products, so long as the log in/access credentials match with yours.

          <br/>
          <br />
          In order to make the best use of the Website/Services/products and enable your Information to be captured accurately on the Website/Services/products, it is essential that you have logged in using your own credentials. We will, at all times, provide the option to you to not provide the Personal Information or Sensitive Personal Information, which we seek from you. Further, you shall, at any time while using the Services/products, also have an option to withdraw your consent given earlier to us to use such Personal Information or Sensitive Personal Information. Such withdrawal of the consent is required to be sent in writing to us at the contact details provided in this Policy below. In such event, however, the Company fully reserves the right not to allow further usage of the Application or provide any Services/products thereunder to you.

         <ParaHead>Automatically Collected Information</ParaHead>
         In addition, the products/Services may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Services/products. As is true of most Mobile applications, we also collect other relevant information as per the permissions that you provide. We use an outside credit card processing company to bill you for goods and services. These companies do not retain, share, store or use personally identifiable information for any other purpose.
         <br />
         <br />
         At the time you register with us for our Services or during the term of Services relating to our products/services/subscriptions, we may require camera and microphone access while you avail such products/services/subscriptions to improve the in-classroom experience. All video, audio and telecalls between you and our representatives/agents are recorded for quality and training purposes. These recordings shall not be shared with you for any reasons whatsoever. By agreeing to this Privacy Policy, you consent to our collection/ recording and use of your  audio/video/telecall recordings and personal information for the above-mentioned purposes.
         <ParaHead>Use of your Personal Information</ParaHead>
         We use the collected Information to analyse trends, to conduct research, to administer the Services and products, to learn about each user's learning patterns and movements around the Services and products and to gather demographic information and usage behaviour about our user base as a whole. Aggregated and individual, anonymized, and non-anonymized data may periodically be transmitted to external service providers to help us improve the Application, products and our Services. We will share your information with third parties only in the ways that are described below in this Policy. We may use the individual data and behaviour patterns combined with personal information to provide you with personalized content, and better your learning objectives. Third parties provide certain services which we may use to analyse the data and information to personalize, drive insights and help us better your experience or reach out to you with more value-added applications, products, information and services. However, these third-party companies do not have any independent right to share this information. We do not sell, trade, or share your Information to any third party (except subsidiaries/affiliates of the Company for related offerings) unless, we have been expressly authorized by you either in writing or electronically to do so. We may at times provide aggregate statistics about our customers, traffic patterns, and related site information to reputable third parties, however this information when disclosed will be in an aggregate form and does not contain any of your Personally Identifiable Information. Innotrat Labs Pvt Ltd will occasionally send email notices, messages or contact you to communicate about our Services, products and benefits, as they are considered an essential part of the Services/products you have chosen. We may disclose Information: 
          <br /> <br />
          <span style= {{display : "inline-block", paddingLeft : "3rem"}}>
          &#x25cf; as required by law, such as to comply with a subpoena, or similar legal process.
          <br /><br />
          &#x25cf;	to enforce applicable ToU, including investigation of potential violations thereof.
          <br /><br />
          &#x25cf;	when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, address security or technical issues or respond to a government request.
          <br /><br />
          &#x25cf;	with our trusted services providers who work on our behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this Policy.
          <br /><br />
          &#x25cf;	to protect against imminent harm to the rights, property or safety of the Website/ Innotrat Labs Private Limited or its users or the public as required or permitted by law;
          <br /><br />
          &#x25cf;	with third party service providers in order to personalize the Website/Services/products for a better user experience and to perform behavioural analysis.
          </span>
          <ParaHead>Access to your Personal Information</ParaHead>
          We will provide you with the means to ensure that your Personal Information is correct and current. If you have filled out a user profile, we will provide an obvious way for you to access and change your profile from our Services/Website/products. We adopt reasonable security measures to protect your password from being exposed or disclosed to anyone.
          <ParaHead>Cookies</ParaHead>
          We send cookies (small files containing a string of characters) to your computer, thereby uniquely identifying your browser. Cookies are used to track your preferences, help you login faster, and aggregated to determine user trends. This data is used to improve our offerings, such as providing more content in areas of greater interest to a majority of users. Most browsers are initially set up to accept cookies, but you can reset your browser to refuse all cookies or to indicate when a cookie is being sent. Some of our features and services may not function properly if your cookies are disabled.
          <ParaHead>Links</ParaHead>
          We may present links in a format that enables us to keep track of whether these links have been followed. We use this information to improve our customized content. Clicking on links may take you to sites outside our domain. We are not responsible for the privacy practices of other web sites. We encourage our users to be aware when they leave our site to read the privacy statements of each and every web site that collects personally identifiable information. This Privacy Policy applies solely to information collected by our website.
          <ParaHead>Alerts</ParaHead>
          We may alert you by email or phone (through SMS/call/WhatsApp) to inform you about new service offerings of the Company and its subsidiaries/affiliates or other information which we feel might be useful for you, through the Company or its subsidiaries/affiliates.
          <ParaHead>Public Forums</ParaHead>
          When you use certain features on our website like the discussion forums and you post or share your personal information such as comments, messages, files, photos, will be available to all users, and will be in the public domain. All such sharing of information is done at your own risk. Please keep in mind that if you disclose personal information in your profile or when posting on our forums this information may become publicly available.
          <ParaHead>Security</ParaHead>
          We are concerned about safeguarding the confidentiality of your Information. We provide physical, electronic, and procedural safeguards to protect Information we process and maintain. For example, we limit access to this Information to authorized employees only who need to know that information in order to operate, develop or improve our Services/products/Website. Please be aware that, although we endeavour to provide reasonable security for information we process and maintain, no security system can prevent all potential security breaches.
          <ParaHead>How Long Do We Retain User Data?</ParaHead>
          Currently, we plan to retain user data while an account is active and for at least three years afterward. We may alter this practice according to legal and business requirements. For example, we may lengthen the retention period for some data if needed to comply with law or voluntary codes of conduct. Unless otherwise prohibited, we may shorten the retention period for some types of data if needed to free up storage space.
          <ParaHead>Log information</ParaHead>
          When you access our website, our servers automatically record information that your browser sends whenever you visit a website. These server logs may include information such as your web request, internet protocol address, browser type, browser language, the date and time of your request and one or more cookies that may uniquely identify your browser.
          <ParaHead>User communications</ParaHead>
          When you send an email or other communication to us, we may retain those communications in order to process your inquiries, respond to your requests and improve our Services.
          <ParaHead>Changes to this Statement</ParaHead>
          As the Company evolves, our privacy policy will need to evolve as well to cover new situations. You are advised to review this Policy regularly for any changes, as continued use is deemed approval of all changes.
          <ParaHead>Your Consent</ParaHead>
          We believe that every user of our Services/products/Website must be in a position to provide an informed consent prior to providing any Information required for the use of the Services/products/Website. By registering with us, you are expressly consenting to our collection, processing, storing, disclosing, and handling of your information as set forth in this Policy now and as amended by us. Processing, your information in any way, including, but not limited to, collecting, storing, deleting, using, combining, sharing, transferring, and disclosing information, all which activities will take place in India. If you reside outside India your information will be transferred, processed, and stored in accordance with the applicable data protection laws of India.


          </Paragraph>
        </Content>
      </PageSection>
      {/* Add your content components below */}
      <Footer />
    </PageContainer>
  );
};

export default PrivacyPolicy;
