import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
import React from "react";

import img1 from "../../../../assets/image1.jpg";
import img2 from "../../../../assets/image2.jpg";
import img3 from "../../../../assets/image3.png";
import img4 from "../../../../assets/image4.jpg";
import img5 from "../../../../assets/image5.jpg";
import img6 from "../../../../assets/image6.jpg";

const Banner = () => {
  return (
    <div className="flex gap-5  h-[50vh] px-14 pt-6">
      {/* left side */}
      <div className=" w-[50%]   px-6 py-2 ">
        <h1 className="text-[32px] mb-10 font-medium">Innotrat Marketplace</h1>
        <p className="text-[16px] max-w-7xl leading-10 tracking-wider mb-20">
          An online electronics marketplace offering end-to-end PCB solutions,
          seamlessly integrating design, fabrication, and manufacturing tailored
          to customer specifications.
        </p>
        <div className="flex gap-8 mt-4 ">
          <Button
            variant="filled"
            size="xl"
            className="hover:scale-95 duration-500 ease-in-out w-[100%]  "
            styles={{
              root: {
                width: "150px",
              },
            }}
          >
            <span className="font-medium"> Upload Design </span>
          </Button>
          <Button
            variant="filled"
            size="xl"
            className="hover:scale-95 duration-500 ease-in-out  w-full"
            styles={{
              root: {
                width: "150px",
              },
            }}
          >
            <span className="font-medium"> Myupload</span>
          </Button>
        </div>
      </div>

      {/* right side */}

      <div className=" w-[50%] mr-6  ">
        <Carousel height={500} slideGap="xl" withControls={false} align="end">
          <Carousel.Slide>
            <img src={img1} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={img2} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={img3} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={img4} alt="" />
          </Carousel.Slide>
          {/*  */}
          <Carousel.Slide>
            <img src={img5} alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <img src={img6} alt="" />
          </Carousel.Slide>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
