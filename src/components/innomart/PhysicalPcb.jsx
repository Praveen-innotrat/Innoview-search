import {
  Button,
  Checkbox,
  FileInput,
  NumberInput,
  Select,
} from "@mantine/core";

import React, { useState } from "react";

const PhysicalPcb = () => {
  const [dimensions, setDimensions] = useState({
    length: "",
    breadth: "",
  });
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [selectedShape, setSelectedShape] = useState("");
  const [checked, setChecked] = useState(false);
  const[layer,setLayer]=useState(null);
  const[deliveryOption,setDeliveryOption]=useState("");
  const[isChecked,setIsChecked]=useState(false);
  const[supportDocument,setSupportDocument]=useState(null);
  const[price,setPrice]=useState(null)
  const[isShow,setIsShow]=useState(false);
  const handleFileChange = (e) => {
    // ("e", e);
    console.log("e", e);
    setFile(e);
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };
  const handleDelivery=(e)=>{
    setDeliveryOption("")
    setIsChecked(e.target.checked);
    const deliveryAddress=(e.target.name)
    if(isChecked){
setDeliveryOption(deliveryAddress)
    }
  }
const handleSupportDocument=(e)=>{
  setSupportDocument(e);
}





const renderDimensionsInput = () => {
  switch (selectedShape) {
    case "circular":
      return (
        <NumberInput
          placeholder="Radius (mm)"
          value={dimensions.radius || ""}
          onChange={(e) => {
            setDimensions({ ...dimensions, radius: e })
            setIsShow(true)
          }}
          size="xl"
          min={1}
          className=" px-4"
          label="Radius"
          styles={{
            label: {
              fontSize: "17px",
              marginBottom: "8px",
            },
          }}
        />
      );
    case "rectangular":
      return (
        <div className="">
          <NumberInput
            placeholder="Radius (mm)"
            value={dimensions.length || ""}
            onChange={(e) => {
              setDimensions({ ...dimensions, length: e })
              setIsShow(true);
            }}
            min={1}
            size="xl"
            className=" px-4"
            label="Leangth"
            styles={{
              label: {
                fontSize: "17px",
                marginBottom: "8px",
              },
            }}
          />

          <NumberInput
            placeholder="Breadth (mm)"
            value={dimensions.breadth || ""}
            onChange={(e) =>{
              setDimensions({ ...dimensions, breadth: e })
              setIsShow(true)
            }}
            min={1}
            size="xl"
            className=" px-4"
            label="Breadth"
            styles={{
              label: {
                fontSize: "17px",
                marginBottom: "8px",
              },
            }}
          />
        </div>
      );
    case "square":
      return (
        <NumberInput
          placeholder="Side Length (mm)"
          value={dimensions.sideLength || ""}
          onChange={(e) => {
            setDimensions({ ...dimensions, sideLength: e })
            setIsShow(true)
          }}
          min={1}
          size="xl"
          className=" px-4"
          label="Leangth"
          styles={{
            label: {
              fontSize: "17px",
              marginBottom: "8px",
            },
          }}
        />
      );
    case "custom":
      return (
        <NumberInput
          placeholder="Overall Radius (mm)"
          value={dimensions.overallRadius || ""}
          onChange={(e) => {
            setDimensions({ ...dimensions, overallRadius: e })
            setIsShow(true)
          }}
          min={1}
          size="xl"
          className=" px-4"
          label="Overall Radius"
          styles={{
            label: {
              fontSize: "17px",
              marginBottom: "8px",
            },
          }}
        />
      );
    default:
      return null;
  }
};
  return (
    <div className="h-[50vh]" >
      {/* step-1 */}
      {step === 1 && (
        <>
          <div className="flex flex-col gap-3  px-5 py-3">
            <FileInput
              value={file}
              onChange={handleFileChange}
              accept=".step, .stp, .stl, .3d, .zip"
              clearable
              placeholder="upload file(.zip)"
              required
              label=" Upload design file"
              size="xl"
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
          <div className="px-4 py-2 flex flex-col gap-2">
            {/* <p className="font-medium ml-4 text-3xl">Shape</p> */}
            <Select
              label="Shape"
              placeholder="Select Shape"
              value={selectedShape}
              onChange={(e) => setSelectedShape(e)}
              data={["circular", "rectangular", "square", "custom"]}
              size="xl"
              className="mb-2"
              styles={{
                label: {
                  fontSize: "17px",
                  marginBottom: "10px",
                },
              }}
            />

            <Checkbox
              checked={checked}
              label="Tested Qc Passed"
              styles={{
                label: {
                  fontSize: "16px",
                },
              }}
              size="lg"
              onChange={handleChecked}
              className="mb-4"
            />

            <div className="flex justify-between items-center w-full">
              <Button
                variant="filled"
                size="xl"
                className=" "
                onClick={() => {
                  setStep((prev) => prev - 1)
                  setSelectedShape("");
                }}
              >
                <span className="font-medium">Prev</span>
              </Button>
              <Button
                variant="filled"
                size="xl"
                className=""
                onClick={() => setStep((prev) => prev + 1)}
                disabled={selectedShape === ""}
              >
                <span className="font-medium">Next</span>
              </Button>
            </div>
          </div>
        </>
      )}

      {/* step-3 */}
      {step === 3 && (
        <>
          {/* <span className="text-3xl px-4 ">Custum shape</span> */}
          {renderDimensionsInput()}
          <div className="flex justify-between items-center mt-4  px-4">
            <Button
              variant="filled"
              size="xl"
              className=" "
              onClick={() => {
                setSelectedShape("")
                setStep((prev) => prev - 1)
                setIsShow(false)
              }}
            >
              <span className="font-medium">Prev</span>
            </Button>
            <Button
              variant="filled"
              size="xl"
              className=""
              onClick={() => {
                setStep((prev) => prev + 1)
                setIsShow((prev)=>!prev)
              }}
              disabled={!isShow}
              
            >
              <span className="font-medium">Next</span>
            </Button>
          </div>
        </>
      )}

      {step === 4 && (
        <div className="px-4">
        

          <NumberInput size="xl" min={1} className="mt-2" label="No of Layers" placeholder="No of Layers" 
           styles={{
            label:{
              fontSize:"17px"
            }

          }}
          value={layer}
          onChange={(e)=>setLayer(e)}
          
          />
        
          <FileInput
            value={supportDocument}
            onChange={handleSupportDocument}
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
        
          <NumberInput size="xl" min={1}  label="SetPrice" className="mb-2" value={price} onChange={(e)=>setPrice(e)}
          placeholder="Enter price"
           styles={{
            label:{
              fontSize:"17px"
            }
          }}/>
          <p className="mb-4 font-medium text-[18px] my-1">
            Select Pickup Option:
          </p>

          <Checkbox
          
            checked={isChecked}
            label="Send to Innotrat Labs Directly"
            name="innotrat Lab"
            styles={{
              label: {
                fontSize: "15px",
                marginBottom:"4px"
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
              disabled={!isChecked || !layer || !supportDocument || !price}
            >
              <span className="font-medium">Submit</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicalPcb;
