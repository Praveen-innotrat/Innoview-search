import React from "react";
import Header from "../Header/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function StudentFresher() {
  const navigate = useNavigate();

  const courseValidationSchema = yup.object({
    name: yup.string().required(),
    pic: yup.string().required().min(10).url(),
    video: yup.string().required().min(10).url(),
    duration: yup.number().required().min(0).max(12),
    tech: yup.string().required().min(2),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      date: "",
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
      <Header />
      <form className=" d-flex flex-column w-50 mx-auto gap-6" onSubmit={formik.handleSubmit}>
        <div className="experience-sub-container1">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            placeholder="Enter your first name"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />

          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            placeholder="Enter your last name"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />
        </div>

        <div className="experience-sub-container2">
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter your mobile number"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />
          <TextField
            id="outlined-basic"
            label="Date of birth"
            variant="outlined"
            placeholder="Enter your date of birth"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />
        </div>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          placeholder="Enter yuor Email-IDpp"
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Highest Education"
          variant="outlined"
          placeholder="Enter your highest education"
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Department"
          variant="outlined"
          placeholder="Enter the department"
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />

        

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          placeholder="Enter course name"
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          placeholder="Enter course name"
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />
      </form>
    </div>
  );
}
