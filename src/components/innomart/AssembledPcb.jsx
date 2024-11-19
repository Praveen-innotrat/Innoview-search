import {
  Button,
  Checkbox,
  FileInput,
  NumberInput,
  Select,
} from "@mantine/core";
import React, { useState } from "react";

const AssembledPcb = () => {
  const [dimensions, setDimensions] = useState({
    length: "",
    breadth: "",
  });
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [selectedShape, setSelectedShape] = useState("");

  const [deliveryOption, setDeliveryOption] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [supportDocument, setSupportDocument] = useState(null);
  const [hasTestedQc, setHasTestedQc] = useState(false);
  const [hasSchematics, setHasSchematics] = useState(false);
  const [layer, setLayer] = useState(null);
  const [price, setPrice] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const handleFileChange = (e) => {
    setFile(e);
  };

  const handleDelivery = (e) => {
    setDeliveryOption("");
    setIsChecked(e.target.checked);
    const deliveryAddress = e.target.name;
    if (isChecked) {
      setDeliveryOption(deliveryAddress);
    }
  };
  const handleSupportDocument = (e) => {
    setSupportDocument(e);
  };

  // shape components
  const renderDimensionsInput = () => {
    switch (selectedShape) {
      case "circular":
        return (
          <NumberInput
            placeholder="Radius (mm)"
            value={dimensions.radius || ""}
            onChange={(e) => {
              setDimensions({ ...dimensions, radius: e });
              setIsShow(true);
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
                setDimensions({ ...dimensions, length: e });
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
              onChange={(e) => {
                setDimensions({ ...dimensions, breadth: e });
                setIsShow(true);
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
              setDimensions({ ...dimensions, sideLength: e });
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
        );
      case "custom":
        return (
          <NumberInput
            placeholder="Overall Radius (mm)"
            value={dimensions.overallRadius || ""}
            onChange={(e) => {
              setDimensions({ ...dimensions, overallRadius: e });
              setIsShow(true);
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
    <div className="h-[50vh]">
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

            <div className="flex justify-between items-center w-full">
              <Button
                variant="filled"
                size="xl"
                className=" "
                onClick={() => {
                  setSelectedShape("");
                  setStep((prev) => prev - 1);
                  // setIsShow(false)
                }}
              >
                <span className="font-medium">Prev</span>
              </Button>
              <Button
                variant="filled"
                size="xl"
                className=""
                onClick={() => {
                  setStep((prev) => prev + 1);
                  // setIsShow(true)
                }}
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
          {renderDimensionsInput()}
          <div className="flex justify-between items-center mt-4  px-4">
            <Button
              variant="filled"
              size="xl"
              className=" "
              onClick={() => {
                setDimensions({
                  length: "",
                  breadth: "",
                  radius: "",
                  sideLength: "",
                  overallRadius: "",
                });
                setSelectedShape("");
                setStep((prev) => prev - 1);
                setIsShow(false);
              }}
            >
              <span className="font-medium">Prev</span>
            </Button>
            <Button
              variant="filled"
              size="xl"
              className=""
              onClick={() => {
                setStep((prev) => prev + 1);
                setIsShow((prev) => !prev);
              }}
              disabled={!isShow}
            >
              <span className="font-medium">Next</span>
            </Button>
          </div>
        </>
      )}
      {/* step-4 */}
      {step === 4 && (
        <div className="px-4 flex flex-col gap-4">
          <NumberInput
            value={layer}
            onChange={(e) => setLayer(e)}
            size="xl"
            min={1}
            className="mt-2"
            label="No of Layers"
            placeholder="No of Layers"
            styles={{
              label: {
                fontSize: "17px",
              },
            }}
          />

          <Checkbox
            checked={hasTestedQc}
            label="Tested Qc Available"
            styles={{
              label: {
                fontSize: "16px",
              },
            }}
            size="lg"
            onChange={(e) => setHasTestedQc(e.target.checked)}
            // className="mb-4"
          />
          <Checkbox
            checked={hasSchematics}
            label="Schematics Available"
            styles={{
              label: {
                fontSize: "16px",
              },
            }}
            size="lg"
            onChange={(e) => setHasSchematics(e.target.checked)}
            className="mb-4"
          />

          <div className="flex justify-between items-center  ">
            <Button
              variant="filled"
              size="xl"
              className=" "
              onClick={() => {
                setDimensions({
                  length: "",
                  breadth: "",
                  radius: "",
                  sideLength: "",
                  overallRadius: "",
                });
                setStep((prev) => prev - 1);
              }}
            >
              <span className="font-medium">Prev</span>
            </Button>
            <Button
              variant="filled"
              size="xl"
              className=""
              onClick={() => {
                setStep((prev) => prev + 1);
              }}
              disabled={!layer}
            >
              <span className="font-medium">Next</span>
            </Button>
          </div>
        </div>
      )}
      {/* step-5 */}

      {step === 5 && (
        <div className="px-4 flex flex-col gap-2">
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
              label: {
                fontSize: "15px",
                marginBottom: "4px",
              },
            }}
          />

          <NumberInput
            size="xl"
            min={1}
            label="SetPrice"
            value={price}
            onChange={(e) => setPrice(e)}
            placeholder="Enter Price.."
            className="mb-2"
            styles={{
              label: {
                fontSize: "15px",
              },
            }}
          />
          <p className="mb-4 font-medium text-[16px] my-1">
            Select Pickup Option:
          </p>

          <Checkbox
            checked={isChecked}
            label="Send to Innotrat Labs Directly"
            name="innotrat Lab"
            styles={{
              label: {
                fontSize: "15px",
                marginBottom: "4px",
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
              disabled={!isChecked || !supportDocument || !price}
            >
              <span className="font-medium">Submit</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssembledPcb;
