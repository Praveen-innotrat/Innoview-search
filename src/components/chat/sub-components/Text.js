// import React, { useEffect, useRef, useState } from "react";
// import { Typography, Button, Input } from "@mui/material";
// import Cookies from "js-cookie";
// import BouncingDotsLoader from "../../../pages/loading";
// import axios from "axios";
// import API_URLS from "../../../config";
// import jsonOptions from "./jsoptions";

// function ResponseText(props) {
//   const { uniqueId } = props;
//   const [responseData, setResponseData] = useState({});
//   const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [selectedData, setSelectedData] = useState({});
//   const [moduleData, setModuleData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userInput, setUserInput] = useState({});
//   const pdfurl = API_URLS.pdfUrl;

//   useEffect(() => {
//     const fetchData = async () => {
//       const URL = "http://localhost:3333/api";

//       try {
//         const response = await fetch(props.text);
//         const data = await response.json();

//         console.log("data", data);

//         console.log(data.Response)

//         const innofabRes = JSON.parse(data.Response);

//         if (innofabRes.moduletype === "InnoFab") {
          

//           console.log(innofabRes.formFields);

//           // Additional functionality: Ask for user input based on formFields
//           const formFieldNames = Object.keys(innofabRes.formFields);
//           formFieldNames.forEach((fieldName) => {
//             setChatHistory((prevChatHistory) => [
//               ...prevChatHistory,
//               {
//                 type: "chatbot",
//                 content: (
//                   <span style={{ fontSize: "15px" }}>
//                     Please enter your {fieldName}
//                   </span>
//                 ),
//               },
//             ]);
//           });
//         } else {
//           // Handle the case when moduletype is not "InnoFab"
//           innofabRes = data;
//         }

//         setResponseData(innofabRes);
//         setSelectedOptions([]);
//         setCurrentFieldIndex(0);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [props.text]);

//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   const handleOptionSelect = async (option) => {
//     const labelName = getCurrentFieldLabelName();
//     setSelectedOptions((prevSelectedOptions) => {
//       const newSelectedOptions = [...prevSelectedOptions];
//       newSelectedOptions[currentFieldIndex] = option;
//       return newSelectedOptions;
//     });

//     setChatHistory((prevChatHistory) => [
//       ...prevChatHistory,
//       {
//         type: "chatbot",
//         content: (
//           <span style={{ fontSize: "15px" }}>
//             Please select the {getCurrentFieldLabelName()}
//           </span>
//         ),
//       },
//       {
//         type: "user",
//         content: <span style={{ fontSize: "15px" }}>{option}</span>,
//       },
//     ]);

//     setSelectedData((prevSelectedData) => ({
//       ...prevSelectedData,
//       [labelName]: option,
//     }));
//     setCurrentFieldIndex((prevIndex) => prevIndex + 1);

//     try {
//       const selectedOptionData = {
//         question: labelName,
//         answer: option,
//         moduleData: jsonOptions[option], // Get JSON data for the selected option
//       };

//       setModuleData((prevModuleData) => [
//         ...prevModuleData,
//         selectedOptionData,
//       ]);

