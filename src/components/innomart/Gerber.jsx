import {
  Button,
  Checkbox,
  FileInput,
  Group,
  NumberInput,
  Radio,
} from "@mantine/core";
import React, { useState } from "react";

const Gerber = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [supportDocumentFile, setSupportDocumentFile] = useState(null);
  const [hasSupportDoc, setHasSupportDoc] = useState("");

  const [checked, setChecked] = useState(false);
  const[price,setPrice]=useState(null)

  // file change
  const handleFileChange = (e) => {
    setFile(e);
  };

  // support document upload
  // const handleDocumentChange = (e) => {
  //   setSupportDocumentFile(e);
  // };
// support document is available or not
  const handleChange = (e) => {
    let val = e;
    setHasSupportDoc(val);
  };

  // Delivery location
  const handleDelivery = (e) => {
    setChecked(e.target.checked);
  };

  const handleNext = () => {
    if (hasSupportDoc === "yes") {
      setStep((prev) => prev + 1);
    } else {
      setStep((prev) => prev + 2);
    }
  };

  const handleSupportDocNext = () => {
    setHasSupportDoc("");
    setStep((prev) => prev + 1);
  };
  const handleSupportDocPrev = () => {
    setHasSupportDoc("");
    setStep((prev) => prev - 1);
  };

 
  return (
    <div className=" h-[50vh]">
      {/* step-1 */}
      {step === 1 && (
        <>
          <div className="flex flex-col gap-3  px-5 py-3">
           
            <FileInput
              value={file}
              onChange={handleFileChange}
              accept=".zip"
              clearable
              placeholder="upload file(.zip)"
              required
              size="xl"
               label=" Upload design file"

               styles={{
                label: { fontSize: "18px", marginBottom: "10px" },
              }}
            />
          </div>
          {file && (
            <Button
              variant="filled"
              size="xl"
              className="float-right mr-12"
              onClick={() => setStep((prev) => prev + 1)}
            >
              <span className="font-medium">Next</span>
            </Button>
          )}
        </>
      )}
      {/* step-2 */}
      {step === 2 && (
        <>
          <div className="flex flex-col gap-3  px-5 py-3">
            <Radio.Group
              name="Any supportive document?"
              label=" Any supportive document?"
              size="xl"
              styles={{
                label: {
                  fontSize: "17px",
                },
              }}
              onChange={handleChange}
            >
              <Group mt="md">
                <Radio value="yes" label="Yes" size="xl" />
                <Radio value="no" label="No" size="xl" />
              </Group>
            </Radio.Group>
          </div>
          <div className="flex justify-between items-center px-5 mt-2">
            <Button
              size="xl"
              variant="filled"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <span className="font-medium "> prev</span>
            </Button>
            <Button
              size="xl"
              variant="filled"
              disabled={hasSupportDoc === ""}
              onClick={handleNext}
            >
              <span className="font-medium "> Next</span>
            </Button>
          </div>
        </>
      )}
      {/* step-3 */}
      {step === 3 && (
        <>
          <div className="flex flex-col gap-3  px-5 py-3">
          <FileInput
            value={supportDocumentFile}
            onChange={(e)=>setSupportDocumentFile(e)}
            accept=".step, .stp, .stl, .3d, .zip"
            clearable
            placeholder="upload file(.zip)"
            required
            size="xl"
            label="Upload support documents"
            styles={{
              label:{
                fontSize:"15px",
                marginBottom:"4px"
              }
            }}
            
          />

            <div className="flex justify-between items-center">
              <Button
                variant="filled"
                size="xl"
                className=" "
                
                onClick={handleSupportDocPrev}
              >
                <span className="font-medium">prev</span>
              </Button>
              <Button
                variant="filled"
                size="xl"
                className=""
                onClick={handleSupportDocNext}

                disabled={!supportDocumentFile}
              >
                <span className="font-medium">Next</span>
              </Button>
            </div>
          </div>
         </>
      )}
      {step === 4 && (
        <>
          <div className="flex flex-col gap-2  px-5 py-3">
            
            <NumberInput size="xl" min={1}  label="SetPrice(INR)" className="mb-2" value={price} onChange={(e)=>setPrice(e)}
          placeholder="Enter price"
           styles={{
            label:{
              fontSize:"17px"
            }
          }}/>

            <p className="mb-2 font-medium text-[16px] ">
              Select Pickup Option:
            </p>

            <Checkbox
              checked={checked}
              label="Send to Innotrat Labs Directly"
              styles={{
                label: {
                  fontSize: "15px",
                },
              }}
              size="lg"
              onChange={handleDelivery}
            />

            <div className="w-full flex ">
              <Button
                variant="filled"
                size="xl"
                className="mt-2"
                disabled={!checked || !price}
              >
                <span className="font-medium">Submit</span>
              </Button>
            </div>

           
          </div>

         
        </>
      )}
    </div>
  );
};

export default Gerber;
