import React from "react";
import { styled } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  border:"2px solid #093311",
  padding:"20px",
  marginBottom:"20px",
  borderRadius:"15px",
}));

const Table = styled("table")(({ theme }) => ({
  borderCollapse: "collapse",
  width: "100%",
}));

const Td = styled("td")(({ theme }) => ({
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
}));

const Th = styled("th")(({ theme }) => ({
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
}));

function ResponseTable() {
  return (
    <React.Fragment>
      <Container>
        <Table>
          <tr>
            <Th>Company</Th>
            <Th>Contact</Th>
            <Th>Country</Th>
          </tr>
          <tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
          </tr>
          <tr>
            <Td>Centro comercial Moctezuma</Td>
            <Td>Francisco Chang</Td>
            <Td>Mexico</Td>
          </tr>
          <tr>
            <Td>Ernst Handel</Td>
            <Td>Roland Mendel</Td>
            <Td>Austria</Td>
          </tr>
          <tr>
            <Td>Island Trading</Td>
            <Td>Helen Bennett</Td>
            <Td>UK</Td>
          </tr>
          <tr>
            <Td>Laughing Bacchus Winecellars</Td>
            <Td>Yoshi Tannamuri</Td>
            <Td>Canada</Td>
          </tr>
          <tr>
            <Td>Magazzini Alimentari Riuniti</Td>
            <Td>Giovanni Rovelli</Td>
            <Td>Italy</Td>
          </tr>
        </Table>
      </Container>
    </React.Fragment>
  );
}

export default ResponseTable;
