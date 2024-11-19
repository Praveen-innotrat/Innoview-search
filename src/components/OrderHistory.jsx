import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import TablePagination from "@mui/material/TablePagination";
import Cookies from "js-cookie";
import API_URLS from "../config";

const OrderHistory = ({ mobileNumber }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const PhoneNumberValue = Cookies.get("mobile_number");
  // const PhoneNumberValue = PhoneNumberValue1.replace('+91', '')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const FabUrl = API_URLS.innofabapi;

  useEffect(() => {
    // Fetch order history data from the API using the provided mobileNumber
    fetch(`${FabUrl}/api/orderhistory/${PhoneNumberValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.order_data) {
          setOrderHistory(data.order_data);
        }
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [PhoneNumberValue]);

  console.log("orderHistory", orderHistory.length);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, orderHistory.length - page * rowsPerPage);

  console.log("rowsPerPage", rowsPerPage);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 440 }}

          // Adjust the max height and overflow as needed
        >
          <Table className="table" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  height: "50px",
                }}
              >
                <TableCell
                  style={{ fontSize: "16px" }}
                  sx={{
                    height: "auto",
                    minWidth: 150,
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontSize: "16px" }}
                  sx={{
                    minWidth: 200,
                  }}
                >
                  Order_id
                </TableCell>
                <TableCell
                  style={{ fontSize: "16px" }}
                  sx={{
                    minWidth: 140,
                  }}
                >
                  Ordered Date
                </TableCell>
                <TableCell
                  style={{ fontSize: "16px" }}
                  sx={{
                    minWidth: 150,
                  }}
                >
                  Status
                </TableCell>
                <TableCell style={{ fontSize: "16px" }}>Quantity</TableCell>
                <TableCell style={{ fontSize: "16px" }}>
                  Delivery Date
                </TableCell>
                <TableCell style={{ fontSize: "16px" }}>
                  Delivery Location Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderHistory
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      height: "50px",
                    }}
                  >
                    <TableCell
                      style={{ fontSize: "13px" }}
                      sx={{
                        height: "auto",
                      }}
                    >
                      {order.name}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {order._id}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {order.order_date}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {order.Status}
                    </TableCell>
                    <TableCell
                      className="text-center"
                      style={{ fontSize: "13px" }}
                    >
                      {order.quantity}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {order.delivery_date}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "13px" }}
                    >{`${order.address}, ${order.deliveryLocation}`}</TableCell>{" "}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={orderHistory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // style={{ fontSize: "16px" }}
            sx={{
              ".MuiTablePagination-selectLabel": {
                fontSize: "15px",
              },
              ".MuiTablePagination-select": {
                fontSize: "15px",
              },
              ".MuiSvgIcon-root": {
                fontSize: "30px",
                left: "23px",
                top: "-5px",
                // left: "1px",
              },
              ".MuiTablePagination-displayedRows": {
                fontSize: "14px",
              },
            }}
          />
        </TableContainer>
      )}
    </div>
  );
};

export default OrderHistory;
