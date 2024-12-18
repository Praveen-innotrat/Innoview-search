import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Chat from "./pages/Chat";
import "react-toastify/dist/ReactToastify.css";
import VerifyOtp from "./pages/VerifyOtp";
import VerifyResetOtp from "./pages/VerifyResetPassword";
import { ThemeProvider } from "@emotion/react";
import TermsAndConditions from "./components/terms/TermsAndConditions";
import PrivacyPolicy from "./components/terms/PrivacyPolicy";
import ContactUs from "./components/ContactUs";
import RefundPolicies from "./components/terms/RefundPolicies";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";

import Subscription from "./components/Subscription";
import { Support } from "./pages/Support/Support";
import Innorview from "./components/Innorview/Innorview";
import Schedule from "./components/Innorview/ScheduleInterview/Schedule";
import Offers from "./components/Innorview/JobOffers/Offers";
import Jobs from "./components/Innorview/ListedJobs/Jobs";
import Applications from "./components/Innorview/Appliccations/Applications";
import SubscriptionPlan from "./components/Innorview/Subscription/Subscription";
import ProfilePage from "./components/Innorview/Profile/PrpfilePage";
import MyAccount from "./components/MyAccount/MyAccount";
import InterviewDetails from "./components/Innorview/ScheduleInterview/InterviewDetails";
import Interview from "./components/Innorview/ScheduleInterview/Interview";
import Experience from "./components/Innorview/Experience";
import StudentFresher from "./components/Innorview/StudentFresher";
import UpdateProfile from "./components/Innorview/UpdateProfile/UpdateProfile";
import Meeting from "./components/Innorview/ScheduleInterview/Meeting";
import AsyncInterview from "./components/Innorview/ScheduleInterview/AsyncInterview";
import AdminMeeting from "./components/Innorview/ScheduleInterview/AdminMeeting";
import AsyncMeeting from "./components/Innorview/ScheduleInterview/AsyncMeeting";
import Cookies from "js-cookie";
import EurekaPortal from "./pages/EurekaPortal";
// import AsyncInterview from "./components/Innorview/ScheduleInterview/AsyncInterview1";
import JobsType from "./components/Innorview/ListedJobs/JobsType";
import InternOrJob from "./components/Innorview/ListedJobs/InternOrJob";
import PostedJobs from "./components/Innorview/ListedJobs/PostedJobs";
import PostedInternships from "./components/Innorview/ListedJobs/PostedInternships";
import Jd from "./components/Innorview/ListedJobs/JobDescription/Jd";
import InternJob from "./components/Innorview/ListedJobs/InternJob";
import Interns from "./components/Innorview/ListedJobs/Interns";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const hasCookies =
    !!document.cookie.match(/mobile_number=.*;?\s*$/) &&
    !!document.cookie.match(/token=.*;?\s*$/);

  return hasCookies ? <Component {...rest} /> : <Navigate to="/eureka" />;
};

const customToastStyle = {
  width: "100%", // Make the toast width 100%
};

// Custom close button style
const CustomCloseButton = ({ closeToast }) => (
  <button
    style={{
      width: "max-content", // Close icon width
      background: "transparent",
      color: "grey",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    }}
    onClick={closeToast}
  >
    ✖
  </button>
);

function App() {
  const location = useLocation();
  const [interviews, setInterviews] = useState([
    // {
    //   interviewId: 1,
    //   jobId: 1,
    //   date: Date(),
    //   time: Date(),
    //   hrDetails: "HR",
    //   token: Cookies.get("mobile_number"),
    //   result: true,
    //   status: true,
    // },
    // {
    //   interviewId: 2,
    //   jobId: 2,
    //   date: Date(),
    //   time: Date(),
    //   hrDetails: "HR",
    //   token: Cookies.get("mobile_number"),
    //   result: true,
    //   status: true,
    // },
    // {
    //   interviewId: 2,
    //   jobId: 3,
    //   date: Date(),
    //   time: Date(),
    //   hrDetails: "HR",
    //   token: Cookies.get("mobile_number"),
    //   result: true,
    //   status: true,
    // },
  ]);

  console.log("Interviews data's come ", interviews);

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      shadowSupport: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "760px", tab: "998px" },
  };

  return (
    <>
      <ToastContainer
        autoClose={1400}
        toastStyle={customToastStyle} // Apply the custom toast style
        closeButton={<CustomCloseButton />} // Use the custom close button
      />
      <ThemeProvider theme={theme}>
        {/* <Header /> */}

        <Routes>
          <Route path="/eureka" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/" element={<Home />} />
          <Route path="/verifyResetOtp" element={<VerifyResetOtp />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policies" element={<RefundPolicies />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/eureka-portal" element={<EurekaPortal />} />
          <Route path="/innorview" element={<Innorview />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms_policies" element={<Footer />} />
          <Route path="/support" element={<Support />} />
          {/* Innorview */}
          <Route
            path="/innorview/schedule"
            element={
              <Schedule interviews={interviews} setInterviews={setInterviews} />
            }
          />
          <Route path="/innorview/update-profile" element={<UpdateProfile />} />
          <Route path="/innorview/joboffer" element={<Offers />} />
          <Route path="/innorview/listedInterns" element={<Jobs />} />
          <Route path="/innorview/listedjob" element={<Interns />} />
          <Route path="/innorview/applications" element={<Applications />} />
          <Route
            path="/innorview/subscriptions"
            element={<SubscriptionPlan />}
          />
          <Route
            path="/innorview/student_fresher"
            element={<StudentFresher />}
          />
          <Route path="/innorview/experience" element={<Experience />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/myaccount" element={<MyAccount />} /> */}
          <Route
            path="/interview-details"
            element={
              <InterviewDetails
                interviews={interviews}
                setInterviews={setInterviews}
              />
            }
          />
          <Route path="/choose-type" element={<JobsType />} />
          <Route path="/from-our-hiringpartners" element={<InternOrJob />} />
          <Route path="/from-our-online-source" element={<InternJob />} />
          <Route path="/posted-jobs" element={<PostedJobs />} />
          <Route path="/posted-internships" element={<PostedInternships />} />
          <Route path="/jobs-description" element={<Jd />} />

          <Route path="/interview" element={<Interview />} />
          <Route path="/interview/:id" element={<AsyncInterview />} />
          {/* <Route path="/interview/:id" element={<AsyncInterview />} /> */}

          <Route path="/interview/async" element={<AsyncMeeting />} />
          <Route path="/interview/meeting" element={<Meeting />} />
          <Route path="/interview/admin" element={<AdminMeeting />} />
        </Routes>

        <>{location.pathname === "/chat" ? null : <Footer />}</>
      </ThemeProvider>
    </>
  );
}

export default App;
