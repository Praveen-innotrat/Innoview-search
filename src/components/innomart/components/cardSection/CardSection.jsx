import { Card, Modal } from "@mantine/core";
import React, { useState } from "react";

import AssembledPcb from "../../AssembledPcb";
import Gerber from "../../Gerber";
import PhysicalPcb from "../../PhysicalPcb";
import WorkingProtoType from "../../WorkingProtoType";
const CardSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const cards = [
    { title: "Gerber Details", icon: "🛠️", content: <Gerber /> },
    { title: "Physical PCB", icon: "📡", content: <PhysicalPcb /> },
    { title: "Assembled PCB", icon: "🔌", content: <AssembledPcb /> },
    { title: "Working Prototype", icon: "🚀", content: <WorkingProtoType /> },
  ];

  const handleclick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleclose = () => {
    setOpen(false);
  };

  return (
    <div className="px-3  mt-5 h-auto flex">
      <div
        className=" px-10 py-4 max-w-[70%] mx-auto 
      flex justify-center items-center  gap-2 flex-wrap
      "
      >
        {cards.map((item, i) => (
          <Card
            shadow="md"
            padding="xl"
            component="a"
            target="_blank"
            radius="md"
            withBorder
            className="w-[23vw] h-[26vh] flex justify-center items-center cursor-pointer hover:scale-95 duration-1000 ease-in-out"
            key={item.title}
            onClick={() => handleclick(item)}
          >
            <h1 className="text-6xl">{item.icon}</h1>

            <h2 className="">{item.title}</h2>
          </Card>
        ))}
      </div>

      {/* modal */}
      <Modal
        opened={open}
        onClose={handleclose}
        title={selectedItem.title}
        size="xl"
        centered
        styles={{
          title: {
            fontSize: "20px",
            marginLeft: "auto",
            fontWeight: "100",
          },
          close: {
            color:"red",
            width:"40px",
            height:"40px"
          },
        }}
      >
        {selectedItem && selectedItem.content}
      </Modal>
    </div>
  );
};

export default CardSection;
