// import * as React from "react";
// import Box from "@mui/material/Box";
// import { MenuItem, Select, TextField } from "@mui/material";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import SelectOrderId from "../Quatation/SelectOrderId";

// const useStyles = styled({
//   cardContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     // justifyContent: "flex",
//     height: "100%",
//   },
//   card: {
//     width: "100%",
//     maxWidth: 600,
//     padding: 24, // Increase padding for a more spacious look
//     borderRadius: 8,
//     backgroundColor: "#ffffff",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   },
//   heading: {
//     fontSize: 32, // Increase heading font size
//     fontWeight: "bold",
//     marginBottom: 20, // Increase margin for spacing
//   },
//   textInput: {
//     marginBottom: 20, // Increase margin for spacing
//     fontSize: 18, // Increase font size
//   },
//   dateInput: {
//     marginBottom: 20, // Increase margin for spacing
//     fontSize: 18, // Increase font size
//   },
//   approveButton: {
//     marginTop: 30, // Increase margin for spacing
//     marginBottom: 12, // Increase margin for spacing
//     fontSize: 20, // Increase font size
//     marginRight: 20,
//     transition: "transform 0.3s",
//     "&:hover": {
//       transform: "scale(1.1)",
//     },
//   },
//   disabledButton: {
//     marginTop: 30, // Increase margin for spacing
//     marginBottom: 12, // Increase margin for spacing
//     opacity: 0.6,
//     pointerEvents: "none",
//     fontSize: 20, // Increase font size
//   },
// });

// export default function ExceptionInput() {
//   const classes = useStyles();
//   const isPDF = (fileName) => {
//     return fileName.endsWith(".pdf");
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     console.log(selectedFile);

//     if (selectedFile) {
//       console.log(selectedFile);
//       // Check if the selected file is in PDF format
//       if (isPDF(selectedFile.name)) {
//         console.log("Selected file is a PDF:", selectedFile);
//         // You can now handle the PDF file as needed.

//         // Enable the "Upload Quotation" button
//         document.getElementById("upload-button").removeAttribute("disabled");
//       } else {
//         console.log("Selected file is not a PDF. Please select a PDF file.");
//         // You can display an error message or take other actions if the file is not a PDF.

//         // Disable the "Upload Quotation" button
//         document
//           .getElementById("upload-button")
//           .setAttribute("disabled", "disabled");
//       }
//     }
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1, width: "25ch" },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div
//         style={{
//           display: "flex",
//           width: "96%",
//           gap: "3px",
//         }}
//       >
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           style={{ width: "20%" }}
//           // onChange={handleChange}
//         >
//           <MenuItem value={10}>+91</MenuItem>
//         </Select>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           style={{ width: "100%" }}

//           // onChange={handleChange}
//         >
//           <MenuItem value={10}>8144360244</MenuItem>
//         </Select>
//       </div>
//       <SelectOrderId />

//       <input
//         type="file"
//         id="file-input"
//         accept=" .pdf" // Optional: Specify the file types you want to accept
//         onChange={handleFileChange}
//         style={{
//           padding: "10px",
//           border: "2px solid #dfd6d6",
//           borderRadius: "5px",
//           width: "97%",
//           fontSize: "12px",
//         }}
//       />
//       <Button
//         className={classes.approveButton}
//         variant="contained"
//         color="secondary"
//         // Here you can trigger the download functionality
//         // onClick={handleDownloadPDF}
//         // disabled={!isApproved}
//         style={{
//           float: "right",
//           width: "30%",
//           padding: "10px 0",
//         }}
//       >
//         Upload Exception
//       </Button>
//     </Box>
//   );
// }
