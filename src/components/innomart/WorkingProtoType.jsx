import {
  Button,
  Checkbox,
  FileInput,
  NumberInput,
  Select,
} from "@mantine/core";
import React, { useState } from "react";

const WorkingProtoType = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [hasTestedQc, setHasTestedQc] = useState(false);
  const [hasSchematics, setHasSchematics] = useState(false);
  const [layer, setLayer] = useState(null);
  const [sourceCode, setSourceCode] = useState(null);
  const [binaryCode, setBinaryCode] = useState(null);
  const [fleshToBoradConverter, setFlashToBoardConverter] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [supportDocument, setSupportDocument] = useState(null);
  const [price, setPrice] = useState(null);
  const [deliverd, setDeliverd] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [dimensions, setDimensions] = useState({
    length: "",
    breadth: "",
  });

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

  console.log("step", step);

  return (
    <div className="h-[60vh]">
      {/* step-1 */}
      {step === 1 && (
        <>
          <div className="flex flex-col gap-3  px-5 py-3">
            <FileInput
              value={file}
              onChange={(e) => setFile(e)}
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
            {file && selectedShape && (
              <div className="ml-auto">
                <Button
                  variant="filled"
                  size="xl"
                  onClick={() => setStep((prev) => prev + 1)}
                  disabled={selectedShape === ""}
                >
                  <span className="font-medium">Next</span>
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* step-2 */}

      {step === 2 && (
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
                setFile(null);
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

      {/* step-3 */}
      {step === 3 && (
        <>
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
                onClick={() => setStep((prev) => prev + 1)}
                disabled={!layer}
              >
                <span className="font-medium">Next</span>
              </Button>
            </div>
          </div>
        </>
      )}

      {/* step-4 */}
      {step === 4 && (
        <div className="px-4 flex flex-col gap-2">
          <span className="text-[16px]">Select source code option</span>
          <div className="flex flex-col gap-3 pl-4">
            <Checkbox
              checked={sourceCode}
              label="Download Source Code"
              styles={{
                label: {
                  fontSize: "15px",
                },
              }}
              size="md"
              disabled={binaryCode || fleshToBoradConverter}
              onChange={(e) => setSourceCode(e.target.checked)}
            />
            <Checkbox
              checked={binaryCode}
              label="Download Binary"
              styles={{
                label: {
                  fontSize: "15px",
                },
              }}
              size="md"
              disabled={sourceCode || fleshToBoradConverter}
              onChange={(e) => setBinaryCode(e.target.checked)}
            />

            <Checkbox
              checked={fleshToBoradConverter}
              label="Flash into board using debuger"
              styles={{
                label: {
                  fontSize: "15px",
                },
              }}
              size="md"
              disabled={sourceCode || binaryCode}
              onChange={(e) => setFlashToBoardConverter(e.target.checked)}
            />
          </div>
          <FileInput
            className="mt-2"
            value={supportDocument}
            onChange={(e) => setSupportDocument(e)}
            accept=".step, .stp, .stl, .3d, .zip"
            clearable
            placeholder="upload file(.zip)"
            required
            size="xl"
            label="Upload support documents"
            styles={{
              label: {
                fontSize: "16px",
                marginBottom: "4px",
              },
            }}
          />

          <NumberInput
            size="xl"
            min={1}
            label="SetPrice"
            className="mb-2"
            value={price}
            onChange={(e) => setPrice(e)}
            placeholder="Enter price"
            styles={{
              label: {
                fontSize: "17px",
              },
            }}
          />
          <p className="mb-4 font-medium text-[18px] my-1">
            Select Pickup Option:
          </p>

          <Checkbox
            checked={deliverd}
            label="Send to Innotrat Labs Directly"
            name="innotrat Lab"
            styles={{
              label: {
                fontSize: "15px",
                marginBottom: "4px",
              },
            }}
            size="lg"
            onChange={(e) => setDeliverd((prev) => !prev)}
          />

          <div className="w-full flex ">
            <Button
              variant="filled"
              size="xl"
              className="mt-2"
              disabled={!deliverd || !supportDocument || !price}
            >
              <span className="font-medium">Submit</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkingProtoType;
