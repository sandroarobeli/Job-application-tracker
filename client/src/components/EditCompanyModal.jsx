import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";

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

const EditCompanyModal = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onEditCompanyModalClose}>
      <DialogTitle>Edit Company title & Comments</DialogTitle>
      <DialogContent>
        <DialogContentText>Company Title</DialogContentText>
        <TextField
          aria-label="edit company title"
          variant="standard"
          type="text"
          fullWidth
          InputProps={{
            sx: styles.inputProps,
          }}
          value={props.editedCompanyTitle}
          onChange={props.onEditedCompanyTitleChange}
        />
        <DialogContentText>Optional Comments</DialogContentText>
        <TextField
          aria-label="edit optional comments"
          variant="standard"
          type="text"
          fullWidth
          InputProps={{
            sx: styles.inputProps,
          }}
          value={props.editedComments}
          onChange={props.onEditedCommentsChange}
        />
        <DialogContentText>Change Status to Rejected?</DialogContentText>
        <Switch
          color="error"
          checked={props.checked}
          onChange={props.onStatusChange}
          inputProps={{
            "aria-label": "status update switch",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          sx={styles.button}
          onClick={props.onEditCompanyModalClose}
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
          onClick={props.onSubmitEditedCompany}
        >
          {props.isLoading ? "UPDATING" : "UPDATE"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCompanyModal;
