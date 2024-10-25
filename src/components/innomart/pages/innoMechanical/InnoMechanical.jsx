
import React, { useState, useEffect } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './InnoMechanical.css';
import Header from "../../../Header/Header";

const InnoMechanical = () => {
  

  const [selectedOption, setSelectedOption] = useState('normal');
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState({
    delivery: false,
    services: false,
    offered: false,
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState(false);
  const [manufacturingServices, setManufacturingServices] = useState({
    smallBatch: false,
    largeVolume: false,
    prototype: false,
  });
  const [offeredServices, setOfferedServices] = useState({
    cncMachining: false,
    forging: false,
    printing: false,
    molding: false,
    sheetMetal: false,
    dieCasting: false,
    gearCutting: false,
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [offeredError, setOfferedError] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState(false);
  const [gstin, setGstin] = useState('');
  const [gstinError, setGstinError] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [contactNumberError, setContactNumberError] = useState(false);
  const [specialInstruction, setSpecialInstruction] = useState('');
  const [specialInstructionError, setSpecialInstructionError] = useState(false);

  useEffect(() => {
    updateDeliveryDates(selectedOption);
  }, [selectedOption]);

  const updateDeliveryDates = (option) => {
    const dates = [];
    const currentDate = new Date();

    if (option === 'fast') {
      for (let i = 0; i < 5; i++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + i);
        dates.push(futureDate.toISOString().split('T')[0]);
      }
    }

    setDeliveryDates(dates);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  const handleDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setSelectedDate(formattedDate);
    setIsOptionSelected(true);
    setIsAccordionOpen((prev) => ({ ...prev, delivery: false }));
    setError(false);
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setManufacturingServices((prev) => ({ ...prev, [name]: checked }));
    setServiceError(false);
  };

  const handleOfferedChange = (e) => {
    const { name, checked } = e.target;
    setOfferedServices((prev) => ({ ...prev, [name]: checked }));
    setOfferedError(false);
  };

  const handleSelectAllChange = (e) => {
    const { checked } = e.target;
    setManufacturingServices({
      smallBatch: checked,
      largeVolume: checked,
      prototype: checked,
    });
    setServiceError(false);
  };

  const handleSelectAllOfferedChange = (e) => {
    const { checked } = e.target;
    setOfferedServices({
      cncMachining: checked,
      forging: checked,
      printing: checked,
      molding: checked,
      sheetMetal: checked,
      dieCasting: checked,
      gearCutting: checked,
    });
    setOfferedError(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ['.zip', '.stl', '.3d'];
      const fileExtension = file.name.split('.').pop();
      if (validExtensions.includes(`.${fileExtension}`) || file.type === 'application/zip') {
        setFile(file);
        setFileError(false);
      } else {
        setFile(null);
        setFileError(true);
      }
    } else {
      setFile(null);
      setFileError(true);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateGstin = (gstin) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const validateContactNumber = (contactNumber) => {
    const contactNumberRegex = /^[0-9]{10}$/;
    return contactNumberRegex.test(contactNumber);
  };

  const handleSubmit = () => {
    let valid = true;

    if (!file) {
      setFileError(true);
      valid = false;
    }

    if (!selectedDate) {
      setError(true);
      setIsAccordionOpen((prev) => ({ ...prev, delivery: true }));
      valid = false;
    }

    const selectedServices = Object.keys(manufacturingServices).filter(
      (service) => manufacturingServices[service]
    );

    if (selectedServices.length === 0) {
      setServiceError(true);
      setIsAccordionOpen((prev) => ({ ...prev, services: true }));
      valid = false;
    }

    const selectedOfferedServices = Object.keys(offeredServices).filter(
      (service) => offeredServices[service]
    );

    if (selectedOfferedServices.length === 0) {
      setOfferedError(true);
      setIsAccordionOpen((prev) => ({ ...prev, offered: true }));
      valid = false;
    }

    if (companyName.trim() === '') {
      setCompanyNameError(true);
      valid = false;
    } else {
      setCompanyNameError(false);
    }

    if (!validateGstin(gstin)) {
      setGstinError(true);
      valid = false;
    } else {
      setGstinError(false);
    }

    if (name.trim() === '') {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!validateContactNumber(contactNumber)) {
      setContactNumberError(true);
      valid = false;
    } else {
      setContactNumberError(false);
    }

    if (specialInstruction.trim() === '') {
      setSpecialInstructionError(true);
      valid = false;
    } else {
      setSpecialInstructionError(false);
    }

    if (valid) {
      const deliveryType = selectedOption === 'normal' ? 'Normal Delivery' : 'Fast Delivery';
      const result = {
        companyName,
        gstin,
        name,
        email,
        contactNumber,
        specialInstruction,
        file: file.name,
        [deliveryType]: selectedDate,
        manufacturingServices: selectedServices,
        offeredServices: selectedOfferedServices,
      };
      console.log('Form submitted successfully:', result);
      alert(`Form submitted: ${JSON.stringify(result)}`);
    }
  };

  const toggleAccordion = (panel) => () => {
    setIsAccordionOpen((prev) => ({ ...prev, [panel]: !prev[panel] }));
  };


  return (
    <div className="innomechanical-container">
      <div className="innomechanical-header">
        <Header />
      </div>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <TextField
        required
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={companyName}
        onChange={(e) => {
          setCompanyName(e.target.value);
          setCompanyNameError(false); // Clear error on change
        }}
        error={companyNameError}
        helperText={companyNameError ? 'Company name is required.' : ''}
      />
      <TextField
        required
        label="GSTIN"
        variant="outlined"
        fullWidth
        margin="normal"
        value={gstin}
        onChange={(e) => {
          setGstin(e.target.value);
          setGstinError(false); // Clear error on change
        }}
        error={gstinError}
        helperText={gstinError ? 'Please enter a valid GSTIN.' : ''}
      />
      <TextField
        required
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setNameError(false)
        }}
        error={nameError}
        helperText={nameError ? 'Name is required.' : ''}
      />
      <TextField
        required
        label="Email"
        variant="outlined"

        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setEmailError(false)
        }}
        error={emailError}
        helperText={emailError ? 'Please enter a valid email.' : ''}
      />
      <TextField
        required
        label="Contact Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contactNumber}
        onChange={(e) => {
          setContactNumber(e.target.value)
          setContactNumberError(false)
        }}
        error={contactNumberError}
        helperText={contactNumberError ? 'Please enter a valid contact number.' : ''}
      />
      <TextField
        label="Special Instruction"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={specialInstruction}
        onChange={(e) => {
          setSpecialInstruction(e.target.value)
          setSpecialInstructionError(false)
        }}
        error={specialInstructionError }
        helperText={specialInstructionError ? 'Special instruction is required.' : ''}
      />
      <Box >
        <TextField
          accept=".zip,.stl,.3d"
          required
        
          variant="outlined"
          fullWidth
          margin="normal"
          id="file-upload"
          type="file"
          onChange={
            handleFileChange
          }
          error={fileError }

        />
        <label htmlFor="file-upload">
         
          {fileError && <FormHelperText error>Invalid file format. Only .zip, .stl, .3d allowed.</FormHelperText>}
        </label>
     
      </Box>
      <MuiAccordion
        className={`accordion ${isAccordionOpen.delivery ? 'accordion-expanded' : ''}`}
        expanded={isAccordionOpen.delivery}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={`accordion-summary ${isAccordionOpen.delivery ? 'accordion-summary-expanded' : ''}`}
          onClick={toggleAccordion('delivery')}
        >
          <Typography>Delivery Date : {`${selectedOption}  :  ${selectedDate} `}</Typography>
        </AccordionSummary>
        <AccordionDetails className={`accordion-details ${error ? 'form-control-error' : ''}`}>
          <FormControl
            fullWidth
            variant="outlined"
            error={error && selectedOption === 'normal'}
            className={error && selectedOption === 'normal' ? 'form-control-error' : ''}
          >
            <InputLabel id="delivery-select-label">Choose Delivery type</InputLabel>
            <Select
              labelId="delivery-select-label"
              id="deliveryType"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setSelectedDate('');
                setIsOptionSelected(false);
                setError(false);
              }}
              label="Choose Delivery type"
            >
              <MenuItem value="normal">Normal Delivery</MenuItem>
              <MenuItem value="fast">Fast Delivery</MenuItem>
            </Select>
            {error && selectedOption === 'normal' && (
              <FormHelperText error>Please select a delivery date.</FormHelperText>
            )}
          </FormControl>
          <br /><br />
          {selectedOption === 'normal' ? (
            <TextField
              fullWidth
              id="normalDeliveryDate"
              label="Select Delivery Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
              onChange={handleDateChange}
              variant="outlined"
              className={error ? 'error-highlight' : ''}
              error={error}
              helperText={error ? 'Please select a delivery date.' : ''}
            />
          ) : (
            <FormControl
              fullWidth
              variant="outlined"
              error={error && selectedOption === 'fast'}
              className={error && selectedOption === 'fast' ? 'form-control-error' : ''}
            >
              <InputLabel id="fast-delivery-date-label">Select Delivery Date</InputLabel>
              <Select
                labelId="fast-delivery-date-label"
                id="fastDeliveryDate"
                value={selectedDate}
                onChange={(e) => {
                  const formattedDate = formatDate(e.target.value);
                  setSelectedDate(formattedDate);
                  setIsOptionSelected(true);
                  setIsAccordionOpen((prev) => ({ ...prev, delivery: false }));
                  setError(false);
                }}
                label="Select Delivery Date"
              >
                {deliveryDates.map((date) => (
                  <MenuItem key={date} value={date}>
                    {formatDate(date)}
                  </MenuItem>
                ))}
              </Select>
              {error && selectedOption === 'fast' && (
                <FormHelperText error>Please select a delivery date.</FormHelperText>
              )}
            </FormControl>
          )}
        </AccordionDetails>
      </MuiAccordion>

      <MuiAccordion
        className={`accordion ${isAccordionOpen.services ? 'accordion-expanded' : ''}`}
        expanded={isAccordionOpen.services}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className={`accordion-summary ${isAccordionOpen.services ? 'accordion-summary-expanded' : ''}`}
          onClick={toggleAccordion('services')}
        >
          <Typography>Manufacturing Services</Typography>
        </AccordionSummary>
        <AccordionDetails className={`accordion-details ${serviceError ? 'form-control-error' : ''}`}>
          <FormGroup className="manufacturing-services">
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    manufacturingServices.smallBatch &&
                    manufacturingServices.largeVolume &&
                    manufacturingServices.prototype
                  }
                  onChange={handleSelectAllChange}
                  name="selectAll"
                />
              }
              label="Select All"
              className="select-all"
            />
            <Box className="checkbox-group">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={manufacturingServices.smallBatch}
                    onChange={handleServiceChange}
                    name="smallBatch"
                  />
                }
                label="Small Batch Production"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={manufacturingServices.largeVolume}
                    onChange={handleServiceChange}
                    name="largeVolume"
                  />
                }
                label="Large Volume Production"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={manufacturingServices.prototype}
                    onChange={handleServiceChange}
                    name="prototype"
                  />
                }
                label="Prototype Production"
                className="checkbox-item"
              />
            </Box>
          </FormGroup>
          {serviceError && (
            <FormHelperText error>Please select at least one manufacturing service.</FormHelperText>
          )}
        </AccordionDetails>
      </MuiAccordion>

      <MuiAccordion
        className={`accordion ${isAccordionOpen.offered ? 'accordion-expanded' : ''}`}
        expanded={isAccordionOpen.offered}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          className={`accordion-summary ${isAccordionOpen.offered ? 'accordion-summary-expanded' : ''}`}
          onClick={toggleAccordion('offered')}
        >
          <Typography>Services Offered</Typography>
        </AccordionSummary>
        <AccordionDetails className={`accordion-details ${offeredError ? 'form-control-error' : ''}`}>
          <FormGroup className="services-offered">
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    offeredServices.cncMachining &&
                    offeredServices.forging &&
                    offeredServices.printing &&
                    offeredServices.molding &&
                    offeredServices.sheetMetal &&
                    offeredServices.dieCasting &&
                    offeredServices.gearCutting
                  }
                  onChange={handleSelectAllOfferedChange}
                  name="selectAll"
                />
              }
              label="Select All"
              className="select-all"
            />
            <Box className="checkbox-group">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offeredServices.cncMachining}
                    onChange={handleOfferedChange}
                    name="cncMachining"
                  />
                }
                label="CNC Machining"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offeredServices.forging}
                    onChange={handleOfferedChange}
                    name="forging"
                  />
                }
                label="Forging (Hot and Cold)"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offeredServices.printing}
                    onChange={handleOfferedChange}
                    name="printing"
                  />
                }
                label="3D Printing"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offeredServices.molding}
                    onChange={handleOfferedChange}
                    name="molding"
                  />
                }
                label="Injection Molding"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offeredServices.sheetMetal}
                    onChange={handleOfferedChange}
                    name="sheetMetal"
                  />
                }
                label="Sheet Metal"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offeredServices.dieCasting}
                    onChange={handleOfferedChange}
                    name="dieCasting"
                  />
                }
                label="Gravity Die Casting"
                className="checkbox-item"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offeredServices.gearCutting}
                    onChange={handleOfferedChange}
                    name="gearCutting"
                  />
                }
                label="Gear Cutting (in Future)"
                className="checkbox-item"
              />
            </Box>
          </FormGroup>
          {offeredError && (
            <FormHelperText error>Please select at least one service offered.</FormHelperText>
          )}
        </AccordionDetails>
      </MuiAccordion>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>

    </div>
  );
};

