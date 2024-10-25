import { Button, Tabs, TextInput, rem } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import React, { useState } from "react";

const About = () => {
  // const[name,setName]=useState("");
  const[enquiryType,setInquiryType]=useState("Enquiry")
  const [enquiryForm,setInquiryForm]=useState({
    name:"",
    email:"",
    phoneNo:"",
    option:[]
  })
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;


  const handleInquiryData=(name,value)=>{
    console.log(name,value)
    if(name==="enquiryType" ){
      setInquiryForm((prev)=>{
        return {...prev,option:[...prev.option,value]}
      })
    }
    else{
      return  setInquiryForm((prev)=>{
        return {...prev,[name]:value}
      })
    }
  }

  const handleEnquirySubmit=()=>{
    console.log("enquiryForm",enquiryForm)
  }
  return (
    <form className="flex gap-4 mx-14" >
      {/* left section */}
      <div
        className="flex flex-col w-full p-4 border-1 rounded-md border-gray-200 shadow-md"
       
      >
        <p className=" text-md leading-10 text-2xl tracking-wide">
          At the same time, the fact that we are wholly owned and totally
          independent from manufacturer and other group control gives you
          confidence that we will only recommend what is right for you.
        </p>
        <p className="flex flex-col gap-2">
          <a href="+91 9777013904" className=" text-2xl text-pink-600">
            +91 9777013904
          </a>
          <span className="text-2xl">
            2nd Floor, INNOVEX, CIPET Incubation Center, Campus, Patia,
            Bhubaneswar, Odisha 751024
          </span>
        </p>
        <p className="flex flex-col gap-2">
          <a href="tel:+91 9777013904" className="text-2xl text-pink-600">
            +91 9777013904
          </a>
          <span className="text-2xl">
            INNOTRAT LABS PRIVATE LIMITED, New No. 7, Old No. 147, Anna Salai
            Little Mount, Saidapet Chennai - 600015 India
          </span>
        </p>
      </div>

      {/* right section */}
      <div className="flex flex-col gap-4 w-full border-1 rounded-md border-gray-200 shadow-md" >
        <TextInput
          label="Name"
          size="xl"
          className="px-4"
          styles={{
            label: {
              fontSize: "16px",
            },
          }}
          placeholder="Enter name..."
          value={enquiryForm.name}
          onChange={(e)=>handleInquiryData("name",e.target.value)}
        />
        <div className="px-4 flex gap-2 items-center">
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={icon}
            label="Your email"
            placeholder="Your email"
            size="xl"
            styles={{
              label: {
                fontSize: "16px",
              },
            }}
            className="w-full"
            value={enquiryForm.email}
            onChange={(e)=>handleInquiryData("email",e.target.value)}
          />

          <TextInput
            leftSectionPointerEvents="none"
            label="Number"
            placeholder="Your number"
            size="xl"
            styles={{
              label: {
                fontSize: "16px",
              },
            }}
            className="w-full"
            value={enquiryForm.phoneNo}
            onChange={(e)=>handleInquiryData("phoneNo",e.target.value)}
          />
        </div>
        <div className="px-4 mt-2 ">
          <Tabs variant="pills" defaultValue="Enquiry" color="gray"  styles={{
            tab:{
              paddingBlock:"12px"
            },
            tabLabel:{
              fontSize:"15px"
              
            }
            
          }}
          
          // onChange={(e)=>setInquiryType(e)}
          // onChange
          onChange={(e)=>handleInquiryData("enquiryType",e)}
          >
            <Tabs.List grow justify="space-between" 
            
              
       >
              <Tabs.Tab value="Enquiry"   >Enquiry</Tabs.Tab>
              <Tabs.Tab value="Suggestion">Suggestion</Tabs.Tab>
              <Tabs.Tab value="Problem">Problem</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
      
       <Button variant="filled" size="xl" className="hover:scale-95 ease-in-out duration-500 ml-6" 
       styles={{
        root:{
          width:"175px"
        }
       }}

      onClick={ handleEnquirySubmit}
        ><span className="font-medium">Enquiry</span></Button>
      
      </div>
    </form>
  );
};

export default About;
