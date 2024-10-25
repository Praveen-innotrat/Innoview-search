import { Checkbox } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import React, { useState } from "react";

const ManufacturingAccordionCheckbox = ({
  services,
  setManufacturingService,
}) => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleCheckBoxStatus = (it) => {
    setSelectedItem(it);
    setManufacturingService(it);
  };

  return (
    <div className="flex flex-col gap-2">
      {services.map((item, i) => (
        <div key={i} className="mb-2">
          <Checkbox
            checked={item === selectedItem}
            onChange={() => handleCheckBoxStatus(item)}
            label={item}
            size="lg"
            styles={{
              label: {
                fontSize: "16px",
                letterSpacing: "1px",
                fontWeight: "normal",
              },
            }}
          />
        </div>
      ))}

      {/* {value.map((item, i) => (
        <Checkbox
          key={i}
          checked={item.checked}
          label={item}
          onChange={(event) => ({
            ...item,
            checked: event.currentTarget.checked,
          })}
        />
      ))} */}
    </div>
  );
};

export default ManufacturingAccordionCheckbox;
