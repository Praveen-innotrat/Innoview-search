import React, { useState } from "react";
import { ManufacturingData } from "./AccordionData";
import { Accordion } from "@mantine/core";

import ManufacturingAccordionCheckbox from "./ManufacturingAccordionCheckbox";

const ManufacturingAccordion = ({ setManufacturingService }) => {
  // const [manufacturingService, setManufacturingService] = useState('');

  const items = ManufacturingData.map((item, i) => (
    <div key={i}>
      <Accordion.Item key={i} value={item.ServiceCategory}>
        <Accordion.Control
          styles={{
            label: {
              fontSize: "17px",
              fontWeight: "lighter",
            },
          }}
        >
          {item.ServiceCategory}
        </Accordion.Control>
        <Accordion.Panel>
          <ManufacturingAccordionCheckbox
            services={item.Services}
            setManufacturingService={setManufacturingService}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </div>
  ));
  return (
    <div className="">
      <Accordion
        variant="separated"
        styles={{
          item: {
            border: "1px solid gray",
            padding: "9px 6px",
          },
          label: {
            fontSize: "14px",
            letterSpacing: "1px",
          },
          chevron: {
            width: "!30px",
          },
        }}
      >
        {items}
      </Accordion>
    </div>
  );
};

export default ManufacturingAccordion;
