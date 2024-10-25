import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import "./Innorview.css";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WorkIcon from "@mui/icons-material/Work";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Modal,
} from "@mui/material";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MessageContext } from "../context/MessageContext";
import Cookies from "js-cookie";

export default function Innorview() {

  const {menu, setMenu} = useContext(MessageContext);

  const navigate = useNavigate();

  const profession = Cookies.get("profession");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [experienceModal, setExperienceModal] = useState(false);

  const [fresherModal, setFresherModal] = useState(false);

  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [value, setValue] = useState();

  const fresherCloseModal = () => {
    setFresherModal(false);
  };

  const experienceCloseModal = () => {
    setExperienceModal(false);
  };

  const checkHandle = () => {
    if (check) {
      if (value === "students") {
        // navigate("/innorview/student_fresher");
        setFresherModal(true);
      } else {
        // navigate("/innorview/experience");
        setExperienceModal(true);
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setCheck(true);
  };

  const schedule = () => {
    
if (profession === "common") {
  toast.error(<p style={{width:"500px"}}>"You have to update your profile"</p>, {position: "top-center", setTimeout: 5, length:5})
  setMenu(true)
} else {
  navigate("/interview-details")
}
  }
  return (
    <div className="innorview-container">
      <Header />

      <div className="innorview">
        <div className="innorview-card-container">
          <div
            className="innorview-card"
            onClick={schedule}
          >
            <PunchClockIcon sx={{ fontSize: 40 }} />
            <span>Scheduled Interviews</span>
          </div>
          <div
            className="innorview-card"
            // onClick={() => {
            //   profession === "normal" ? navigate("/innorview/joboffer") : handleOpenModal();
            // }}

             onClick={() =>  navigate("/innorview/joboffer") }
          >
            <LocalOfferIcon sx={{ fontSize: 40 }} />
            <span>My Account</span>
          </div>
        </div>
        <div className="innorview-card-container">
          <div
            className="innorview-card"
            onClick={() => navigate("/innorview/listedjob")}
          >
            <WorkIcon sx={{ fontSize: 40 }} />
            <span>Listed Jobs</span>
          </div>
          <div
            className="innorview-card"
            // onClick={() => {
            //   profession === "normal" ? navigate("/innorview/applications") : handleOpenModal();
            // }}

               onClick={() => navigate("/innorview/applications") }
          >
            <WebAssetIcon sx={{ fontSize: 40 }} />
            <span>Applications Status</span>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#ececff",
            border: "1px solid #034aac",
            padding: "2rem",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <h4 style={{ textAlign: "center" }}>
            Are you Fresher or Experienced ?
          </h4>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Checking"
              name="check"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="students"
                control={<Radio />}
                label="Students / Fresher"
              />

              <FormControlLabel
                value="experience"
                control={<Radio />}
                label="Experience"
              />
            </RadioGroup>
          </FormControl>
          <div className="d-flex">
            <Button onClick={checkHandle} color="primary">
              Next
            </Button>

            <Button onClick={handleCloseModal} color="error">
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={fresherModal} onClose={fresherCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#ececff",
            border: "1px solid #034aac",
            padding: "2rem",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <Fresher
            close={
              <Button onClick={fresherCloseModal} color="error">
                Close
              </Button>
            }
          />
        </div>
      </Modal>

      <Modal open={experienceModal} onClose={experienceCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#ececff",
            border: "1px solid #034aac",
            padding: "2rem",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <h1>Experience</h1>
          <Button onClick={experienceCloseModal} color="error">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Fresher({ close }) {

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const courseValidationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.number().required(),
    dateOfBirth: yup.number().required(),
    email: yup.string().required().email(),
    qualification: yup.string().required(), 
    department: yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: "",
      email: "",
      qualification: "",
      department: "",
    },

    validationSchema: courseValidationSchema,

    onSubmit: async (values) => {
      try {
        // let users = await axios.post(`${API_URL}/course/post`, values);
        alert(" New Course has created Done");
        navigate("/portal/course");
      } catch (err) {
        alert(err.response.data);
      }
    },
  });

  return (
    <div>
      <form
        className=" d-flex flex-column mx-auto gap-6"
        onSubmit={formik.handleSubmit}
      >
        <div className="d-flex w-100 justify-content-between gap-6 experience-sub-container1">
          <TextField
          className="w-100"
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            placeholder="Enter your first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            name="firstName"
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
            helperText={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : null
            }
          />

          <TextField      
            className="w-100"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            placeholder="Enter your last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            name="lastName"
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
            helperText={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : null
            }
          />
        </div>

        <div className="d-flex w-100 justify-content-between gap-6 experience-sub-container2">

       

          <TextField
             className="w-100"
            id="outlined-basic"
            label="Date of birth"
            type="date"
            variant="outlined"
            placeholder="Enter your date of birth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            name="dateOfBirth"
            onBlur={formik.handleBlur}
            error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            helperText={
              formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? formik.errors.dateOfBirth
                : null
            }
          />

          <TextField
             className="w-100"
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter your mobile number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
            helperText={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : null
            }
          />
        </div>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          placeholder="Enter yuor Email-IDpp"
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Highest Education"
          variant="outlined"
          placeholder="Enter your highest education"
          value={formik.values.qualification}
          onChange={formik.handleChange}
          name="qualification"
          onBlur={formik.handleBlur}
          error={formik.touched.qualification && formik.errors.qualification}
          helperText={
            formik.touched.qualification && formik.errors.qualification
              ? formik.errors.qualification
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Department"
          variant="outlined"
          placeholder="Enter the department"
          value={formik.values.department}
          onChange={formik.handleChange}
          name="department"
          onBlur={formik.handleBlur}
          error={formik.touched.department && formik.errors.department}
          helperText={
            formik.touched.department && formik.errors.department
              ? formik.errors.department
              : null
          }
        />

        <div className="d-flex">
          <Button color="primary" type="submit">
            Next
          </Button>
          {close}
        </div>
      </form>
    </div>
  );
}

// function Experience() {

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <h1>experience</h1>
//     </div>
//   );
// }
