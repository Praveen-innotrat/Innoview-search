import { Card } from "@mantine/core";
import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";

import user1 from "../../../../assets/user1.png";
import user2 from "../../../../assets/user1.png";

const TestMonial = () => {
  const[expanded,setExpanded]=useState(false);
  const userData = [
    {
      title: "Demo user",
      desc: "Innotrat Labs wows with Eureka, a top-notch conversational AI assistant that simplifiescircuit design. The homepage, featuring insightful videos on embedded hardware andtraining initiatives, is a game-changer. It's not just about skills; Innotrat connects engineerswith opportunities, making it an indispensable tool for staying ahead in the field.",
      icon: user1,
    },
    {
      title: "Demo user",
      desc: "With a visionary approach, Innotrat Labs introduces Eureka, making circuit design abreeze. The homepage engaging videos on hardware and circuits reflect a commitment toholistic learning. This platform not only enhances skills but also integrates placementopportunities, setting the standard for the future of engineering.",
      icon: user1,
    },
    {
      title: "Demo user",
      desc: "Innotrat Labs stands out as the go-to platform for engineers. Eureka's user-friendlyinterface streamlines circuit design, and the homepage's instructional videos on hardware and circuits add a dynamic learning touch. Beyond skills, Innotrat acts as a bridge,connecting engineers with placement opportunities and fostering a vibrant ecosystem. It'smore than a tool; it's a community builder for engineers.",
      icon: user1,
    },
  ];
  return (
    <div className=" flex flex-col  px-12 py-6  ">
      <h1 className="text-center py-4 text-5xl">
        Read trusted reviews from our customers
      </h1>

      <div className="flex   justify-center gap-4 px-10  " >
        {userData.map((item, i) => (
          <Card
            shadow="md"
            component="a"
            target="_blank"
            radius="md"
            withBorder
            className="w-full  rounded-lg flex   cursor-pointer hover:scale-95 duration-1000 ease-in-out"
          >
            <div className="flex items-center gap-2 w-full my-2  ">
              <img src={item.icon} className="w-16" alt="" />
              <span className="text-2xl font-semibold">{item.title}</span>
            </div>
            <p className="leading-8 py-2 pr-6  text-md text-[#505F98] contents " >
              <ShowMoreText
                lines={2} 
                more={
                  <span className="text-gray-500 font-semibold text-2xl" onClick={()=>setExpanded(!expanded)}>
                    Show more
                  </span>
                }
                less={
                  <span className="text-gray-500 font-semibold text-2xl" onClick={()=>setExpanded(!expanded)}>
                    Show less
                  </span>
                }
                expanded={expanded}
                width={600}
              >
                {item.desc}
              </ShowMoreText>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestMonial;
