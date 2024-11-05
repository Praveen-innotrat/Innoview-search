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
import Course1 from "./components/services/courses/course1";
import Course2 from "./components/services/courses/course2";
import Course3 from "./components/services/courses/course3";
import Course4 from "./components/services/courses/course4";
import Cart from "./pages/Cart";
import { ThemeProvider } from "@emotion/react";
import TermsAndConditions from "./components/terms/TermsAndConditions";
import PrivacyPolicy from "./components/terms/PrivacyPolicy";
import ContactUs from "./components/ContactUs";
import RefundPolicies from "./components/terms/RefundPolicies";
import Service from "./components/Services";
import UserRegistration from "./components/Registration";
import OrderSection from "./components/OrderSection";
import Quotation from "./components/Quotation";
import ProformaInvoice from "./components/Payment";
import TaxInvoice from "./components/TaxInvoice";
import Exception from "./components/Exception";
import LogisticDetails from "./components/LogisticDetails";
import UserRequirementPage from "./pages/userRequirmentPage";
import EnquiryForm from "./components/EnquiryForm";
import OrderDetailsPage from "./pages/OrderId";
import Dashboard from "./components/Dashboard";
import SubmitSection from "./components/submitSection";
import OrderHistory from "./components/OrderHistory";
// import Footer from "./components/layout-components/superfooter";
import TransactionDetails from "./pages/Transactions";
import Admin from "./components/adminDashboard/Admin";
// import { MessageProvider } from "./components/context/MessageContext";
// import TopSection from "./components/innomart/TopSection";
import { ToastContainer } from "react-toastify";
// import InnobatorService from "./components/innomart/pages/innobator/InnobatorService";
// import InnoLegalService from "./components/innomart/pages/innoLegal/InnoLegalService";
// import MechanicalServices from "./components/innomart/pages/innoMechanical/MechanicalServices";
// import Innodesign from "./components/innomart/pages/innoDesign/Innodesign";
// import Subscription from "./components/Subscription";
import "react-toastify/dist/ReactToastify.css";
import Elearning from "./components/Elearning/Elearning";
import Programs from "./components/Programs/Programs";
import Footer from "./components/Footer/Footer";
import Program from "./components/Programs/Program";
import StickyFooter from "./components/layout-components/StickyFooter";
import RecruiterLogin from "./components/Recruiters/Login";
import Subscription from "./components/Subscription";
import InnoMartHome from "./components/innomart/InnoMartHome";
import Innobator from "./components/innomart/pages/innoBator/Innobator";
import InnoDesign from "./components/innomart/pages/innoDesign/InnoDesign";
import InnoLegal from "./components/innomart/pages/innoLegal/InnoLegal";
import InnoMechanical from "./components/innomart/pages/innoMechanical/InnoMechanical";
import { Support } from "./pages/Support/Support";
import Courses from "./components/Courses/Courses";
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
import RecruiterSignup from "./components/Recruiters/Signup";
import MainLogin from "./pages/LoginScreens/MainLogin";
import Header from "./components/Header/Header";
import RecruitersDashboard from "./components/Recruiters/Dashboard";
import AfterLogin from "./components/Recruiters/AfterLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const hasCookies =
    !!document.cookie.match(/mobile_number=.*;?\s*$/) &&
    !!document.cookie.match(/token=.*;?\s*$/);

  return hasCookies ? <Component {...rest} /> : <Navigate to="/eureka" />;
};

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
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        // rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ThemeProvider theme={theme}>
        <Header />

        <Routes>
          <Route path="/eureka" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/services" element={<Service />} /> */}
          <Route path="/elearning" element={<Elearning />} />
          <Route path="/programs/:id" element={<Program />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/verifyResetOtp" element={<VerifyResetOtp />} />
          <Route exact path="/cart" element={<Cart />} />
          {/* <Route exact path="/course1" element={<Course1 />} />
          <Route exact path="/course2" element={<Course2 />} />
          <Route exact path="/course3" element={<Course3 />} />
          <Route exact path="/course4" element={<Course4 />} /> */}
          <Route exact path="/course" element={<Courses />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policies" element={<RefundPolicies />} />
          {/* <Route path="/registration" element={<UserRegistration />} /> */}
          <Route path="/submit" element={<UserRequirementPage />} />
          <Route
            path="/ordersection"
            element={<PrivateRoute component={OrderSection} />}
          />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/vieworder" element={<OrderDetailsPage />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/proformainvoice" element={<ProformaInvoice />} />
          <Route path="/Taxinvoice" element={<TaxInvoice />} />
          <Route path="/exception" element={<Exception />} />
          <Route path="/logisticdetails" element={<LogisticDetails />} />
          <Route path="/enquiryform" element={<EnquiryForm />} />
          {/* <Route path="/innomart" element={<TopSection />} />
          <Route path="/innobator" element={<InnobatorService />} />
          <Route path="/innolegal" element={<InnoLegalService />} />
          <Route path="/innomechanical" element={<MechanicalServices />} />
          <Route path="/innodesign" element={<InnoDesign />} /> */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/eureka-portal" element={<EurekaPortal />} />
          <Route path="/innorview" element={<Innorview />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/innomart" element={<InnoMartHome />} />
          <Route path="/innobator" element={<Innobator />} />
          <Route path="/innolegal" element={<InnoLegal />} />
          <Route path="/innomechanical" element={<InnoMechanical />} />
          <Route path="/innodesign" element={<InnoDesign />} />
          {/* <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route path="/innofab" element={<SubmitSection />} />
          <Route path="/terms_policies" element={<Footer />} />
          <Route path="/payment" element={<TransactionDetails />} />
          <Route path="/registration" element={<UserRegistration />} />
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
          <Route path="/innorview/listedjob" element={<Jobs />} />
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
          <Route path="/myaccount" element={<MyAccount />} />
          <Route
            path="/interview-details"
            element={
              <InterviewDetails
                interviews={interviews}
                setInterviews={setInterviews}
              />
            }
          />

          <Route path="/logins" element={<MainLogin />} />
          <Route path="/recruiters-login" element={<RecruiterLogin />} />
          <Route path="/recruiters-signup" element={<RecruiterSignup />} />
          <Route path="/recruiters-dashboard" element={<AfterLogin />} />

          <Route path="/interview" element={<Interview />} />
          <Route path="/interview/:id" element={<AsyncInterview />} />
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