export default InnoMechanical;













// import React, { useMemo, useState } from "react";
// import Header from "../../../Header/Header";
// import "./InnoMechanical.css";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const InnoMechanical = () => {
//   const tomorrow = dayjs().add(2, "day");
//   const today = dayjs();

//   const [error, setError] = useState(null);
//   const [checkboxes, setCheckboxes] = useState({
//     selectAll: false,
//     smallBatchProduction: false,
//     largeVolumeProduction: false,
//     prototypeProduction: false,
//   });

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     if (name === "selectAll") {
//       setCheckboxes({
//         selectAll: checked,
//         smallBatchProduction: checked,
//         largeVolumeProduction: checked,
//         prototypeProduction: checked,
//       });
//     } else {
//       setCheckboxes({
//         ...checkboxes,
//         [name]: checked,
//         selectAll: false,
//       });
//     }
//   };

//   const errorMessage = useMemo(() => {
//     switch (error) {
//       case "maxDate":
//       case "minDate":
//         return "Please select a fast track date";
//       case "invalidDate":
//         return "Your date is not valid";
//       default:
//         return "";
//     }
//   }, [error]);

//   const formValidationSchema = yup.object({
//     companyName: yup.string().required(),
//     gstin: yup.string().required(),
//     name: yup.string().required(),
//     email: yup.string().required(),
//     contactNumber: yup.string().required(),
//     specialInstruction: yup.string().required(),
//     attachFile: yup.string().required(),
//     manufacture: yup.object().test(
//       'at-least-one-checked',
//       'At least one manufacture option must be selected',
//       (value) => value && Object.values(value).includes(true)
//     )
//   });

//   const formik = useFormik({
//     initialValues: {
//       companyName: "",
//       gstin: "",
//       name: "",
//       email: "",
//       contactNumber: "",
//       specialInstruction: "",
//       attachFile: "",
//       manufacture: checkboxes,
//     },
//     validationSchema: formValidationSchema,
//     onSubmit: (values) => {
//       const selectedCheckboxes = Object.keys(checkboxes)
//         .filter((key) => key !== "selectAll" && checkboxes[key])
//         .reduce((obj, key) => {
//           obj[key] = checkboxes[key];
//           return obj;
//         }, {});

//       const output = {
//         ...values,
//         manufacture: selectedCheckboxes,
//       };

//       console.log(JSON.stringify(output, null, 2));
//     },
//   });

//   const navigate = useNavigate();

//   return (
//     <div className="innomechanical-container">
//       <div className="innomechanical-header">
//         <Header />
//       </div>
//       <form className="innomechanical-form" onSubmit={formik.handleSubmit}>
//         <TextField
//           value={formik.values.companyName}
//           className="CompanyName"
//           id="outlined-basic"
//           label="Company Name"
//           variant="outlined"
//           placeholder="Enter your company name"
//           onChange={formik.handleChange}
//           name="companyName"
//           error={formik.touched.companyName && formik.errors.companyName}
//           helperText={formik.touched.companyName && formik.errors.companyName ? formik.errors.companyName : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.gstin}
//           className="gstin"
//           id="outlined-basic"
//           label="GSTIN"
//           variant="outlined"
//           placeholder="Enter your GSTIN"
//           onChange={formik.handleChange}
//           name="gstin"
//           error={formik.touched.gstin && formik.errors.gstin}
//           helperText={formik.touched.gstin && formik.errors.gstin ? formik.errors.gstin : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.name}
//           className="name"
//           id="outlined-basic"
//           label="Name"
//           variant="outlined"
//           placeholder="Enter a name"
//           onChange={formik.handleChange}
//           name="name"
//           error={formik.touched.name && formik.errors.name}
//           helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.email}
//           id="outlined-basic"
//           label="Email"
//           variant="outlined"
//           placeholder="Enter an email"
//           onChange={formik.handleChange}
//           name="email"
//           error={formik.touched.email && formik.errors.email}
//           helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.contactNumber}
//           id="outlined-basic"
//           label="Contact Number"
//           variant="outlined"
//           placeholder="Enter your contact number"
//           onChange={formik.handleChange}
//           name="contactNumber"
//           error={formik.touched.contactNumber && formik.errors.contactNumber}
//           helperText={formik.touched.contactNumber && formik.errors.contactNumber ? formik.errors.contactNumber : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.specialInstruction}
//           id="outlined-basic"
//           label="Special Instruction"
//           variant="outlined"
//           placeholder="Enter your special instruction"
//           onChange={formik.handleChange}
//           name="specialInstruction"
//           error={formik.touched.specialInstruction && formik.errors.specialInstruction}
//           helperText={formik.touched.specialInstruction && formik.errors.specialInstruction ? formik.errors.specialInstruction : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.attachFile}
//           id="outlined-basic"
//           label="Attach File"
//           variant="outlined"
//           placeholder="Attach a file"
//           onChange={formik.handleChange}
//           name="attachFile"
//           error={formik.touched.attachFile && formik.errors.attachFile}
//           helperText={formik.touched.attachFile && formik.errors.attachFile ? formik.errors.attachFile : null}
//           onBlur={formik.handleBlur}
//         />
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography>Manufacture Options</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <div className={formik.touched.manufacture && formik.errors.manufacture ? "checkbox-group error" : "checkbox-group"}>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="selectAll"
//                   checked={checkboxes.selectAll}
//                   onChange={handleCheckboxChange}
//                 />
//                 Select All
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="smallBatchProduction"
//                   checked={checkboxes.smallBatchProduction}
//                   onChange={handleCheckboxChange}
//                 />
//                 Small Batch Production
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="largeVolumeProduction"
//                   checked={checkboxes.largeVolumeProduction}
//                   onChange={handleCheckboxChange}
//                 />
//                 Large Volume Production
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="prototypeProduction"
//                   checked={checkboxes.prototypeProduction}
//                   onChange={handleCheckboxChange}
//                 />
//                 Prototype Production
//               </label>
//               <br />
//               {formik.touched.manufacture && formik.errors.manufacture ? (
//                 <div className="error">{formik.errors.manufacture}</div>
//               ) : null}
//             </div>
//           </AccordionDetails>
//         </Accordion>
//         <Button variant="contained" type="submit">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default InnoMechanical;












// import React, { useState } from "react";
// import Header from "../../../Header/Header";
// import "./InnoMechanical.css";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const InnoMechanical = () => {
//   const [manufactureCheckboxes, setManufactureCheckboxes] = useState({
//     selectAll: false,
//     smallBatchProduction: false,
//     largeVolumeProduction: false,
//     prototypeProduction: false,
//   });

//   const [serviceCheckboxes, setServiceCheckboxes] = useState({
//     selectAll: false,
//     cncMachining: false,
//     forging: false,
//     printing3D: false,
//     injectionMolding: false,
//     sheetMetal: false,
//     gravityDieCasting: false,
//     gearCutting: false,
//   });

//   const handleCheckboxChange = (event, setState) => {
//     const { name, checked } = event.target;
//     if (name === "selectAll") {
//       setState({
//         selectAll: checked,
//         smallBatchProduction: checked,
//         largeVolumeProduction: checked,
//         prototypeProduction: checked,
//         cncMachining: checked,
//         forging: checked,
//         printing3D: checked,
//         injectionMolding: checked,
//         sheetMetal: checked,
//         gravityDieCasting: checked,
//         gearCutting: checked,
//       });
//     } else {
//       setState({
//         ...manufactureCheckboxes,
//         [name]: checked,
//         selectAll: true,
//       });
//     }
//   };

//   const formValidationSchema = yup.object().shape({
//     companyName: yup.string().required(),
//     gstin: yup.string().required(),
//     name: yup.string().required(),
//     email: yup.string().required(),
//     contactNumber: yup.string().required(),
//     specialInstruction: yup.string().required(),
//     attachFile: yup.string().required(),
//     manufacture: yup.object().shape({
//       smallBatchProduction: yup.boolean(),
//       largeVolumeProduction: yup.boolean(),
//       prototypeProduction: yup.boolean(),
//     }).test({
//       name: "atLeastOneManufacture",
//       message: "At least one manufacturing option must be selected",
//       test: (value) => {
//         const { smallBatchProduction, largeVolumeProduction, prototypeProduction } = value;
//         return smallBatchProduction || largeVolumeProduction || prototypeProduction;
//       }
//     }),
//     service: yup.object().shape({
//       cncMachining: yup.boolean(),
//       forging: yup.boolean(),
//       printing3D: yup.boolean(),
//       injectionMolding: yup.boolean(),
//       sheetMetal: yup.boolean(),
//       gravityDieCasting: yup.boolean(),
//       gearCutting: yup.boolean(),
//     }).test({
//       name: "atLeastOneService",
//       message: "At least one service option must be selected",
//       test: (value) => {
//         const { cncMachining, forging, printing3D, injectionMolding, sheetMetal, gravityDieCasting, gearCutting } = value;
//         return cncMachining || forging || printing3D || injectionMolding || sheetMetal || gravityDieCasting || gearCutting;
//       }
//     }),
//   });

//   const formik = useFormik({
//     initialValues: {
//       companyName: "",
//       gstin: "",
//       name: "",
//       email: "",
//       contactNumber: "",
//       specialInstruction: "",
//       attachFile: "",
//       manufacture: manufactureCheckboxes,
//       service: serviceCheckboxes,
//     },
//     validationSchema: formValidationSchema,
//     onSubmit: (values) => {
//       console.log(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <div className="innomechanical-container">
//       <div className="innomechanical-header">
//         <Header />
//       </div>
//       <form className="innomechanical-form" onSubmit={formik.handleSubmit}>
//         <TextField
//           value={formik.values.companyName}
//           className="CompanyName"
//           id="outlined-basic"
//           label="Company Name"
//           variant="outlined"
//           placeholder="Enter your company name"
//           onChange={formik.handleChange}
//           name="companyName"
//           error={formik.touched.companyName && formik.errors.companyName}
//           helperText={formik.touched.companyName && formik.errors.companyName ? formik.errors.companyName : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.gstin}
//           className="gstin"
//           id="outlined-basic"
//           label="GSTIN"
//           variant="outlined"
//           placeholder="Enter your GSTIN"
//           onChange={formik.handleChange}
//           name="gstin"
//           error={formik.touched.gstin && formik.errors.gstin}
//           helperText={formik.touched.gstin && formik.errors.gstin ? formik.errors.gstin : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.name}
//           className="name"
//           id="outlined-basic"
//           label="Name"
//           variant="outlined"
//           placeholder="Enter a name"
//           onChange={formik.handleChange}
//           name="name"
//           error={formik.touched.name && formik.errors.name}
//           helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.email}
//           id="outlined-basic"
//           label="Email"
//           variant="outlined"
//           placeholder="Enter an email"
//           onChange={formik.handleChange}
//           name="email"
//           error={formik.touched.email && formik.errors.email}
//           helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.contactNumber}
//           id="outlined-basic"
//           label="Contact Number"
//           variant="outlined"
//           placeholder="Enter your contact number"
//           onChange={formik.handleChange}
//           name="contactNumber"
//           error={formik.touched.contactNumber && formik.errors.contactNumber}
//           helperText={formik.touched.contactNumber && formik.errors.contactNumber ? formik.errors.contactNumber : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.specialInstruction}
//           id="outlined-basic"
//           label="Special Instruction"
//           variant="outlined"
//           placeholder="Enter your special instruction"
//           onChange={formik.handleChange}
//           name="specialInstruction"
//           error={formik.touched.specialInstruction && formik.errors.specialInstruction}
//           helperText={formik.touched.specialInstruction && formik.errors.specialInstruction ? formik.errors.specialInstruction : null}
//           onBlur={formik.handleBlur}
//         />
//         <TextField
//           value={formik.values.attachFile}
//           id="outlined-basic"
//           label="Attach File"
//           variant="outlined"
//           placeholder="Attach a file"
//           onChange={formik.handleChange}
//           name="attachFile"
//           error={formik.touched.attachFile && formik.errors.attachFile}
//           helperText={formik.touched.attachFile && formik.errors.attachFile ? formik.errors.attachFile : null}
//           onBlur={formik.handleBlur}
//         />

//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//          <DatePicker
//            onError={(newError) => setError(newError)}
//            slotProps={{
//              textField: {
//                helperText: errorMessage,
//              },
//            }}
//          defaultValue={tomorrow}
//          minDate={tomorrow}
//          maxDate={tomorrow}
//          views={["year", "month", "day"]}
//           format="DD-MM-YYYY"
//         />

         
//       </LocalizationProvider>

// //          {/* <StaticDatePicker defaultValue={dayjs('2022-04-17')} /> */}


//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography>Manufacturing Options</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="selectAll"
//                   checked={manufactureCheckboxes.selectAll}
//                   onChange={(e) => handleCheckboxChange(e, setManufactureCheckboxes)}
//                 />
//                 Select All
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="smallBatchProduction"
//                   checked={manufactureCheckboxes.smallBatchProduction}
//                   onChange={(e) => handleCheckboxChange(e, setManufactureCheckboxes)}
//                 />
//                 Small Batch Production
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="largeVolumeProduction"
//                   checked={manufactureCheckboxes.largeVolumeProduction}
//                   onChange={(e) => handleCheckboxChange(e, setManufactureCheckboxes)}
//                 />
//                 Large Volume Production
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="prototypeProduction"
//                   checked={manufactureCheckboxes.prototypeProduction}
//                   onChange={(e) => handleCheckboxChange(e, setManufactureCheckboxes)}
//                 />
//                 Prototype Production
//               </label>
//               <br />
//             </div>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography>Services Offered</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="selectAll"
//                   checked={serviceCheckboxes.selectAll}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 Select All
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="cncMachining"
//                   checked={serviceCheckboxes.cncMachining}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 CNC Machining
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="forging"
//                   checked={serviceCheckboxes.forging}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 Forging (Hot and Cold)
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="printing3D"
//                   checked={serviceCheckboxes.printing3D}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 3D Printing
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="injectionMolding"
//                   checked={serviceCheckboxes.injectionMolding}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 Injection Molding
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="sheetMetal"
//                   checked={serviceCheckboxes.sheetMetal}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 Sheet Metal
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="gravityDieCasting"
//                   checked={serviceCheckboxes.gravityDieCasting}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 Gravity Die Casting
//               </label>
//               <br />
//               <label>
//                 <input
//                   type="checkbox"
//                   name="gearCutting"
//                   checked={serviceCheckboxes.gearCutting}
//                   onChange={(e) => handleCheckboxChange(e, setServiceCheckboxes)}
//                 />
//                 Gear Cutting (in Future)
//               </label>
//               <br />
//             </div>
//           </AccordionDetails>
//         </Accordion>
//         <Button variant="contained" type="submit" disabled={!formik.isValid}>
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default InnoMechanical;
