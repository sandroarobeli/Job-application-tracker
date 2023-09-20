import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import theme from "../theme/theme";

const styles = {
  inputProps: {
    background: theme.palette.action.selected,
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: "1.25rem",
    margin: "0.75rem 0 1rem 0",
    paddingLeft: "5px",
  },
  button: {
    color: theme.palette.text.primary,
    background: theme.palette.action.selected,
    marginRight: "1rem",
    "&:hover": {
      color: theme.palette.text.primary,
      background: theme.palette.action.hover,
    },
  },
};

const DeleteCompanyModal = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onDeleteCompanyModalClose}>
      <DialogTitle>Deleting will remove this record permanently!</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.deletedCompanyTitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          sx={styles.button}
          onClick={props.onDeleteCompanyModalClose}
        >
          CANCEL
        </Button>
        <Button
          type="button"
          disabled={props.isLoading}
          sx={styles.button}
          endIcon={
            props.isLoading ? (
              <CircularProgress
                sx={{ color: theme.palette.action.disabled }}
                size={25}
              />
            ) : undefined
          }
          onClick={props.onDeleteCompany}
        >
          {props.isLoading ? "DELETING" : "DELETE"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCompanyModal;
