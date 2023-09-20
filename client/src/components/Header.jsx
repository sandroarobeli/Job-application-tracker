import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import theme from "../theme/theme";
import AddCompanyModal from "./AddCompanyModal";

const styles = {
  appbar: {
    padding: "0.5rem 0 0.5rem 0",
    background: theme.palette.background.paper,
  },
  stack: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputProps: {
    background: theme.palette.action.selected,
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: "1.5rem",
    borderRadius: "3px",
  },
  button: {
    color: theme.palette.text.primary,
    padding: "0.75rem",
    fontSize: "1.5rem",
    background: theme.palette.action.selected,
    borderRadius: "3px",
    "&:hover": {
      color: theme.palette.text.primary,
      background: theme.palette.action.hover,
    },
  },
};

const Header = (props) => {
  return (
    <AppBar position="sticky" sx={styles.appbar}>
      <Toolbar>
        <Stack direction="row" spacing={7} sx={styles.stack}>
          <Typography variant="h5" component="h3">
            Total Count: {props.totalCount}
          </Typography>
          <Typography variant="h5" component="h3">
            Rejection: {props.totalRejects}
            {"%"}
          </Typography>
          <Typography variant="h5" component="h3">
            SEARCH
          </Typography>
          <TextField
            aria-label="search bar"
            variant="filled"
            type="text"
            InputProps={{
              sx: styles.inputProps,
              endAdornment: <SearchIcon aria-label="search glass" />,
            }}
            value={props.searchValue}
            onChange={props.onSearchValueChange}
          />
          <Button
            type="button"
            variant="contained"
            sx={styles.button}
            onClick={props.onAddCompanyModalOpen}
          >
            ADD A NEW COMPANY
          </Button>
        </Stack>
        <AddCompanyModal
          open={props.modalOpen}
          onAddCompanyModalClose={props.onAddCompanyModalClose}
          newCompanyTitle={props.newCompanyTitle}
          onNewCompanyTitleChange={props.onNewCompanyTitleChange}
          newComments={props.newComments}
          onNewCommentsChange={props.onNewCommentsChange}
          isLoading={props.isLoading}
          onSubmitNewCompany={props.onSubmitNewCompany}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
