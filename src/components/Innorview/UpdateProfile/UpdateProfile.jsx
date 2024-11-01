import React, { useMemo, useState } from "react";
import Header from "../../Header/Header";
import "./UpdateProfile.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Modal,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function UpdateProfile() {
  const navigate = useNavigate();

  const profession = Cookies.get("profession");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [experienceModal, setExperienceModal] = useState(false);

  const [fresherModal, setFresherModal] = useState(false);

  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //   if (profession === "normal") {
  //     handleOpenModal()
  //   } else {

  //   }
  Cookies.get("mobile_number");

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

  const fresherCloseModal = () => {
    setFresherModal(false);
  };

  const experienceCloseModal = () => {
    setExperienceModal(false);
  };

  return (
    <div className="updateProfile-container">
      <Header />

      {profession === "normal" ? (
        <div
          style={{
            marginTop: "100px",
            marginBottom: "100px",
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
      ) : null}
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
  const tomorrow = dayjs().add(2, "day");
  const today = dayjs();

  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a fast track date";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const navigate = useNavigate();

  const courseValidationSchema = yup.object({
    email: yup.string().required().email(),
    //   dateOfBirth: yup.number().required(),
    alterPhoneNumber: yup.number().required(),
    qualification: yup.string().required(),
    department: yup.string().required(),
    //   attachFile:yup.mixed().required('A file is required')
  });
  // .shape({
  //     attachFile:yup.mixed().required()
  //           .test('fileFormat', 'Only PDF files are allowed', value => {
  //             if (value) {
  //               const supportedFormats = ['pdf'];
  //               return supportedFormats.includes(value.name.split('.').pop());
  //             }
  //             return true;
  //           })
  //           .test('fileSize', 'File size must not be more than 3MB',
  //           value => {
  //             if (value) {
  //               return value.size <= 3145728;
  //             }
  //             return true;
  //           })
  //         });
  // .shape({
  //     attachFile:yup.mixed().required('A file is required')
  //         });

  const formik = useFormik({
    initialValues: {
      profession: "fresher",
      mobile_number: Cookies.get("mobile_number"),
      email: "",
      dateOfBirth: "",
      alterPhoneNumber: "",
      qualification: "",
      department: "",
      resume: "",
    },

    validationSchema: courseValidationSchema,

    onSubmit: (values) => {
      console.log(values);
      updateData(values);
    },
  });

  const updateData = async (values) => {
    try {
      let users = await axios.post(
        `http://localhost:4000/user/profileupdate`,
        values
      );
      if (users.status == "201") {
        Cookies.set("mobile_number", users.data.profession, {
          secure: true,
          expires: 7,
          path: "/",
        });
        alert(users.data.message);
        navigate("/innorview");
      } else {
        alert(users.message);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div>
      <form
        className=" d-flex flex-column mx-auto gap-6"
        onSubmit={formik.handleSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

          <div className="d-flex w-100 justify-content-between gap-6 experience-sub-container2">
            <DatePicker
              className="w-100"
              onError={(newError) => setError(newError)}
              slotProps={{
                textField: {
                  helperText: errorMessage,
                },
              }}
              label="Date of birth"
              disableFuture
              views={["year", "month", "day"]}
              format="DD-MM-YYYY"
            />

            {/* <TextField
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
            /> */}

            <TextField
              className="w-100"
              id="outlined-basic"
              label="Alternative Phone Number"
              variant="outlined"
              placeholder="Enter your alternative mobile number"
              value={formik.values.alterPhoneNumber}
              onChange={formik.handleChange}
              name="alterPhoneNumber"
              onBlur={formik.handleBlur}
              error={
                formik.touched.alterPhoneNumber &&
                formik.errors.alterPhoneNumber
              }
              helperText={
                formik.touched.alterPhoneNumber &&
                formik.errors.alterPhoneNumber
                  ? formik.errors.alterPhoneNumber
                  : null
              }
            />
          </div>

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

          <TextField
            type="file"
            accept="application/pdf"
            value={formik.values.resume}
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter a Attach File"
            onChange={formik.handleChange}
            name="resume"
            error={formik.touched.resume && formik.errors.resume}
            helperText={
              formik.touched.resume && formik.errors.resume
                ? formik.errors.resume
                : null
            }
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Resume</InputAdornment>
              ),
            }}
          />
          <div className="d-flex">
            <Button color="primary" type="submit">
              Next
            </Button>
            {close}
          </div>
        </LocalizationProvider>
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
