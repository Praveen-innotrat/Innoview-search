import { Accordion } from "@mantine/core";
import React from "react";
import { serviceRequiredData } from "./AccordionData";
import ServiceAccordionCheckbox from "./ServiceAccordionCheckbox";

const ServiceRequiredAccordion = ({ setServiceRequired }) => {
  const items = serviceRequiredData.map((item) => (
    <Accordion.Item key={item.ServiceCategory} value={item.ServiceCategory}>
      <Accordion.Control
        className="mb-2"
        styles={{
          label: {
            fontSize: "18px",
            fontWeight: "lighter",
          },
        }}
      >
        {item.ServiceCategory}
      </Accordion.Control>
      <Accordion.Panel>
        <ServiceAccordionCheckbox
          services={item.Services}
          setServiceRequired={setServiceRequired}
        />
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <div>
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
        // chevron={<IconPlus   />}
      >
        {items}
      </Accordion>
    </div>
  );
};

export default ServiceRequiredAccordion;
