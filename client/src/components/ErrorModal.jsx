import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import theme from "../theme/theme";

const styles = {
  button: {
    color: theme.palette.text.primary,
    background: theme.palette.action.selected,
    margin: "auto auto 1rem auto",
    "&:hover": {
      color: theme.palette.text.primary,
      background: theme.palette.action.hover,
    },
  },
};

const ErrorModal = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>An Error Ocurred</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" sx={styles.button} onClick={props.clearModal}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
