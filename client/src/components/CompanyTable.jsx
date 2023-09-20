import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { StyledTableCell, StyledTableRow } from "./StyledElements";
import EditCompanyModal from "./EditCompanyModal";
import DeleteCompanyModal from "./DeleteCompanyModal";

const columns = [
  { id: "name", label: "Company Name" },
  { id: "date", label: "Date Applied" },
  { id: "status", label: "Status" },
  { id: "comments", label: "Comments" },
  { id: "action", label: "Action" },
];

const CompanyTable = (props) => {
  if (!props.rows || !props.rows.length) {
    return (
      <Typography
        variant="h2"
        component="h2"
        sx={{ width: "100%", marginTop: "10rem", textAlign: "center" }}
      >
        No companies applied to yet!
      </Typography>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={"left"}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(
            (row) =>
              row.name.toLowerCase().includes(props.nameFilter) && (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                  <StyledTableCell
                    align="left"
                    isColorCoded
                    rejected={!!row.status}
                  >
                    {row.status ? "Pending" : "Rejected"}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.comments}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      size="medium"
                      sx={{
                        marginRight: "2rem",
                      }}
                      onClick={() => props.onEditCompanyModalOpen(row._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="medium"
                      sx={{
                        marginLeft: "2rem",
                        color: "#D12929",
                      }}
                      onClick={() => props.onDeleteCompanyModalOpen(row._id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )
          )}
        </TableBody>
      </Table>
      <EditCompanyModal
        open={props.open}
        onEditCompanyModalClose={props.onEditCompanyModalClose}
        editedCompanyTitle={props.editedCompanyTitle}
        onEditedCompanyTitleChange={props.onEditedCompanyTitleChange}
        editedComments={props.editedComments}
        onEditedCommentsChange={props.onEditedCommentsChange}
        checked={props.checked}
        onStatusChange={props.onStatusChange}
        onSubmitEditedCompany={props.onSubmitEditedCompany}
        isLoading={props.isLoading}
      />
      <DeleteCompanyModal
        open={props.deleteModalOpen}
        onDeleteCompanyModalClose={props.onDeleteCompanyModalClose}
        deletedCompanyTitle={props.deletedCompanyTitle}
        onDeleteCompany={props.onDeleteCompany}
        isLoading={props.isLoading}
      />
    </TableContainer>
  );
};

export default CompanyTable;
