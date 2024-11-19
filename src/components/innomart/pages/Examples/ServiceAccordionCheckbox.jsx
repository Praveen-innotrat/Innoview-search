import { Checkbox } from "@mantine/core";
import { randomId, useListState } from "@mantine/hooks";

import { useState } from "react";

const ServiceAccordionCheckbox = ({ services, setServiceRequired }) => {
  const initialState = services.map((item) => {
    return { label: item, checked: false, key: randomId() };
  });

  const [values, setValues] = useState(initialState);
  const allChecked = values.every((value) => value.checked);
  const ans = values.filter((d) => d.checked == true);
  setServiceRequired(ans.map((data) => data.label));
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value?.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => changeCheckBoxStatus(event, index)}
      size="lg"
      styles={{
        label: {
          fontSize: "16px",
          letterSpacing: "1px",
        },
      }}
    />
  ));

  const changeCheckBoxStatus = (event, index) => {
    const copyItem = [...values];

    copyItem[index] = {
      ...copyItem[index],
      checked: event.currentTarget.checked,
    };
    setValues(copyItem);
  };

  const selectAllCheckBoxStatus = (event, values) => {
    const updatedVal = values.map((item) => ({
      ...item,
      checked: !allChecked,
    }));

    setValues(updatedVal);
  };

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="Select All"
        size="lg"
        className="mb-4"
        styles={{
          label: {
            fontSize: "17px",
            fontWeight: "lighter",
          },
        }}
        onChange={(event) => selectAllCheckBoxStatus(event, values)}
      />

      {items}
    </>
  );
};

export default ServiceAccordionCheckbox;
