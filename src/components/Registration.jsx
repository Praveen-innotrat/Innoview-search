// import React from "react";
// import Navbar from "./layout-components/Navbar";
// import StickyFooter from "./layout-components/Footer";
// import { Email, LocalPhone, Person2 } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";
// import { useFormik } from "formik";
// import { signUpSchema } from "../schemas";
// import { Clear as ClearIcon } from "@mui/icons-material";
// import {
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Box,
//   Container,
//   Button,
// } from "@mui/material";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

// const initialValues = {
//   fName: "",
//   lName: "",
//   email: "",
//   tel: "",
// };

// const UserRegistration = () => {
//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit: formikHandleSubmit,
//   } = useFormik({
//     initialValues: initialValues,
//     validationSchema: signUpSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         // Make the API request here
//         const response = await fetch("https://api.innotrat.com:5000/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             first_name: values.fName,
//             last_name: values.lName,
//             mobile_number: values.tel,
//             email: values.email,
//           }),
//         });
//         const data = await response.json();

//         if (!response.ok) {
//           console.error("Error registering user.");
//           toast.error(data.message);
//           window.location.href = "/cart";

//         } else if (data.success) {
//           toast.success("Registration completed successfully!", {
//             autoClose: 100,
//             onClose: () => {
//               window.location.href = "/cart";
//             },
//           });
//           Cookies.set("user_number", values.tel, {
//             secure: true,
//             expires: 7,
//             path: "/",
//           });          // Cookies.set("token", data.token);
//           resetForm();
//         }
//       } catch (error) {
//         // ... Error handling code ...
//         console.error("Error registering user:", error);
//         toast.error("An unexpected error occurred. Please try again later.");
//       }
//     },
//   });
//   return (
//     <>
//       <Navbar />
//       <form onSubmit={formikHandleSubmit}>
//         <Container
//           sx={{
//             height: "100%",
//             paddingTop: "4rem",
//             paddingBottom:"4rem"
//           }}
//           maxWidth="sm"
//         >
//           <Typography
//             variant="h3"
//             gutterBottom
//             paddingTop={5}
//             paddingBottom={3}
//             textAlign="center"
//             color="#8e372d"
//           >
//             Registration Form
//           </Typography>
//           <Typography
//             variant="p"
//             marginBottom="5px"
//             fontSize="1.5rem"
//             color="#9f6906"
//           >
//             Innotrat Lab. If you have registered already go to service page to
//             continue shoping
//           </Typography>
//           <Paper elevation={6} marginBottom="30px">
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "15px",
//                 padding: "30px",
//               }}
//             >
//               <TextField
//                 label="First Name"
//                 name="fName"
//                 type="name"
//                 id="fName"
//                 required
//                 value={values.fName}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.fName && touched.fName ? (
//                 <Typography variant="p" fontSize="1rem">
//                   {errors.fName}
//                 </Typography>
//               ) : null}

//               <TextField
//                 label="Last Name"
//                 name="lName"
//                 type="name"
//                 id="name"
//                 required
//                 value={values.lName}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.lName && touched.lName ? (
//                 <Typography variant="p" fontSize="1rem">
//                   {errors.lName}
//                 </Typography>
//               ) : null}

//               <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 id="email"
//                 required
//                 value={values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />

//               {errors.email && touched.email ? (
//                 <Typography variant="p" fontSize="1rem">
//                   {errors.email}
//                 </Typography>
//               ) : null}

//               <TextField
//                 label="Mobile Number"
//                 name="tel"
//                 type="tel"
//                 id="mobile-number"
//                 required
//                 value={values.tel}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.tel && touched.tel ? (
//                 <Typography variant="p" fontSize="1rem">
//                   {errors.tel}
//                 </Typography>
//               ) : null}
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
             
             
                      
//             </Box>
              
//           </Paper>
      
//         </Container>
       
//       </form>
//       <ToastContainer />
//       <StickyFooter />
//     </>
//   );
// };
// export default UserRegistration;



import React from "react";
import Navbar from "./layout-components/Navbar";
import StickyFooter from "./layout-components/StickyFooter";
import { Email, LocalPhone, Person2 } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { Clear as ClearIcon } from "@mui/icons-material";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const initialValues = {
  fName: "",
  lName: "",
  email: "",
  tel: "",
};

const UserRegistration = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit: formikHandleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Make the API request here
        const response = await fetch("https://api.innotrat.com:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: values.fName,
            last_name: values.lName,
            mobile_number: values.tel,
            email: values.email,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          console.error("Error registering user.");
          toast.error(data.message);
          window.location.href = "/cart";
        } else if (data.success) {
          toast.success("Registration completed successfully!", {
            autoClose: 100,
            onClose: () => {
              window.location.href = "/cart";
            },
          });
          Cookies.set("user_number", values.tel, {
            secure: true,
            expires: 7,
            path: "/",
          }); // Cookies.set("token", data.token);
          resetForm();
        }
      } catch (error) {
        // ... Error handling code ...
        console.error("Error registering user:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    },
  });
  return (
    <>
      <Navbar />
      <form onSubmit={formikHandleSubmit}>
        <Container
          sx={{
            height: "100%",
            paddingTop: "4rem",
            paddingBottom: "4rem",
          }}
          maxWidth="sm"
        >
          <Typography
            variant="h3"
            gutterBottom
            paddingTop={5}
            paddingBottom={3}
            textAlign="center"
            color="#8e372d"
          >
            Registration Form
          </Typography>
          <Typography
            variant="p"
            marginBottom="5px"
            fontSize="1.5rem"
            color="#9f6906"
          >
            Innotrat Lab. If you have registered already go to service page to
            continue shoping
          </Typography>
          <Paper elevation={6} marginBottom="30px">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                padding: "30px",
              }}
            >
              <TextField
                label="First Name"
                name="fName"
                type="name"
                id="fName"
                required
                value={values.fName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.fName && touched.fName ? (
                <Typography variant="p" fontSize="1rem">
                  {errors.fName}
                </Typography>
              ) : null}

              <TextField
                label="Last Name"
                name="lName"
                type="name"
                id="name"
                required
                value={values.lName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lName && touched.lName ? (
                <Typography variant="p" fontSize="1rem">
                  {errors.lName}
                </Typography>
              ) : null}

              <TextField
                label="Email"
                name="email"
                type="email"
                id="email"
                required
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.email && touched.email ? (
                <Typography variant="p" fontSize="1rem">
                  {errors.email}
                </Typography>
              ) : null}

              <TextField
                label="Mobile Number"
                name="tel"
                type="tel"
                id="mobile-number"
                required
                value={values.tel}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.tel && touched.tel ? (
                <Typography variant="p" fontSize="1rem">
                  {errors.tel}
                </Typography>
              ) : null}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </form>
      {/* <ToastContainer /> */}
      <StickyFooter />
    </>
  );
};
export default UserRegistration;