//       // Check if the field is 'gerber' and prompt user to upload a file
//       if (labelName === "gerber") {
//         setChatHistory((prevChatHistory) => [
//           ...prevChatHistory,
//           {
//             type: "chatbot",
//             content: (
//               <div>
//                 Please upload the gerber file:
//                 <Input type="file" onChange={handleFileUpload} />
//               </div>
//             ),
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error fetching module data:", error);
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     setUserInput((prevUserInput) => ({
//       ...prevUserInput,
//       gerber: file,
//     }));
//   };

//   const getCurrentFieldLabelName = () => {
//     const formData = responseData.data.formData;
//     const keys = Object.keys(formData);
//     return keys[currentFieldIndex]
//       ? formData[keys[currentFieldIndex]].labelName
//       : "";
//   };

//   const ModuleDataJSON = moduleData;

//   const handleDownloadJSON = async () => {
//     if (Object.keys(ModuleDataJSON).length > 0) {
//       // Check for any file uploads in userInput and handle them separately
//       const fileUploadPromises = Object.entries(userInput).map(
//         async ([fieldName, file]) => {
//           if (file instanceof File) {
//             // Send the file to the file upload API
//             const fileFormData = new FormData();
//             fileFormData.append("file", file);
//             try {
//               const fileUploadResponse = await axios.post(
//                 "YOUR_FILE_UPLOAD_API_ENDPOINT",
//                 fileFormData,
//                 {
//                   headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: Cookies.get("token"),
//                   },
//                 }
//               );
//               console.log(
//                 `File Upload Response for ${fieldName}:`,
//                 fileUploadResponse.data
//               );

//               // Assuming fieldName is the parameter name for the file upload
//               // You can replace "API_ENDPOINT_FOR_FILE_UPLOAD" with the actual endpoint for file uploads
//               await axios.post(
//                 "API_ENDPOINT_FOR_FILE_UPLOAD",
//                 {
//                   [fieldName]: fileUploadResponse.data.url,
//                 },
//                 {
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: Cookies.get("token"),
//                   },
//                 }
//               );
//             } catch (fileUploadError) {
//               console.error(
//                 `Error uploading file for ${fieldName}:`,
//                 fileUploadError
//               );
//             }
//           }
//         }
//       );

//       // Wait for all file uploads to complete before continuing
//       await Promise.all(fileUploadPromises);

//       try {
//         // Replace "API_ENDPOINT_FOR_NAME", "API_ENDPOINT_FOR_CONTACT", etc., with your actual API endpoints
//         const apiEndpoints = {
//           address: URL + "/address",
//           quantity: URL + "/quantity",
//           phoneNumber: URL + "/phoneNumber",
//           name: URL + "/name",
//           email: URL + "/email",
//           deliveryLocation: URL + "/deliveryLocation",
//           deliveryDate: URL + "/deliveryDate",
//         };

//         // Make API calls for each parameter
//         const apiCalls = Object.entries(apiEndpoints).map(
//           async ([param, endpoint]) => {
//             try {
//               const apiResponse = await axios.post(
//                 endpoint,
//                 { [param]: userInput[param] },
//                 {
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: Cookies.get("token"),
//                   },
//                 }
//               );
//               console.log(`API Response for '${param}':`, apiResponse.data);
//             } catch (apiError) {
//               console.error(`Error making API call for '${param}':`, apiError);
//             }
//           }
//         );

//         // Wait for all API calls to complete
//         await Promise.all(apiCalls);
//       } catch (apiError) {
//         console.error("Error making API calls for parameters:", apiError);
//       }

//       // Continue with the rest of the data processing
//       const blockDiagramJSON = Object.values(ModuleDataJSON)
//         .map((item, index) => {
//           const moduleData = item.moduleData ? item.moduleData[0] : null;
//           const module = moduleData ? Object.keys(moduleData)[0] : null;
//           const pins = moduleData ? moduleData[module].pins : null;

//           return {
//             name: "M" + (index + 1),
//             module: item.answer,
//             pins: pins
//               ? pins
//                   .map((pin) => {
//                     if (index !== 0 && pin.each_mandatory) {
//                       return {
//                         name: pin.name,
//                         type: pin.type,
//                         connectingModule: pin.each_mandatory ? "M1" : pin.name,
//                         connectingPort: pin.con_port,
//                       };
//                     } else if (index === 2 && pin.name === "VOUT") {
//                       return {
//                         name: pin.name,
//                         type: pin.type,
//                       };
//                     } else if (index === 0 && pin.each_mandatory) {
//                       return {
//                         name: pin.name,
//                         type: pin.type,
//                       };
//                     }
//                     return null; // Return null for any other cases
//                   })
//                   .filter((pin) => pin !== null) // Filter out null pins
//               : [],
//           };
//         })
//         .filter((blockItem) => blockItem.pins.length > 0); // Filter out items without pins

//       // const jsonString = JSON.stringify(blockDiagramJSON, null, 2);

//       const obfuscatedBlockDiagramJSON = btoa(
//         JSON.stringify(blockDiagramJSON)
//       );

//       let processingMessageShown = false;
//       const reqURL = `${pdfurl}/process-data`;
//       const checkProcessingStatus = () => {
//         if (!processingMessageShown) {
//           // Show "Still processing" message
//           processingMessageShown = true;
//           setLoading(true);
//         }
//         fetch(reqURL, {
//           method: "POST",
//           cache: "no-store",
//           headers: {
//             "Cache-Control": "no-store",
//             "Content-Type": "application/json",
//             Authorization: Cookies.get("token"),
//           },
//           body: JSON.stringify({
//             mobile_number: Cookies.get("mobile_number"),
//             token: Cookies.get("token"),
//             timestamp: new Date().toISOString(),
//             data: obfuscatedBlockDiagramJSON,
//             uniqueId: uniqueId,
//           }),
//         })
//           .then((response) => response.json())
//           .then((responseData) => {
//             if (responseData.success) {
//               if (responseData.status === 0) {
//                 setLoading(true);

//                 // Re-send the data for processing again
//                 setTimeout(handleDownloadJSON, 10000); // Wait for 3 seconds before retrying
//               } else if (responseData.status === 1) {
//                 setLoading(false);
//                 const downloadPDF = () => {
//                   fetch(responseData.result)
//                     .then((response) => response.blob())
//                     .then((blob) => {
//                       const url = URL.createObjectURL(blob);
//                       const link = document.createElement("a");
//                       link.href = url;
//                       link.download = "result.pdf";
//                       link.click();
//                       URL.revokeObjectURL(url);
//                     });
//                 };

//                 setChatHistory((prevChatHistory) => [
//                   ...prevChatHistory,
//                   {
//                     type: "chatbot",
//                     content: (
//                       <span style={{ fontSize: "15px" }}>
//                         Your requirement is ready! Check the result{" "}
//                         <a
//                           href={responseData.result}
//                           target="_blank"
//                           onClick={downloadPDF}
//                           rel="noopener noreferrer"
//                         >
//                           here
//                         </a>
//                       </span>
//                     ),
//                   },
//                 ]);
//               }
//             } else {
//               setChatHistory((prevChatHistory) => [
//                 ...prevChatHistory,
//                 {
//                   type: "chatbot",
//                   content: (
//                     <span style={{ fontSize: "15px" }}>
//                       We're sorry, but there was an issue processing your
//                       request. We'll get back to you in 2 to 3 business days.
//                     </span>
//                   ),
//                 },
//               ]);
//             }
//           })
//           .catch((error) => {
//             console.error("API Error:", error);
//           });
//       };
//       checkProcessingStatus();
//     } else {
//       console.log("No data available in moduleData.");
//     }
//   };

//   useEffect(() => {
//     if (
//       Object.keys(ModuleDataJSON).length > 0 &&
//       Object.keys(ModuleDataJSON).length ===
//         Object.keys(responseData.data.formData).length
//     ) {
//       handleDownloadJSON();
//     }
//   }, [ModuleDataJSON]);

//   if (responseData.data && responseData.data.formData) {
//     return (
//       <div
//         style={{
//           maxWidth: "100%",
//           padding: "30px",
//           height: "400px",
//           overflowY: "auto",
//         }}
//       >
//         {chatHistory.map((message, index) => (
//           <div
//             key={index}
//             style={{
//               display: "flex",
//               justifyContent:
//                 message.type === "user" ? "flex-end" : "flex-start",
//               marginBottom: "20px",
//               background: "transparent",
//             }}
//           >
//             <span
//               style={{
//                 backgroundColor:
//                   message.type === "user" ? "#111B47" : "transparent",
//                 color: message.type === "user" ? "#EBEBEB" : "black",
//                 padding: "10px",
//                 borderRadius: "15px",
//                 boxShadow: "0px 2px 4px rgba(0,0,0,0.5)",
//                 maxWidth: "200%",
//                 fontFamily: "Roboto",
//                 fontWeight: "400",
//                 border: "2px solid #091133",
//               }}
//             >
//               {message.content}
//             </span>
//           </div>
//         ))}
//         {loading && (
//           <div
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "blue",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               zIndex: 1000,
//             }}
//           >
//             <BouncingDotsLoader />
//           </div>
//         )}

//         {currentFieldIndex < Object.keys(responseData.data.formData).length && (
//           <div>
//             <Typography variant="body2" style={{ marginBottom: "10px" }}>
//               <label
//                 type="chatbot"
//                 style={{
//                   padding: "10px",
//                   fontSize: "20px",
//                   fontFamily: "Roboto",
//                   fontWeight: "400",
//                   border: "2px solid #091133",
//                   borderRadius: "15px",
//                 }}
//               >
//                 Please select the {getCurrentFieldLabelName()}
//               </label>
//             </Typography>
//             <SelectOptions
//               options={
//                 responseData.data.formData[
//                   Object.keys(responseData.data.formData)[currentFieldIndex]
//                 ].selectoptions
//               }
//               selectedValue={selectedOptions[currentFieldIndex]}
//               handleOptionSelect={handleOptionSelect}
//             />
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         {Object.entries(responseData).map(([key, value]) => (
//           <Typography
//             variant="body2"
//             key={key}
//             sx={{
//               fontSize: "14px",
//               border: "2px solid #093311",
//               padding: "30px",
//               borderRadius: "15px",
//               marginBottom: "20px",
//             }}
//           >
//             <span style={{ color: "text.primary" }}>
//               {" "}
//               {key} : {""}
//               {typeof value === "object"
//                 ? Object.entries(value).map(([innerkey, innervalue]) => (
//                     <div key={innerkey}>
//                       <Typography variant="body2" sx={{ fontSize: "14px" }}>
//                         <span style={{ color: "text.primary" }}>
//                           {" "}
//                           {innerkey}: {innervalue}{" "}
//                         </span>{" "}
//                       </Typography>
//                       <br />
//                     </div>
//                   ))
//                 : value}
//               <br />{" "}
//             </span>{" "}
//             <br />
//           </Typography>
//         ))}
//       </div>
//     );
//   }
// }

// function SelectOptions({ options, selectedValue, handleOptionSelect }) {
//   return (
//     <div>
//       {options.map((opt) => (
//         <Button
//           key={opt}
//           variant={selectedValue === opt ? "contained" : "outlined"}
//           onClick={() => handleOptionSelect(opt)}
//           style={{
//             margin: "5px",
//             fontSize: "15px",
//             borderRadius: "15px",
//             color: "#EBEBEB",
//             background: "#111B47",
//           }}
//         >
//           {opt}
//         </Button>
//       ))}
//     </div>
//   );
// }

// export default ResponseText;












import React, { useEffect, useRef, useState } from "react";
import { Typography, Button } from "@mui/material";
import Cookies from "js-cookie";
import BouncingDotsLoader from "../../../pages/loading";
import jsonOptions from "./jsoptions";
import API_URLS from "../../../config";

function ResponseText(props) {
  const { uniqueId } = props;
  const [responseData, setResponseData] = useState({});
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [moduleData, setModuleData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const pdfurl = API_URLS.pdfUrl;

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(props.text);

        // console.log("props.data : ", props.data);

        const data = await response.json();

        // console.log("data", data);

        setResponseData(data);

        setSelectedOptions([]);
        setCurrentFieldIndex(0);
        if (
          responseData.data &&
          responseData.data.formData &&
          chatHistory.length === 0
        ) {
          setChatHistory([
            {
              type: "chatbot",
              content: (
                <span style={{ fontSize: "15px" }}>
                  {"Great!! I am gathering all the requirements of " +
                    responseData.data.projectName +
                    " Please wait a while."}
                </span>
              ),
            },
          ]);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    // console.log("ChatHistory : ", chatHistory);

    fetchData();
    if (responseData.data && responseData.data.formData) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          type: "chatbot",
          content: "please select the " + getCurrentFieldLabelName(),
        },
      ]);
    }
  }, [props.text]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleOptionSelect = async (option) => {
    const labelName = getCurrentFieldLabelName();
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[currentFieldIndex] = option;
      return newSelectedOptions;
    });

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      {
        type: "chatbot",
        content: (
          <span style={{ fontSize: "15px" }}>
            Please select the {getCurrentFieldLabelName()}
          </span>
        ),
      },
      {
        type: "user",
        content: <span style={{ fontSize: "15px" }}>{option}</span>,
      },
    ]);

    setSelectedData((prevSelectedData) => ({
      ...prevSelectedData,
      [labelName]: option,
    }));
    setCurrentFieldIndex((prevIndex) => prevIndex + 1);

    try {
      const selectedOptionData = {
        question: labelName,
        answer: option,
        moduleData: jsonOptions[option], // Get JSON data for the selected option
      };

      setModuleData((prevModuleData) => [
        ...prevModuleData,
        selectedOptionData,
      ]);
      // ...
    } catch (error) {
      console.error("Error fetching module data:", error);
    }
  };

  const getCurrentFieldLabelName = () => {
    const formData = responseData.data.formData;
    const keys = Object.keys(formData);
    return keys[currentFieldIndex]
      ? formData[keys[currentFieldIndex]].labelName
      : "";
  };

  const ModuleDataJSON = moduleData;
  const handleDownloadJSON = () => {
    // console.log("mod",ModuleDataJSON);
    if (Object.keys(ModuleDataJSON).length > 0) {
      const blockDiagramJSON = Object.values(ModuleDataJSON)
        .map((item, index) => {
          const moduleData = item.moduleData ? item.moduleData[0] : null;
          const module = moduleData ? Object.keys(moduleData)[0] : null;
          const pins = moduleData ? moduleData[module].pins : null;

          return {
            name: "M" + (index + 1),
            module: item.answer,
            pins: pins
              ? pins
                  .map((pin) => {
                    if (index !== 0 && pin.each_mandatory) {
                      return {
                        name: pin.name,
                        type: pin.type,
                        connectingModule: pin.each_mandatory ? "M1" : pin.name,
                        connectingPort: pin.con_port,
                      };
                    } else if (index === 2 && pin.name === "VOUT") {
                      return {
                        name: pin.name,
                        type: pin.type,
                      };
                    } else if (index === 0 && pin.each_mandatory) {
                      return {
                        name: pin.name,
                        type: pin.type,
                      };
                    }
                    return null; // Return null for any other cases
                  })
                  .filter((pin) => pin !== null) // Filter out null pins
              : [],
          };
        })
        .filter((blockItem) => blockItem.pins.length > 0); // Filter out items without pins

      // const jsonString = JSON.stringify(blockDiagramJSON, null, 2);

      const obfuscatedBlockDiagramJSON = btoa(JSON.stringify(blockDiagramJSON));

      let processingMessageShown = false;
      const reqURL = `${pdfurl}/process-data`;
      const checkProcessingStatus = () => {
        if (!processingMessageShown) {
          // Show "Still processing" message
          processingMessageShown = true;
          setLoading(true);
        }
        fetch(reqURL, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": "application/json",
            Authorization: Cookies.get("token"),
          },
          body: JSON.stringify({
            mobile_number: Cookies.get("mobile_number"),
            token: Cookies.get("token"),
            timestamp: new Date().toISOString(),
            data: obfuscatedBlockDiagramJSON,
            uniqueId: uniqueId,
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            // console.log("API Response:", responseData);

            if (responseData.success) {
              if (responseData.status === 0) {
                setLoading(true);

                // Re-send the data for processing again
                setTimeout(handleDownloadJSON, 10000); // Wait for 3 seconds before retrying
              } else if (responseData.status === 1) {
                // Show result link
                setLoading(false);
                const downloadPDF = () => {
                  fetch(responseData.result) // Fetch the PDF data
                    .then((response) => response.blob())
                    .then((blob) => {
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "result.pdf"; // Set the download filename
                      link.click();
                      URL.revokeObjectURL(url);
                    });
                };

                setChatHistory((prevChatHistory) => [
                  ...prevChatHistory,
                  {
                    type: "chatbot",
                    content: (
                      <span style={{ fontSize: "15px" }}>
                        Your requirement is ready! Check the result{" "}
                        <a
                          href={responseData.result}
                          target="_blank"
                          onClick={downloadPDF}
                          rel="noopener noreferrer"
                        >
                          here
                        </a>
                      </span>
                    ),
                  },
                ]);
              }
            } else {
              // Show error message
              setChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                {
                  type: "chatbot",
                  content: (
                    <span style={{ fontSize: "15px" }}>
                      We're sorry, but there was an issue processing your
                      request. We'll get back to you in 2 to 3 business days.
                    </span>
                  ),
                },
              ]);
            }
          })
          .catch((error) => {
            console.error("API Error:", error);
            // Handle the error
          });
      };
      checkProcessingStatus();
    } else {
      console.log("No data available in moduleData.");
    }
  };

  // if (!responseData) {
  //   return null; // Return null or some loading indicator while data is being fetched
  // }

  useEffect(() => {
    if (
      Object.keys(ModuleDataJSON).length > 0 &&
      Object.keys(ModuleDataJSON).length ===
        Object.keys(responseData.data.formData).length
    ) {
      handleDownloadJSON();
    }
  }, [ModuleDataJSON]);

  if (responseData.data && responseData.data.formData) {
    return (
      <div style={{ maxWidth: "100%" ,padding:"30px", height:"400px", overflowY: "auto",}}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                message.type === "user" ? "flex-end" : "flex-start",
              marginBottom: "20px",
              // fontsize:"40px",
              background: "transparent",
            }}
          >
            <span
              style={{
                backgroundColor:
                  message.type === "user" ? "#111B47" : "transparent",
                color: message.type === "user" ? "#EBEBEB" : "black",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 2px 4px rgba(0,0,o,0.5)",
                // fontsize:"20px",
                maxWidth: "200%", // Adjust the width as needed
                fontFamily: "Roboto",
                fontWeight: "400",
                border: "2px solid #091133",
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "blue",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
              zIndex: 1000, // Higher zIndex to overlay the chat
            }}
          >
            <BouncingDotsLoader />
          </div>
        )}

        {currentFieldIndex < Object.keys(responseData.data.formData).length && (
          <div>
            <Typography variant="body2" style={{ marginBottom: "10px" }}>
              <label
                type="chatbot"
                style={{
                  padding: "10px",
                  fontSize: "20px",
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  border: "2px solid #091133",
                  borderRadius: "15px",
                }}
              >
                Please select the {getCurrentFieldLabelName()}
              </label>
            </Typography>
            <SelectOptions
              options={
                responseData.data.formData[
                  Object.keys(responseData.data.formData)[currentFieldIndex]
                ].selectoptions
              }
              selectedValue={selectedOptions[currentFieldIndex]}
              handleOptionSelect={handleOptionSelect}
            />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {Object.entries(responseData).map(([key, value]) => {
          // const lowerCaseValue =
          //   typeof value === "string" ? value.toLowerCase() : value;
          return (
            <Typography
              variant="body2"
              key={key}
              sx={{
                fontSize: "14px",
                border: "2px solid #093311",
                padding: "30px",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            >
              <span style={{ color: "text.primary" }}>
                {" "}
                {key} : {""}
                {typeof value === "object"
                  ? Object.entries(value).map(([innerkey, innervalue]) => {
                      return (
                        <div>
                          <Typography
                            variant="body2"
                            key={innerkey}
                            sx={{ fontSize: "14px" }}
                          >
                            <span style={{ color: "text.primary" }}>
                              {" "}
                              {innerkey}: {innervalue}{" "}
                            </span>{" "}
                          </Typography>

                          <br />
                        </div>
                      );
                    })
                  : value}
                <br />{" "}
              </span>{" "}
              <br />
            </Typography>
          );
        })}
      </div>
    );
  }
}
function SelectOptions({ options, selectedValue, handleOptionSelect }) {
  return (
    <div>
      {options.map((opt) => (
        <Button
          key={opt}
          variant={selectedValue === opt ? "contained" : "outlined"}
          onClick={() => handleOptionSelect(opt)}
          style={{
            margin: "5px",
            fontSize: "15px",
            borderRadius: "15px",
            color: "#EBEBEB",
            background: "#111B47",
          }}
        >
          {opt}
        </Button>
      ))}
    </div>
  );
}

export default ResponseText;