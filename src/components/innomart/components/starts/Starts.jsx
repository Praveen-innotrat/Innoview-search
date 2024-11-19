import { Card } from "@mantine/core";
import React from "react";

const Starts = () => {
  const TotalSales = [
    {
      amount: "4.8m",
      title: "Total Sales",
    },
    {
      amount: "24",
      title: "Official Addons",
    },
    {
      amount: "86",
      title: "Total Addons",
    },
  ];
  return (
    <div className="h-auto py-5">
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-5xl">Trusted by eCommerce Businesses</h1>
        <p className="max-w-3xl leading-10 tracking-wide text-2xl text-center">
          Innotrat Labs specializes in electronic and electrical components,
          offering PCB fabrication and cutting-edge automation solutions to meet
          diverse industry needs.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        {TotalSales.map((item, i) => (
          <Card
            shadow="md"
            padding="xl"
            component="a"
            target="_blank"
            radius="md"
            withBorder
            className="w-[23vw] h-[26vh] flex justify-center items-center cursor-pointer hover:scale-95 duration-1000 ease-in-out"
            key={item.title}
          >
            <h1 className="text-blue-600 text-6xl">{i===0 && <span className="text-6xl -mr-4">₹ </span>}{item.amount}</h1>

            <span className="text-2xl">{item.title}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Starts;
