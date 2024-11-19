import { Button, Checkbox, Loader, Modal, Table, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import API_URLS from "../config";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

const Subscription = () => {
  const [yearly, setYearly] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedMonthlyRows, setSelectedMonthlyRows] = useState([]);
  const [anualprice, setAnualprice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [paymentInitiate, setPaymentInitiate] = useState(false);

  const [feature_Msg, setFeature_Msg] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [total, setTotal] = useState(0);

  const PhoneNumberValue = Cookies.get("mobile_number");
  const FabUrl = API_URLS.innofabapi;

  const Price_table = [
    {
      position: 1,
      Feature_name: "Product Development Query & Requirements Collection ",
      feature_output:
        "Conversation with user where platform asks questions and user responds back",
      Month_price: "100",
      anual_price: "1200",
      discount_price: "999",
    },
    {
      position: 2,
      Feature_name: "GATE Preparation Module (Syllabus based content) ",
      feature_output: "GATE-ALL",
      Month_price: "400",
      anual_price: "4800",
      discount_price: "3600",
    },
    {
      position: 3,
      Feature_name:
        "Generic Evaluation (HR Connect - industry links/profile creation for Internship/Job) ",
      feature_output:
        "Platform asks user a number of questions (15 minutes 20-30 questions) based on response platform evaluates - monthly once [or] annually 15 times",
      Month_price: "500",
      anual_price: "6000",
      discount_price: "4500",
    },
  ];

  const totalRow = [
    //
    {
      position: 4,
      Feature_name: "Total Price",
      Month_price: !yearly ? monthlyPrice : "",

      anual_price: yearly ? anualprice : "",
      discount_price: yearly ? discountedPrice : "",
      delivery_target: "",
    },
  ];

  const handleChange = (element, event) => {
    const target = event.currentTarget.checked;

    if (target) {
      if (yearly) {
        setSelectedRows([
          ...selectedRows,
          {
            position: element.position,
            anually_price: element.anual_price,
            discounted_price: element.discount_price,
            monthly_price: element.Month_price,
            feature_Message: element.feature_output,
          },
        ]);
      } else {
        setSelectedMonthlyRows([
          ...selectedMonthlyRows,
          {
            position: element.position,

            monthly_price: element.Month_price,
            feature_Message: element.feature_output,
          },
        ]);
      }
    } else {
      if (yearly) {
        setSelectedRows((prevSelectedRows) =>
          prevSelectedRows.filter((item) => item.position !== element.position)
        );
      } else {
        setSelectedMonthlyRows((prevSelectedMonthlyRows) =>
          prevSelectedMonthlyRows.filter(
            (item) => item.position !== element.position
          )
        );
      }
    }
  };

  const handleCheckout = async (amount) => {
    try {
      setLoading(true);
      const payload = {
        amount: 1, // Pass the payment amount
        PhoneNumber: PhoneNumberValue,
      };

      const Payment = API_URLS.payment;
      const response = await axios.post(
        `${Payment}/initiate-payment/`,
        payload
      );
      const responseData = response.data;
      if (responseData && responseData.url) {
        setPaymentInitiate(true);
        window.location.href = responseData.url;
      } else {
        toast.error("url is not found");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const updated_price_Table = [...Price_table, ...totalRow];
  const rows = updated_price_Table.map((element, index, array) => (
    <Table.Tr
      key={element.Feature_name}
      bg={
        selectedRows.includes(element.position)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td
        className={` flex justify-start items-center gap-3 py-3 mt-3  ${
          index === array.length - 1 ? "justify-center" : "justify-start"
        } text-2xl`}
      >
        {index != array.length - 1 && (
          <Checkbox
            size="lg"
            aria-label="Select row"
            checked={
              yearly
                ? selectedRows.find(
                    (item) => item.position === element.position
                  )
                : selectedMonthlyRows.find(
                    (item) => item.position === element.position
                  )
            }
            onChange={(event) => handleChange(element, event)}
          />
        )}
        <Tooltip
          label={element.feature_output}
          color="rgba(92, 8, 8, 0.52)"
          // arrowOffset={5}
          // arrowSize={4}
          // withArrow
          position="top-start"
          className="py-3 px-4 "
          disabled={index === array.length - 1}
        >
          <span className="text-2xl">{element.Feature_name}</span>
        </Tooltip>
      </Table.Td>
      {isShow && <Table.Td className="text-xl ">{feature_Msg}</Table.Td>}

      {/* <Table.Td className="text-xl ">{feature_Msg}</Table.Td> */}

      {!yearly && (
        <Table.Td className="text-3xl text-center ">
          {element.Month_price}
        </Table.Td>
      )}
      {yearly && (
        <Table.Td className=" text-center line-through text-2xl">
          {element.anual_price}
        </Table.Td>
      )}
      {yearly && (
        <Table.Td className="text-2xl text-center">
          {element.discount_price}
        </Table.Td>
      )}
    </Table.Tr>
  ));

  useEffect(() => {
    let anual_price = 0;
    let discounted_price = 0;
    let monthly_price = 0;

    selectedRows.forEach((item) => {
      anual_price += parseInt(item.anually_price);
      discounted_price += parseInt(item.discounted_price);
      // monthly_price += parseInt(item.monthly_price);
    });

    selectedMonthlyRows.forEach((item) => {
      monthly_price += parseInt(item.monthly_price);
    });

    setAnualprice(anual_price);
    setDiscountedPrice(discounted_price);
    setMonthlyPrice(monthly_price);
  }, [selectedRows, selectedMonthlyRows]);

  console.log("yearly", yearly);
  console.log("selectedMonthlyRows", selectedMonthlyRows);

  // console.log("monthlyPrice", monthlyPrice);
  // console.log("anualprice", anualprice);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-blue-100  ">
      {/* Pricing toggle */}
      <div className="max-w-5xl mx-auto mt-14 px-5 py-3     shadow-xl bg-white rounded-xl">
        <div className="w-[30%] ">
          <div className="relative flex w-full py-3 px-3 bg-white dark:bg-slate-900 rounded-full">
            <span className="absolute inset-0 m-1 pointer-events-none ">
              <span
                className={`absolute inset-0 w-1/2  bg-indigo-500 rounded-full shadow-sm   shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${
                  yearly ? "translate-x-0" : "translate-x-full"
                }`}
              ></span>
            </span>
            <button
              className={`relative flex-1 text-xl font-medium h-10 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                yearly ? "text-white" : "text-slate-500 dark:text-slate-400"
              }`}
              onClick={() => setYearly(true)}
            >
              Yearly
            </button>
            <button
              className={`relative flex-1 text-xl font-medium h-10 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                yearly ? "text-slate-500 dark:text-slate-400" : "text-white"
              }`}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
          </div>
        </div>
        <Table highlightOnHover verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr className="text-center text-green-400 text-xl mb-10">
              <Table.Th className="text-2xl">Feature</Table.Th>
              {isShow && <Table.Th className="text-center">Response</Table.Th>}
              {!yearly && (
                <Table.Th className="text-center">
                  Monthly Subscription
                </Table.Th>
              )}
              {yearly && (
                <Table.Th className="text-center">
                  Anually Subscription
                </Table.Th>
              )}
              {yearly && (
                <Table.Th className="text-center">Discounted Price</Table.Th>
              )}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        <div className="text-center ">
          {/* {loading ? (
            <Loader size={38} />
          ) : (
            
          )} */}
          <Button
            variant="filled"
            color="indigo"
            size="xl"
            className="mt-3 "
            disabled={loading}
          >
            <span
              className="font-medium"
              onClick={() => {
                setOpenModal(true);
                setTotal((prev) => {
                  if (yearly) {
                    return prev + discountedPrice;
                  } else {
                    return prev + monthlyPrice;
                  }
                });
              }}
            >
              Subscribe
            </span>
          </Button>
        </div>

        <Modal
          opened={openModal}
          onClose={() => setOpenModal(false)}
          centered
          size="lg"
        >
          {/* Modal content */}

          <div className="">
            <h2>TOTAL</h2>
            <hr />
            <div className="flex  justify-between mb-4">
              <div className="text-xl">SubTotal</div>
              <div className="text-xl">{total}</div>
            </div>

            <div className="flex justify-between">
              <div className="text-xl">Discount</div>
              <div className="text-xl">0</div>
            </div>
            <hr />
            <div className="mt-10  ">
              {loading ? (
                <div className="flex justify-center items-center">
                  <Loader size={38} />
                </div>
              ) : (
                <>
                  <Button
                    variant="filled"
                    color="orange"
                    fullWidth
                    size="xl"
                    disabled={paymentInitiate}
                    onClick={() => handleCheckout(total)}
                  >
                    <span className="font-medium ">checkout</span>
                  </Button>
                </>
              )}
            </div>
            <div className="my-2">
              <span className="font-bold text-xl ">We accept</span>
              <div className="flex justify-between mt-4 cursor-pointer">
                <img
                  src="./images/services/razorpay1.png"
                  alt="razorpay"
                  className="w-20 h-16"
                />
                <img
                  src="./images/services/phonepay.jpg"
                  alt="razorpay"
                  className="w-20 h-14"
                />
                <img
                  src="./images/services/paytm.jpg"
                  alt="razorpay"
                  className="w-04 h-14"
                />
                <img
                  src="./images/services/mastercard.png"
                  alt="razorpay"
                  className="w-20 h-14"
                />
                <img
                  src="./images/services/visa.png"
                  alt="razorpay"
                  className="w-20 h-14"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* Pricing table */}
    </div>
  );
};

export default Subscription;
