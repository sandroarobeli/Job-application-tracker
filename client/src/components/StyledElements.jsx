import React from "react";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import theme from "../theme/theme";

const CustomTableCell = ({ isColorCoded, rejected, ...props }) => (
  <TableCell {...props} />
);

export const StyledTableCell = styled(CustomTableCell, {
  name: "StyledTableCell",
  slot: "Root",
})((props) => ({
  padding: "1rem",
  color: props.isColorCoded
    ? props.rejected
      ? "#2D8806"
      : "#D12929"
    : "inherit",
  fontSize: "1rem",
}));

export const StyledTableRow = styled(TableRow)((props) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
